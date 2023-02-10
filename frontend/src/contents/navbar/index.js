import React from "react";
import { Button } from "../../components/Button/index.js";

export const NavBar = () => {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-10 rounded dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex">
            <h1 className="text-3xl font-bold">memoryly</h1>
        </a>
        <div className="flex md:order-2">
          <Button
            text={"Restart"}
            color={"bg-amber-400"}
            hoverColor={"bg-amber-500"}
            clickEvent={() => {
              window.location.reload();
            }}
          ></Button>
          <Button
            text={"New Game"}
            color={"bg-zinc-500"}
            hoverColor={"bg-zinc-700"}
            clickEvent={() => {
              alert("new game");
            }}
          ></Button>
        </div>
      </div>
    </nav>
  );
};