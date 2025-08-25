import { AiFillAliwangwang } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import React from "react";
import { useState } from "react";
interface childrenProp {
  children: React.ReactNode;
}
export const Headers = ({ children }: childrenProp) => {
  const [exit, setExit] = useState<boolean>(false);
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center px-3 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center">
          <AiFillAliwangwang
            size={50}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
          />
          <div className="font-bold text-lg sm:text-xl lg:text-2xl ml-1 sm:ml-2">
            SchoolXmate
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 mr-2 sm:mr-4 lg:mr-10">
          <Link
            type="button"
            className="text underline font-medium text-xs sm:text-sm lg:text-base hidden sm:inline"
            to={"/chatPdf"}
          >
            ChatPdf
          </Link>
          <Link
            type="button"
            className="font-medium shadow-[#80EE5A]-500/50 underline text-xs sm:text-sm lg:text-base hidden sm:inline"
            to={"/test"}
          >
            Test
          </Link>
          <Link
            type="button"
            className="font-medium shadow-[#80EE5A]-500/50 underline text-xs sm:text-sm lg:text-base hidden sm:inline"
            to={"/landing"}
          >
            Home
          </Link>
          <div
            className="hover:cursor-pointer relative"
            onClick={() => {
              exit === true
                ? setExit(false)
                : exit === false
                ? setExit(true)
                : "";
            }}
          >
            {exit && (
              <div className="border border-gray-200 bg-gray-50 absolute z-10 right-0 sm:right-0.5 top-12 sm:top-13 rounded-xl w-28 sm:w-32 lg:w-36 text-center text-sm">
                <div className="hover:bg-[#65E32F] p-2">
                  <Link to={"/profile"}>Profile</Link>
                </div>
                <div className="border-b border-1 opacity-70 border-gray-200"></div>
                <div className="hover:bg-red-100 p-2">
                  <Link
                    className="text-red-600"
                    onClick={() => localStorage.removeItem("Authorization")}
                    to={"/"}
                  >
                    Sign out
                  </Link>
                </div>
                {/* Mobile Navigation Links */}
                <div className="sm:hidden">
                  <div className="border-b border-1 opacity-70 border-gray-200"></div>
                  <div className="hover:bg-gray-100 p-2">
                    <Link to={"/chatPdf"}>ChatPdf</Link>
                  </div>
                  <div className="border-b border-1 opacity-70 border-gray-200"></div>
                  <div className="hover:bg-gray-100 p-2">
                    <Link to={"/test"}>Test</Link>
                  </div>
                  <div className="border-b border-1 opacity-70 border-gray-200"></div>
                  <div className="hover:bg-gray-100 p-2">
                    <Link to={"/landing"}>Home</Link>
                  </div>
                </div>
              </div>
            )}
            <CgProfile
              size={40}
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
              color={"black"}
            />
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-200 opacity-50 border-1"></hr>
      {children}
    </div>
  );
};
