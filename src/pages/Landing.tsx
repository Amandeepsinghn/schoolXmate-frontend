import { AiFillAliwangwang } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

export const Landing = () =>{
    return(
        <div className="flex flex-col h-screen">
            <div className="flex justify-between items-center p-x-1 p-3">
                <div className="flex items-center">
                    <AiFillAliwangwang size={50} />
                    <div className="font-bold text-2xl">SchoolXmate</div>
                </div>
                <div className="flex items-center space-x-2.5 mr-10">
                    <Link type="button" className="text underline font-medium " to={"/chatPdf"}>
                        ChatPdf
                    </Link>
                    <Link type="button" className="font-medium shadow-[#80EE5A]-500/50 underline" to={"/test"}>
                        Test
                    </Link>
                    <div>
                        <CgProfile size={40} color={"black"}/>
                    </div>
                </div>
            </div>
            <hr className="border-t border-gray-200 opacity-50 border-1"></hr>
            <div className="flex-grow justify-center flex-col">
                <div className="font-semibold text-4xl flex justify-center pt-15">
                    Ready to challange yourself or explore documents ? Let's get Started
                </div>
                <div className="flex justify-center space-x-3 pt-8">
                    <Link type="button" className={`w-72 text-black text-center bg-[#65E32F] p-3 rounded-lg font-bold px-9 cursor-pointer hover:bg-[#80EE5A]`} to={"/chatPdf"}>
                        ChatPdf
                    </Link>
                    <Link type="button" className={`w-72 text-black text-center bg-gray-200 p-3 rounded-lg font-bold px-9 cursor-pointer hover:bg-gray-100`} to={"/test"}>
                        Test
                    </Link>
                </div>
                <div className="flex justify-center pt-4">
                <img src="landing.svg" alt="test"/>
                </div>
            </div>
        </div>
    )
}