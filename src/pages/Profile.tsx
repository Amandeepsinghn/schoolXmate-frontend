import { AiFillAliwangwang } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface User {
  body: {
    _id: string;
    email: string;
    name: string;
    password: string;
  };
}

const baseUrl = import.meta.env.VITE_ENDPOINT;

export const Profile = () => {
  const [exit, setExit] = useState<boolean>(false);

  const navigate = useNavigate();
  const [user, userData] = useState<User>({
    body: { _id: "", email: "", name: "", password: "" },
  });

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
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center px-3 sm:px-6 py-3">
        <div className="flex items-center flex-shrink-0">
          <AiFillAliwangwang size={40} className="w-8 h-8 sm:w-10 sm:h-10" />
          <div className="font-bold text-lg sm:text-xl md:text-2xl ml-2">
            SchoolXmate
          </div>
        </div>

        <div className="flex w-full sm:w-auto justify-center sm:justify-end items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
          <Link
            type="button"
            className="underline font-medium text-sm sm:text-base"
            to={"/chatPdf"}
          >
            ChatPdf
          </Link>
          <Link
            type="button"
            className="underline font-medium text-sm sm:text-base"
            to={"/test"}
          >
            Test
          </Link>

          {/* Profile dropdown */}
          <div
            className="hover:cursor-pointer relative"
            onClick={() => setExit(!exit)}
          >
            {exit && (
              <div className="border border-gray-200 bg-gray-50 absolute z-10 right-0 mt-2 rounded-xl w-40 text-center shadow-md">
                <div className="hover:bg-[#65E32F] p-2">
                  <Link to={"/profile"}>Profile</Link>
                </div>
                <div className="border-b border-gray-200 opacity-70"></div>
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
            <CgProfile className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200 opacity-50" />

      {/* Body */}
      <div className="flex flex-col lg:flex-row justify-around h-full flex-wrap px-4 sm:px-8">
        {/* Profile Info */}
        <div className="flex flex-col space-y-4 mt-6 sm:mt-10 w-full max-w-md">
          <div className="text-2xl sm:text-3xl font-bold">Profile</div>

          <div>
            <div className="text-xl sm:text-2xl pb-2">Name</div>
            <div className="rounded-xl w-full text-left pl-2 text-lg sm:text-xl bg-slate-200 p-2">
              {user.body.name}
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl pb-2">Email</div>
            <div className="p-2 rounded-xl w-full text-left pl-2 text-lg sm:text-xl bg-slate-200">
              {user.body.email}
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl pb-2">Password</div>
            <div className="p-2 bg-slate-200 rounded-xl w-full text-left pl-2 text-lg sm:text-xl">
              {user.body.password}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-5 items-center mt-6 sm:mt-10 space-y-3 sm:space-y-0">
          <Link
            type="button"
            className="text-black h-12 bg-gray-200 p-3 rounded-lg font-bold px-6 sm:px-9 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-center"
            to={"/landing"}
          >
            Go back
          </Link>
          <Link
            type="button"
            className="text-black h-12 bg-[#65E32F] p-3 rounded-lg font-bold px-6 sm:px-9 cursor-pointer hover:bg-[#80EE5A] w-full sm:w-auto text-center"
            to={"/profileUpdate"}
          >
            Update Credentials
          </Link>
        </div>
      </div>
    </div>
  );
};
