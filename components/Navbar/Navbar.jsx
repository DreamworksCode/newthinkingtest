import { useState } from "react";
import {
  PaperAirplaneIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from '@/public/assets/Navbar/NT Logo.svg'
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
      <nav className="bg-[#6032E3] text-white h-20 w-full fixed z-40 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex mx-auto justify-between w-5/6 ">
            {/* Primary menu and logo */}
            <div className="flex items-center gap-16  "> 
              {/* logo */}
              <div className=" text-white  w-56   ">
                <Link
                  href="/"
                  className="flex gap-1 font-bold text-gray-700 items-center "
                >
                  {/* <PaperAirplaneIcon className="h-6 w-6 text-primary" /> */}
                  <Image src={logo} className="w-52 h-20 " alt="New Thinking Logo"/>
                  {/* <span className="text-white">NEW THINKING.AI</span> */}
                </Link>
              </div>
              {/* primary */}
              <div className=" hidden gap-8 ml-64 ">
                <Link href="#" className="hover:text-cyan-300  ">Products</Link>
                <Link href="#" className="hover:text-cyan-300 w-36 ">Why New Thinking</Link>
                <Link href="#" className="hover:text-cyan-300 ">Company</Link>
                <Link href="#" className="hover:text-cyan-300 w-28 ">Sign In</Link>
              </div>
              {/* <div className="hidden lg:flex gap-8 ml-64 ">
                <Link href="#" className="hover:text-cyan-300  ">Products</Link>
                <Link href="#" className="hover:text-cyan-300 w-36 ">Why New Thinking</Link>
                <Link href="#" className="hover:text-cyan-300 ">Company</Link>
                <Link href="#" className="hover:text-cyan-300 w-28 ">Sign In</Link>
              </div> */}
            </div>
            {/* secondary */}
            {/* <div className="flex gap-6">
              <div className="hidden xs:flex items-center gap-10">
                <div className="hidden lg:flex items-center gap-2">
                  <MoonIcon className="h-6 w-6" />
                  <SunIcon className="h-6 w-6" />
                </div>
              </div>
              <div className="lg:hidden flex items-center">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  <Bars3Icon className="h-6" />
                </button>
              </div>
            </div> */}
          </div>
        </div>
        {/* mobile navigation */}
        <div
          className={`fixed z-40 w-full text-white  bg-[#6032E3] overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
            !toggleMenu ? "h-0" : "h-1/2"
          }`}
        >
          <div className="px-8">
            <div className="flex flex-col gap-8 font-bold tracking-wider mt-6">
              <a href="#" className="hover:text-cyan-300  " >
              Products
              </a>
              <a href="#" className="hover:text-cyan-300  ">Why New Thinking</a>
              <a href="#"className="hover:text-cyan-300  ">Company</a>
              <a href="#" className="hover:text-cyan-300  ">Sign In</a>
            </div>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;