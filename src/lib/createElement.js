// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

export function createElement(vNode) {
  // 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
  if (!vNode) {
    return document.createTextNode("");
  }

  // 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  // 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement(child));
    });
    return fragment;
  }

  // 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출
  if (typeof vNode.type === "function") {
    const componentVNode = vNode.type(vNode.props || {});
    return createElement(componentVNode);
  }
  // 5. 실제 DOM 요소를 생성
  const $element = document.createElement(vNode.type);

  // vNode.props의 속성들을 적용
  if (vNode.props) {
    for (const [key, value] of Object.entries(vNode.props)) {
      if (key.startsWith("on")) {
        // 이벤트 리스너인 경우 (onClick, onInput 등)
        const eventName = key.slice(2).toLowerCase();
        $element.addEventListener(eventName, value);
      } else if (key === "className") {
        // className 처리
        $element.className = value;
      } else {
        // 일반 속성 처리 (예: id, data-* 등)
        $element.setAttribute(key, value);
      }
    }
  }

  // vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  if (vNode.children) {
    vNode.children.forEach((child) => {
      $element.appendChild(createElement(child));
    });
  }

  return $element;
}
