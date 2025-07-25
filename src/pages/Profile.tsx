import { AiFillAliwangwang } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";


interface User {
    body: {
        _id:string,
        email:string 
        name:string 
        password:string
    }
}

const baseUrl = import.meta.env.VITE_ENDPOINT

export const Profile = () =>{

    const [exit,setExit] = useState<boolean>(false)
    
    const navigate = useNavigate();
    const [user,userData] = useState<User>({"body":{"_id":"", "email":"","name":"","password":""}})

    useEffect(()=>{
        const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/getProfile`,{
                headers:{Authorization:localStorage.getItem("Authorization")}
            })
            userData(response.data)

        } catch(error:unknown) {
            const err = error as AxiosError

            if(err.response) {
                navigate("/")
            }
        }
        };
        fetchData()
    },[])
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
                    <div className="hover:cursor-pointer relative" onClick={()=>{exit===true ? setExit(false) : exit===false ? setExit(true) : ""}}>
                        {exit && <div className="border border-gray-200 bg-gray-50 absolute z-10 right-0.5 top-13 rounded-xl w-25 text-center">
                            <div className="hover:bg-[#65E32F] p-2">
                                <Link to={"/profile"}>
                                Profile
                                </Link>
                            </div>
                            <div className="border-b border-1 opacity-70 border-gray-200"></div>
                            <div className="hover:bg-red-100 p-2"> 
                            <Link className="text-red-600" onClick={()=>localStorage.removeItem("Authorization")} to={"/"}>
                                Sign out
                            </Link>
                            </div>
                        </div>}
                        <CgProfile size={40} color={"black"}/>
                    </div>
                </div>

            </div>
            <hr className="border-t border-gray-200 opacity-50 border-1"></hr>
            <div className="flex justify-around h-full flex-wrap">
                <div className="flex flex-col space-y-5 mt-10">
                    <div className="text-3xl font-bold">
                        Profile
                    </div>
                    <div>
                        <div className="text-3xl pb-2">
                        Name
                        </div>
                        <div className="rounded-xl w-80 text-left pl-2 text-2xl bg-slate-200 p-2">
                            {user.body.name}
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl pb-2">
                        Email
                        </div>
                        <div className="p-2 rounded-xl w-80 text-left pl-2 text-2xl  bg-slate-200">
                            {user.body.email}
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl pb-2">
                        Password
                        </div>
                        <div className="p-2 bg-slate-200 rounded-xl w-80 text-left pl-2 text-2xl">
                            {user.body.password}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center space-x-5 items-center pt-10">
                    <Link type="button" className=" text-black h-12 bg-gray-200 p-3 rounded-lg font-bold px-9 cursor-pointer hover:bg-gray-100 " to={"/landing"}>
                        Go back
                    </Link>
                    <Link type="button" className=" text-black h-12 bg-[#65E32F] p-3 rounded-lg font-bold px-9 cursor-pointer hover:bg-[#80EE5A] " to={"/profileUpdate"}>
                        Update Credentials
                    </Link>
                </div>
            </div>
        </div>
    )
}