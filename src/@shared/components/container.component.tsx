import React from "react";
import NavBarComponent from "./nav-bar.component";

export function ContainterComponent({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-slate-950 h-screen w-screen flex flex-col justify-center overflow-y-auto pt-6 pb-4 gap-y-4">
      <NavBarComponent />

      <div className="w-[900px] h-[800px] bg-pink-500 opacity-45 rounded-[100%] absolute z-1 top-[50%] left-[30%] translate-x-[-50%] translate-y-[-50%] blur-[190px]"></div>
      <div className="w-[400px] h-[300px] bg-blue-500 rounded-[100%] absolute z-1 top-[70%] left-[80%] translate-x-[-80%] translate-y-[-50%] blur-[190px]"></div>

      <div className="bg-slate-950/75 backdrop-blur-[0px] z-10 text-white w-full flex flex-col gap-y-6 px-10 pt-8 max-w-screen-xl m-auto flex-1 border border-slate-800 rounded-md shadow-2xl shadow-blue-500/20">
        {children}
      </div>
    </div>
  );
}
