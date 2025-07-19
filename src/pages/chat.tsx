import { useNavigate, useParams } from "react-router-dom"
import { Headers } from "../components/header";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Chats {
    "question":string | null
    "answer":string
}

export const Chat = () => {
    const {sessionId} = useParams();
    const [chat,setChat] = useState<Chats[]>([])
    const navigate = useNavigate()
    const questionRef = useRef<HTMLInputElement>(null)
    const [loading,setLoading] = useState<boolean>(false)

    useEffect(()=>{
        
        const getChats = async () => {
            try {
                const response = await axios.post("http://localhost:8000/api/chatPdf/getSinglePdf",
                    {"id":sessionId},{
                        headers:{Authorization:localStorage.getItem("Authorization")}
                    })
                
                setChat(response.data.body)

            } catch (error:unknown) {
                    const err = error as AxiosError
                    if(err.response && err.response.status==403) {
                        navigate("/dashboard")
                    }

                }
            }
            
        getChats()
        },[])
        let number = 0
    

    return  <Headers>
        <div className="text-3xl font-bold ml-30 mt-4">Chat with PDF</div>
        <div className="flex justify-center items-center h-full">
            <div className="flex pl-2 h-150 w-300 rounded-2xl overflow-y-auto p-2">
                <div className="min-h-min w-screen">
                    {chat.map((item)=>(
                        <div key={number+=1} className="">
                            <div className="flex justify-end my-2"> 
                                <div className="pr-2 bg-[#65E32F] rounded-2xl max-70 p-2">
                                    <div className="flex justify-end">
                                        {item.question}
                                    </div>
                                </div>
                            </div>
                            <div className="w-90 bg-[#eef7ee] rounded-2xl p-2">
                                {item.answer}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
        <div className="flex justify-center">
            <div className="flex bg-[#eef7ee] justify-between p-2 w-300 rounded-2xl">
                <input className="flex-grow outline-0" placeholder="Ask a question..." ref={questionRef}>
                </input>
                <button className="bg-[#65E32F] rounded-2xl p-2 px-6 font-semibold cursor-pointer hover:bg-[#80EE5A]" onClick={async()=>{
                    const question = questionRef.current?.value
                    
                    if(!question) return
                    try{
                        setLoading(true)
                        const response = await axios.post(`http://localhost:8000/api/chatPdf/qaChat/${sessionId}`,{
                            question:question
                        },{headers:{Authorization:localStorage.getItem("Authorization")}})
                        const newData = response.data
                        const newAnswer = newData.body as string

                        setLoading(false)
                        setChat([...chat,{"answer":newAnswer,"question":question}])
                        
                    } catch (error:unknown) {
                        const err = error as AxiosError

                        if(err.response) {
                            alert(err.response.statusText)
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
              ("Send")}
                </button>
            </div>
        </div>
    </Headers>
}