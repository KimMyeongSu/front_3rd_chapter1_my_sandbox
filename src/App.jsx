/** @jsx createVNode */
import { createVNode } from "./lib";
import { globalStore } from "./stores";

export const App = ({ targetPage }) => {
  const PageComponent = targetPage ?? NotFoundPage;
  const isError = globalStore.getState().error;
  return (
    <div>
      <PageComponent />
    </div>
  );
};
