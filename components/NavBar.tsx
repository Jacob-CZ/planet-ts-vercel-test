import React, { ReactNode } from "react";
import { ImMenu } from "react-icons/im";
import BubbleBackground from "./bubbleBG";
import Link from "next/link";
export default function NavBar({ children }: { children: ReactNode }) {
  return (
    <>
      <button
        className="fixed top-[5vh] right-[5vw] bg-[#4D956D] rounded-full z-[1000] w-fit h-fit p-4 transition-all duration-1000 peer"
      >
        <ImMenu size={28}/>
      </button>
      <div className="peer fixed w-screen h-screen overflow-hidden bg-orange-400 z-[-10]">
        <BubbleBackground>
          <div className=" fixed right-0 top-0 h-screen w-[10vw] pt-32 flex flex-col items-center">
          <Link className="w-fit text-xl" href={"/"}>
            home
          </Link>
          <Link className="w-fit text-xl" href={"/admin"}>
            admin
          </Link>
          </div>
        </BubbleBackground>
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