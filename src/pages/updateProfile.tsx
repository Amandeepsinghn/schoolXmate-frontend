import { AiFillAliwangwang } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


interface User {
    body: {
        _id:string,
        email:string 
        name:string 
        password:string
    }
}


export const UpdateProfile = () => {

    const [exit,setExit] = useState<boolean>(false)
    
    const navigate = useNavigate();
    const [user,userData] = useState<User>({"body":{"_id":"", "email":"","name":"","password":""}})

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const [loading,setLoading] = useState<boolean>(false)
    const [resperr,setError] = useState<string>("")


    useEffect(()=>{
        const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/getProfile",{
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
                    <Link type="button" className="font-medium shadow-[#80EE5A]-500/50 underline" to={"/landing"}>
                        Home
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
                        <input className="rounded-xl w-80 text-left pl-2 text-2xl bg-slate-200 p-2" defaultValue={user.body.name} ref={nameRef}>
                        </input>
                    </div>
                    <div>
                        <div className="text-3xl pb-2">
                        Email
                        </div>
                        <input className="p-2 rounded-xl w-80 text-left pl-2 text-2xl  bg-slate-200" defaultValue={user.body.email} ref={emailRef}>
                        </input>
                    </div>
                    <div>
                        <div className="text-3xl pb-2">
                        Password
                        </div>
                        <input className="p-2 bg-slate-200 rounded-xl w-80 text-left pl-2 text-2xl" defaultValue={user.body.password} ref={passwordRef}>
                        </input>
                    </div>
                </div>
                <div className="flex justify-center space-x-5 items-center pt-10">
                    <button type="button" className=" text-black h-12 bg-[#65E32F] p-3 rounded-lg font-bold px-9 cursor-pointer hover:bg-[#80EE5A]" onClick={async() => {
                        try{
                            setLoading(true)
                            const response = await axios.post("http://localhost:8000/api/updateProfile", 
                                    {
                                        name: nameRef.current?.value,
                                        email: emailRef.current?.value,
                                        password: passwordRef.current?.value
                                        
                                    },
                                    {
                                    headers:{
                                        Authorization: localStorage.getItem("Authorization"),
                                    },
                                })
                            navigate("/profile")

                        } catch(error:unknown) {
                            const err = error as AxiosError
                            
                            if(err.response) {
                                setError("please enter valid email")
                            }
                        }
                    }}>
                    {loading ? (<div className="flex justify-center space-x-2">
                        <AiOutlineLoading3Quarters className="animate-spin mt-1">
                        </AiOutlineLoading3Quarters>
                        <div>
                        Updating ...
                        </div>
                    </div>): 
                    ("Update")}
                    </button>
                </div>
            </div>
        </div>
    )
}