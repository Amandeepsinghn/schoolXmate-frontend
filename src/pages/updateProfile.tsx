import { AiFillAliwangwang } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const baseUrl = import.meta.env.VITE_ENDPOINT;

interface User {
  body: {
    _id: string;
    email: string;
    name: string;
    password: string;
  };
}

export const UpdateProfile = () => {
  const [exit, setExit] = useState<boolean>(false);

  const navigate = useNavigate();
  const [user, userData] = useState<User>({
    body: { _id: "", email: "", name: "", password: "" },
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [resperr, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/getProfile`, {
          headers: { Authorization: localStorage.getItem("Authorization") },
        });
        userData(response.data);
      } catch (error: unknown) {
        const err = error as AxiosError;

        if (err.response) {
          navigate("/");
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
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
      <div className="flex flex-col lg:flex-row lg:justify-around h-full flex-wrap px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 sm:space-y-5 mt-6 sm:mt-8 lg:mt-10 w-full lg:w-auto">
          <div className="text-2xl sm:text-3xl font-bold">Update Profile</div>
          {resperr && (
            <div className="text-red-500 text-sm sm:text-base bg-red-50 p-2 rounded-md">
              {resperr}
            </div>
          )}
          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl pb-2">Name</div>
            <input
              className="rounded-xl w-full sm:w-80 lg:w-80 text-left pl-2 sm:pl-3 text-lg sm:text-xl lg:text-2xl bg-slate-200 p-2 sm:p-3 outline-none focus:ring-2 focus:ring-[#65E32F] transition-all"
              defaultValue={user.body.name}
              ref={nameRef}
            ></input>
          </div>
          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl pb-2">Email</div>
            <input
              className="p-2 sm:p-3 rounded-xl w-full sm:w-80 lg:w-80 text-left pl-2 sm:pl-3 text-lg sm:text-xl lg:text-2xl bg-slate-200 outline-none focus:ring-2 focus:ring-[#65E32F] transition-all"
              defaultValue={user.body.email}
              ref={emailRef}
            ></input>
          </div>
          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl pb-2">Password</div>
            <input
              type="password"
              className="p-2 sm:p-3 bg-slate-200 rounded-xl w-full sm:w-80 lg:w-80 text-left pl-2 sm:pl-3 text-lg sm:text-xl lg:text-2xl outline-none focus:ring-2 focus:ring-[#65E32F] transition-all"
              defaultValue={user.body.password}
              ref={passwordRef}
            ></input>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5 items-center pt-6 sm:pt-8 lg:pt-10 pb-6 w-full lg:w-auto">
          <Link
            type="button"
            className="text-black w-full sm:w-auto h-12 bg-gray-200 p-3 rounded-lg font-bold px-6 sm:px-9 cursor-pointer hover:bg-gray-100 text-center text-sm sm:text-base flex items-center justify-center"
            to={"/profile"}
          >
            Cancel
          </Link>
          <button
            type="button"
            className="text-black w-full sm:w-auto h-12 bg-[#65E32F] p-3 rounded-lg font-bold px-6 sm:px-9 cursor-pointer hover:bg-[#80EE5A] text-center text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);
                setError("");
                const response = await axios.post(
                  `${baseUrl}/api/updateProfile`,
                  {
                    name: nameRef.current?.value,
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("Authorization"),
                    },
                  }
                );
                navigate("/profile");
              } catch (error: unknown) {
                const err = error as AxiosError;

                if (err.response) {
                  setError("Please enter valid email");
                }
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <AiOutlineLoading3Quarters className="animate-spin"></AiOutlineLoading3Quarters>
                <div>Updating...</div>
              </div>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
