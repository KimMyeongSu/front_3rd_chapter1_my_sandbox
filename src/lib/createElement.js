// 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

export function createElement(vNode) {
  if (
    vNode === undefined ||
    vNode === null ||
    vNode === "" ||
    typeof vNode === "boolean"
  )
    return document.createTextNode("");
  if (typeof vNode === "string" || typeof vNode === "number")
    return document.createTextNode(vNode);
  if (Array.isArray(vNode)) {
    const $fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      $fragment.appendChild(createElement(child));
    });
    return $fragment;
  }
  if (typeof vNode.type === "function") {
    return createElement(vNode.type(vNode.props));
  }

  const $el = document.createElement(vNode.type);
  Object.entries(vNode.props || {}).forEach(([key, value]) => {
    if (key.startsWith("on")) {
      const event = key.toLowerCase().substring(2);
      $el.addEventListener(event, value);
    } else if (key === "className") {
      $el.setAttribute("class", value);
    } else {
      $el.setAttribute(key, value);
    }
  });
  vNode.children.forEach((child) => {
    $el.appendChild(createElement(child));
  });
  return $el;
}
