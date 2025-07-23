import { useEffect, useRef, useState } from "react";
import { Headers } from "../components/header"
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/card";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BlinkBlur } from "react-loading-indicators";

interface test {
    _id:string 
    topic:string
    subTopic:string
    current_position:number
}

interface session {
    sessionId:string
}

interface nextData {
    message:string
    notValidTopic:boolean
    notValidDifficultLevel:boolean
    notValidSubTopic:boolean 
    isComplete:boolean
    sessionId:string
}

export const Test = () => {

    const navigate = useNavigate()

    const [test,setTest] = useState<test[]>([])
    const [session,setSession] = useState<session>({sessionId:""})
    const [middleBar,setMiddleBar] = useState<boolean>(false)

    const [topic,setTopic] = useState<boolean>(true)
    const [subTopic,setSubTopic] = useState<boolean>(false)
    const [difficultLevel,setDifficultyLevel] = useState<boolean>(false)

    const [inputData, setInputData] = useState<nextData>({message: "",notValidTopic: false,notValidDifficultLevel: false,notValidSubTopic: false,isComplete: false,sessionId: ""});

    const inputRef = useRef<HTMLInputElement>(null)

    const [loading,setLoading] = useState<boolean>(false)

    const [showLoading,showsetLoading] = useState<boolean>(false)

    useEffect(()=>{
        const getData = async () => {
            try {
            const response = await axios.get("http://localhost:8000/api/test/getAllTest",{
                    headers:{Authorization:localStorage.getItem("Authorization")}
                })
            setTest(response.data.body)
            } catch(error:unknown) {
                const err = error as AxiosError

                if(err.response && err.response.status==403) {
                    navigate("/dashboard")
                }
            }
        }
        getData()
    },[])

    return(
        <div className="h-[100vh] bg-gradient-to-b from-white from-10% via-[#ecfccb]  via-50% to-white to-90% ">
        <Headers>
            {showLoading && <div className="flex justify-center mt-90"><BlinkBlur color="#32cd32" size="medium" text="" textColor="" /></div>} 
            {showLoading==false && middleBar==false && <div className="h-screen space-y-7">
                <div className="flex justify-start ml-12">
                    <div className="text-6xl font-bold text-shadow-2xs" >
                        Infinite Test Prep
                    </div >
                </div>
                <div className="flex flex-col ml-12">
                    <p className="text-2xl font-bold text-[#5F9C4C]">
                        Create your own Personalized Test
                    </p>
                    <p className="text-[#737373] leading-7">
                        Enter a topic and SchoolXmate will create your personalized test with 10 MCQ
                    </p>
                </div>
                <div className="flex justify-start ml-12">
                    <button className="bg-[#5F9C4C] p-3 rounded-md cursor-pointer shadow-2xl transition delay-150 duration-300 ease-in-out hover:-translate-z-2 hover:scale-110 hover:bg-[#365314]"
                        onClick={async()=> {
                            try {
                            const sessionData = await axios.post("http://localhost:8000/api/test/intialize",{
                                start:true
                            },{headers:{Authorization:localStorage.getItem("Authorization")}})
                            
                            setSession(sessionData.data.body)

                            setMiddleBar(true)

                        } catch(error:unknown) {
                            const err = error as AxiosError
                            if(err.response && err.response.status==403) {
                                navigate("/dashboard")
                            }
                        }  
                        }}>
                        <p className="text-shadow-xs text-white">
                            Create your Test
                        </p>
                    </button>
                </div>
                <div className="flex flex-col justify-start ml-12">
                    <p className="text-2xl">
                        Your Recent Courses
                    </p>
                    <p className="text-[#737373] leading-7">
                        Continue learning from your previously generated test
                    </p>
                </div>
                <div className="flex justify-start ml-12 space-x-4">
                    <Card data={test}/>
                </div>
            </div>}
            {showLoading==false && middleBar==true && topic==true &&<div className="flex justify-center mt-30 w-2xl">
                <div className="border border-gray-500 border-opacity-35 rounded-2xl shadow-2xl bg-white p-2">
                    {topic && <div className="flex flex-col">
                        <div className="text-2xl font-semibold">
                            {inputData.notValidTopic ? inputData.message : "Enter the Topic to create the Test like maths, chemistry, science etc."}
                            </div>
                        <div className="flex justify-between space-x-0.5"> 
                            <input placeholder="Enter Topic" className="p-2 bg-gray-100 w-full rounded-md outline-0" ref={inputRef}/>
                            <button className="bg-[#5F9C4C] p-2 px-5 rounded-md hover:bg-[#365314]" disabled={loading} onClick={async()=>{
                                setLoading(true)
                                const nextData = await axios.post("http://localhost:8000/api/test/respond",{topic:inputRef.current?.value,sessionId:session.sessionId},{
                                    headers:{
                                        Authorization: localStorage.getItem("Authorization"),
                                    },
                                })
                                
                                setInputData(nextData.data.body)
                                
                                if (inputRef.current) {
                                    inputRef.current.value = ""
                                }

                                setLoading(false)

                                if (nextData.data.body.notValidTopic === true) {
                                    setTopic(true)
                                } else{
                                    setSubTopic(true)
                                    setTopic(false)
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
                        </div>}
                </div>
                </div>} 
             {showLoading==false && middleBar==true && subTopic==true &&<div className="flex justify-center mt-30 w-2xl">
                <div className="border border-gray-500 border-opacity-35 rounded-2xl shadow-2xl bg-white p-2 flex justify-center">
                    {subTopic && <div className="flex flex-col">
                        <div className="text-2xl font-semibold">
                            {inputData.message}
                            </div>
                        <div className="flex justify-between space-x-0.5"> 
                            <input placeholder="Enter Topic" className="p-2 bg-gray-100 w-full rounded-md outline-0" ref={inputRef}/>
                            <button className="bg-[#5F9C4C] p-2 px-5 rounded-md hover:bg-[#365314]" disabled={loading} onClick={async()=>{
                                setLoading(true)
                                const nextData = await axios.post("http://localhost:8000/api/test/respond",{subTopic:inputRef.current?.value,sessionId:session.sessionId},{
                                    headers:{
                                        Authorization: localStorage.getItem("Authorization"),
                                    },
                                })
                                
                                setInputData(nextData.data.body)

                                if (inputRef.current) {
                                    inputRef.current.value = ""
                                }

                                setLoading(false)

                                if (nextData.data.body.notValidSubTopic === true) {
                                    setSubTopic(true)
                                } else{
                                    setDifficultyLevel(true)
                                    setSubTopic(false)
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
                        </div>}
                </div>
                </div>}
            {showLoading==false && middleBar==true && difficultLevel==true &&<div className="flex justify-center mt-30 w-2xl">
                <div className="border border-gray-500 border-opacity-35 rounded-2xl shadow-2xl bg-white p-2">
                    {difficultLevel && <div className="flex flex-col">
                        <div className="text-2xl font-semibold">
                            {inputData.message}
                            </div>
                        <div className="flex justify-between space-x-0.5"> 
                            <input placeholder="Enter Topic" className="p-2 bg-gray-100 w-full rounded-md outline-0" ref={inputRef}/>
                            <button className="bg-[#5F9C4C] p-2 px-5 rounded-md hover:bg-[#365314]" disabled={loading} onClick={async()=>{
                                setLoading(true)
                                const nextData = await axios.post("http://localhost:8000/api/test/respond",{difficultLevel:inputRef.current?.value,sessionId:session.sessionId},{
                                    headers:{
                                        Authorization: localStorage.getItem("Authorization"),
                                    },
                                })
                                
                                setInputData(nextData.data.body)
                                
                                if (inputRef.current) {
                                    inputRef.current.value = ""
                                }
                                setLoading(false)

                                if (nextData.data.body.notValidDifficultLevel === true) {
                                    setDifficultyLevel(true)
                                } else{
                                    setDifficultyLevel(false)
                                    if(nextData.data.body.isComplete) {
                                        showsetLoading(true)
                                        const generatedData = await axios.post("http://localhost:8000/api/test/generateTest",{
                                            "topic":nextData.data.body.topic,
                                            "subTopic":nextData.data.body.subTopic,
                                            "difficultLevel":nextData.data.body.difficultLevel
                                        },{headers:{
                                        Authorization: localStorage.getItem("Authorization"),
                                    },})

                                    const id = await generatedData.data.body

                                    navigate(`giveTest/${id}`)
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
                        </div>}
                </div>
                </div>}
        </Headers>
        </div>
    )
}