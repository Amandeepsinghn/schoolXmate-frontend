import { AiFillAliwangwang } from "react-icons/ai";
import { Button } from "../components/button";
const baseUrl = import.meta.env.VITE_ENDPOINT;
export const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#FFFFFF] flex flex-wrap sm:flex-nowrap justify-between items-center p-3 sm:p-4">
        {/* Logo + Title */}
        <div className="flex items-center flex-shrink-0">
          <AiFillAliwangwang
            size={40}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
          />
          <div className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl ml-2">
            SchoolXmate
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex w-full sm:w-auto justify-center sm:justify-end items-center space-x-2 mt-2 sm:mt-0">
          <Button label="SignUp" color="green" />
          <Button label="Log In" color="gray" />
        </div>
      </div>
      <hr className="border-t border-gray-200 opacity-40 border-1" />
      <div className="flex-grow bg-[#F6F5F2] overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          <div className="flex flex-col px-4 sm:px-6 lg:ml-6 mt-6 sm:mt-8 md:mt-12 lg:mt-18 flex-shrink-0">
            <div className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              Enhance Your Learning Experience.
            </div>
            <div className="pt-3 sm:pt-4 text-zinc-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-full lg:max-w-2xl leading-relaxed">
              schoolxMate offers tools to create tests from your study materials
              and interact with PDFs using natural language. Upload documents or
              enter text to generate customized quizzes and extract key
              information.
            </div>
          </div>
          <div className="flex-grow flex justify-center lg:justify-end items-center mt-4 sm:mt-6 lg:mt-0 px-4 lg:px-0">
            <img
              src="/ai.gif"
              alt="local gif"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:w-170 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
