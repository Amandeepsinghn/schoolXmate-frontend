import { AiFillAliwangwang } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
const baseUrl = import.meta.env.VITE_ENDPOINT;
export const Landing = () => {
  const [exit, setExit] = useState<boolean>(false);
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center px-3 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center">
          <AiFillAliwangwang
            size={50}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
          />
          <div className="font-bold text-lg sm:text-xl lg:text-2xl ml-2">
            SchoolXmate
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
          <Link
            type="button"
            className="text underline font-medium text-sm sm:text-base"
            to={"/chatPdf"}
          >
            ChatPdf
          </Link>
          <Link
            type="button"
            className="font-medium shadow-[#80EE5A]-500/50 underline text-sm sm:text-base"
            to={"/test"}
          >
            Test
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
              <div className="border border-gray-200 bg-gray-50 absolute z-10 right-0 sm:right-0.5 top-12 sm:top-13 rounded-xl w-24 sm:w-28 lg:w-32 text-center">
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
      <div className="flex justify-center flex-col px-4 sm:px-6 lg:px-8">
        <div className="font-semibold text-2xl sm:text-3xl lg:text-4xl flex justify-center pt-8 sm:pt-12 lg:pt-15 text-center">
          Ready to challange yourself or explore documents ? Let's get Started
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3 pt-6 sm:pt-8">
          <Link
            type="button"
            className={`w-full sm:w-64 lg:w-72 text-black text-center bg-[#65E32F] p-3 rounded-lg font-bold px-9 cursor-pointer hover:bg-[#80EE5A]`}
            to={"/chatPdf"}
          >
            ChatPdf
          </Link>
          <Link
            type="button"
            className={`w-full sm:w-64 lg:w-72 text-black text-center bg-gray-200 p-3 rounded-lg font-bold px-9 cursor-pointer hover:bg-gray-100`}
            to={"/test"}
          >
            Test
          </Link>
        </div>
        <div className="flex justify-center pt-4">
          <img
            className="h-64 sm:h-96 lg:h-130 w-auto max-w-full"
            src="landing.svg"
            alt="test"
          />
        </div>
      </div>
    </div>
  );
};
