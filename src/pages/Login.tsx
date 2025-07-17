import { useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios, { AxiosError } from "axios";

import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const [loading,setLoading] = useState<boolean>(false)
  const [err,setError] = useState<string>("")
  const naivgate = useNavigate();


    return <div className="w-screen h-screen bg-[url('/sln.jpg')] bg-cover bg-center">
      <div className="flex justify-center h-full">
        <div className="flex items-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 px-4 inset-ring-2 ">
            <div className="text-2xl font-semibold">
              Login
            </div>
            <div className="text-slate-500 font-normal">
                Enter your information to see the AI world
            </div>
            <div className="font-semibold text-left">
              Email
            </div>
            <input className="w-full px-2 py-1 border rounded-2xl border-slate-200" ref={email}>
            </input>
            <div className="font-semibold text-left">
              Password
            </div>
            <input className="w-full px-2 py-1 border rounded-2xl border-slate-200" ref={password}>
            </input>
            <button className="w-full bg-[#80EE5A] mt-2 rounded-2xl p-2 cursor-pointer" onClick={async ()=> {
              try{
              setLoading(true)
              const reponse = await axios.post("http://localhost:8000/api/logIn",
                {email:email.current?.value,
                  password:password.current?.value
                })
              localStorage.setItem("Authorization","Bearer" + " " + reponse.data.token);
              naivgate("/landing")
              
              } catch(error:unknown) {
                const err = error as AxiosError
                setLoading(false)
                if(err.response && err.response.status===404) {
                  setError("email does not exsist")
                } else if (err.response && err.response.status==422) {
                  setError("please enter valid email and password")
                }
              }
            }}>
              {loading ? (<div className="flex justify-center space-x-2">
                <AiOutlineLoading3Quarters className="animate-spin mt-1">
                </AiOutlineLoading3Quarters>
                <div>
                  Processing
                </div>
              </div>): 
              ("log In")}
            </button>
            <div className="flex justify-center mt-1">
              <div className="text-slate-700">
                Don't have an  account? 
              </div>
              <Link className="pointer underline cursor-pointer" to={"/signup"}>
                signup
              </Link>
            </div>
            {err && <div className="text-red-600 text">
              {err}
              </div>}
          </div>
        </div>
      </div>
    </div>
}