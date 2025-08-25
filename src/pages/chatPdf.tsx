import type { Axios, AxiosError } from "axios";
import { Headers } from "../components/header";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { BlinkBlur } from "react-loading-indicators";
import { Pdf } from "../components/allPdf";

const baseUrl = import.meta.env.VITE_ENDPOINT;

interface Session {
  body: {
    sessionId: string;
  };
}

interface ChatHistoryItem {
  question: string;
  answer: string;
}

interface Data {
  _id: string;
  name: string;
  chatHistory: ChatHistoryItem[];
}

export const ChatPdf = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setdata] = useState<Data[]>([]);

  const formData = new FormData();

  const navigate = useNavigate();

  const onDrop = useCallback(async (files: File[]) => {
    if (files[0].type === "application/pdf") {
      formData.append("file", files[0]);
      try {
        setLoading(true);
        const response = await axios.post(
          `${baseUrl}/api/chatPdf/uploadFile`,
          formData,
          { headers: { Authorization: localStorage.getItem("Authorization") } }
        );

        const data: Session = response.data;

        console.log(response);
        navigate(`/chat/${data.body.sessionId}`);
      } catch (error: unknown) {
        const err = error as AxiosError;

        if (err.response) {
          alert("unable to upload file please try again later.");
        }
      }
    } else {
      alert("please upload pdf file");
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/chatPdf/getAllpdf`, {
          headers: { Authorization: localStorage.getItem("Authorization") },
        });
        setdata(response.data.body);
      } catch (error: unknown) {
        const err = error as AxiosError;

        if (err.response && err.response.status == 403) {
          navigate("/");
        }
      }
    };
    getData();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Headers>
      {loading && (
        <div className="flex justify-center mt-20 sm:mt-32 md:mt-40 lg:mt-90">
          <BlinkBlur color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}
      {loading == false && (
        <div className="flex flex-col px-4 sm:px-8 md:px-12 lg:pl-50 space-y-2.5 mt-8 sm:mt-10 md:mt-12 lg:mt-14 max-w-full">
          <div className="text-2xl sm:text-3xl font-bold">ChatPdf</div>
          <div className="text-[#5F9C4C] text-sm sm:text-base">
            Upload a PDF and start chatting with it.
          </div>
          <div
            className="border-2 border-dotted border-[#DDEFD9] w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl xl:w-240 h-48 sm:h-52 md:h-56 lg:h-60 rounded p-4 sm:p-6 lg:p-7 space-y-4 sm:space-y-5"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="text-center bg-green-200 p-2 rounded">
                {" "}
                Drop pdf here...{" "}
              </div>
            ) : (
              ""
            )}
            <div>
              <div className="font-semibold text-center relative text-sm sm:text-base">
                Drag and drop a PDF here
              </div>
              <div className="text-xs sm:text-sm text-center">
                Or browse your files
              </div>
            </div>
            <div className="text-center">
              {/* <input type="file" accept="pdf/*"> </input> */}
              <button className="p-2 text-xs sm:text-sm font-semibold bg-gray-200 hover:bg-gray-100 rounded-2xl">
                Select PDF
              </button>
            </div>
          </div>
          <div className="font-semibold text-xl sm:text-2xl pt-3">
            Previous Chats
          </div>
          <Pdf data={data} />
        </div>
      )}
    </Headers>
  );
};
