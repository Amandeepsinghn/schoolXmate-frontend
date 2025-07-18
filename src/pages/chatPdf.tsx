import type { Axios, AxiosError } from "axios";
import { Headers } from "../components/header"
import {useCallback, useEffect, useState} from "react";
import {useDropzone} from 'react-dropzone'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { BlinkBlur } from "react-loading-indicators";

interface Session {
    body:{
        "sessionId":string
    }
}

interface ChatHistoryItem {
    question:string
    answer:string
}

interface Data {
    _id:string
    name:string 
    chatHistory:ChatHistoryItem[]
}

export const ChatPdf = () =>{

    const [loading,setLoading] = useState<boolean>(false)

    const [data,setdata] = useState<Data[]>([])

    const formData = new FormData();

    const navigate = useNavigate();

    const onDrop = useCallback(async (files:File[]) => {
        if (files[0].type==="application/pdf") {
            formData.append('file',files[0])
            try{
                setLoading(true)
                const response = await axios.post("http://localhost:8000/api/chatPdf/uploadFile",
                    formData,
                    {headers:{Authorization: localStorage.getItem("Authorization")}})
                
                const data:Session = response.data

                console.log(response)
                navigate(`/chat/${data.body.sessionId}`)

            } catch(error:unknown) {
                const err = error as AxiosError

                if(err.response) {
                    alert("unable to upload file please try again later.")
                }
            }
        } else {
            alert("please upload pdf file")
        }
    }, [])

    useEffect(()=>{
        const getData = async()=>{
            const response = await axios.get("http://localhost:8000/api/chatPdf/getAllpdf",{
                headers:{Authorization:localStorage.getItem("Authorization")}
            })
            setdata(response.data.body)
        }
        getData() 
    },[])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return(
        <Headers>
            {loading && <div className="flex justify-center mt-90"><BlinkBlur color="#32cd32" size="medium" text="" textColor="" /></div>} 
            {loading==false && <div className="flex flex-col pl-50 space-y-2.5 mt-14">
                <div className="text-3xl font-bold">
                    ChatPdf
                </div>
                <div className="text-[#5F9C4C]">
                    Upload a PDF and start chatting with it.
                </div>
                <div className="border-2 border-dotted border-[#DDEFD9] w-240 h-60 rounded p-7 space-y-5" {...getRootProps()}>
                    <input {...getInputProps()}/>
                        {
                            isDragActive ?
                            <div className="text-center bg-green-200"> Drop pdf here... </div> :
                            ""
                        }
                    <div>
                        <div className="font-semibold text-center relative">
                            Drag and drop a PDF here
                        </div>
                        <div className="text-sm text-center ">
                            Or browse your files
                        </div>
                    </div> 
                    <div className="text-center">
                        {/* <input type="file" accept="pdf/*"> </input> */}
                        <button className="p-2 text-sm font-semibold bg-gray-200 hover:bg-gray-100 rounded-2xl">
                            Select PDF
                        </button>
                    </div>
                </div>
                <div className="font-semibold text-2xl pt-3">
                    Previous Chats
                </div>
            </div>}
        </Headers>
    )
}