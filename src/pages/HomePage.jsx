/** @jsx createVNode */
import { Header, Navigation, Footer } from "../components";
import { createVNode } from "../lib";
import { globalStore } from "../stores";
export const HomePage = () => {
  const { loggedIn } = globalStore.getState();
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation />
        <main className="p-4"></main>
      </div>
    </div>
  );
};
