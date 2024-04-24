import React, { ReactNode } from "react";
import { ImMenu } from "react-icons/im";

export default function NavBar({ children }: { children: ReactNode }) {
  return (
    <>
      <button
        className="fixed top-[5vh] right-[5vw] bg-[#4D956D] rounded-full z-[1000] w-fit h-fit p-4 transition-all duration-1000 peer"
      >
        <ImMenu size={28}/>
      </button>
      <div className="peer fixed w-screen h-screen overflow-hidden bg-orange-400 z-[-10]">

      </div>
      <div
        className="fixed top-0 bg-[#FCFBE4] w-screen h-screen overflow-y-auto duration-700 peer-hover:-translate-x-[10vw] peer-hover:-translate-y-[10vh] peer-hover:rounded-[5vh] peer-hover:overflow-hidden"
      >
        {children}
      </div>

    </>
  );
}
//#4D956D
//#FCFBE4