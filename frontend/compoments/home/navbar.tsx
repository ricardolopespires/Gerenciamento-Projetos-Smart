"use client";

import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { FaUserTie } from "react-icons/fa";


type Props={
    openNav:()=> void;
}


const NavBar = ({openNav}:Props) => {
  const [navBg, setNavBg] = useState(false);

  // Função para alterar o background do navbar ao rolar a página
  const handleScroll = useCallback(() => {
    if (window.scrollY >= 60) setNavBg(true);
    else setNavBg(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className={`fixed w-full transition-all duration-200 h-[12vh] z-[1000] ${navBg ? 'bg-white shadow-md' : ''}`}>
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <Image src={'/images/logo.png'} width={140} height={140} alt="logo" />
        {/* Links */}
        <div className="hidden lg:flex items-center space-x-10">        
        </div>
        {/* Buttons */}      
          <a 
          href="/auth/Sign-In" 
          className="grid grid-cols-2 items-center justify-between px-6 py-2 text-base font-medium rounded-full text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-300"
        >
          <span className="rigth-0 bg-white rounded-full text-gray-900 flex items-center justify-center h-7 w-7">
            <FaUserTie className="h-4 w-4" />
            </span>
          <span>Login</span>
        </a>
      </div>
    </div>
  );
};

export default NavBar;
