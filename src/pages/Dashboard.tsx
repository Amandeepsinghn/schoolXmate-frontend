import { AiFillAliwangwang } from "react-icons/ai";
import { Button } from "../components/button";

const baseUrl = import.meta.env.VITE_ENDPOINT 

export const Dashboard = () => {
    return (
    <div className="h-screen flex flex-col flex-wrap">
        <div className=" bg-[#FFFFFF] flex justify-between items-center p-4 pt-4">
            <div className="flex items-center">
                <div className="flex items-center">
                    <AiFillAliwangwang size={50} />
                </div>
                <div className="font-bold text-2xl">
                    SchoolXmate
                </div>
            </div>
            <div className=" flex items-center space-x-2">
                <div>
                    <Button label="Sign Up" color="green"/>
                </div>
                <div>
                    <Button label ="Log In" color="gray"/>
                </div>
            </div>
        </div>
        <hr className="border-t border-gray-200 opacity-40 border-1"/>
        <div className ="flex-grow bg-[#F6F5F2]">
            <div className="flex justify-start">
                <div className="flex flex-col ml-6 mt-18">
                    <div className="font-semibold text-5xl">
                        Enhance Your Learning Experience.
                    </div>
                    <div className="pt-4 text-zinc-600 text-2xl max-w-2xl">
                        schoolxMate offers tools to create tests from your study materials
                        and interact with PDFs using natural language. Upload documents or enter
                        text to generate customized quizzes and extract key information.
                    </div>
                </div> 
                <div className="flex-grow">
                    <img src = "/ai.gif" alt="local gif" className="w-170 h-auto"/>
                </div>
            </div>
        </div>
    </div>
    )
}