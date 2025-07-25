import axios, { AxiosError } from "axios"
import { use, useEffect, useRef, useState } from "react"
import { useAsyncError, useNavigate, useParams } from "react-router-dom"
import { Headers } from "../components/header"




interface test {
    question:string 
    options:string[]
    correctAnswer:string
    correctAnswerPosition:number
    description:string[]
}


export const Maintest = () => {

    const {testId} = useParams();

    const navigate = useNavigate();

    const [test,setTest] = useState<test[]>([])

    const [currentPage,setCurrentPage] = useState(0);

    const [showAnswer,setShowAnswer] = useState<boolean>(false) 

    const [userAnswer,setUserAnswer] = useState<number>(0)

    const [showFinish,setShowFinish] = useState<boolean>(false)

    const [score,setFinalScore] = useState<boolean>(false)

    const [userAnswers, setUserAnswers] = useState<number[]>([]);

    const correctAnswer = useRef(0);

    useEffect(() => {
        if (currentPage === 9) {
            setShowFinish(true);
        }
        }, [currentPage]);

    useEffect(()=>{
        const getData = async () => {
            try {
            const response = await axios.get(`http://localhost:8000/api/test/getTest/${testId}`,{
                    headers:{Authorization:localStorage.getItem("Authorization")}
                })
            setTest(response.data.body.test)
            
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
        <div className="h-[100vh] bg-gradient-to-b from-white to-green-100 ">
        <Headers>
            {score && <div className=" h-screen flex justify-center items-center">
                <div className="border-1 border-green-200 shadow-2xl rounded-2xl min-w-xs p-3 space-y-2">
                    <div className="font-semibold text-2xl text-green-700 text-center">
                        Quiz Completed!
                    </div>
                    <div className="text-center text-gray-700">
                        You have scored {correctAnswer.current} out of 10
                    </div>
                    <div className="flex justify-center">
                        <button className="p-2 bg-slate-200 rounded-xl hover:bg-slate-300 cursor-pointer" onClick={
                            async()=>{
                                navigate("/test")
                            }
                        }>
                            Go back
                        </button>
                    </div>
                </div>
            </div>}
            <div className="flex justify-center mt-25">
                <div className="border-1 bg-white border-green-200 rounded-2xl p-2 shadow-2xl">
                {score==false && test.length>0 && <div className="flex flex-col w-[500px]">
                    <div className="text-red-500 text-center font-semibold text-2xl">
                        {test[currentPage].question}
                    </div>

                    <div className="space-y-2 p-4">
                        {test[currentPage].options.map((option,index)=>(
                            <button key={index} disabled={showAnswer}  className=" pl-2 text-left block w-full border-1 border-slate-300 rounded-md h-10 bg-gray-100 hover:bg-green-100  transition cursor-pointer" onClick={async()=>{
                                setUserAnswer(index)
                                setShowAnswer(true)
                                const newAnswers = [...userAnswers];
                                newAnswers[currentPage] = index;
                                setUserAnswers(newAnswers);
                            }}>
                                {option}
                                </button>
                        ))}
                        
                    </div>
                    {showAnswer && <div className="text-center px-4 text-lg text-blue-700">
                        {userAnswer===test[currentPage].correctAnswerPosition ? <div>
                            Correct Answer {test[currentPage].description[userAnswer]} </div> : <div>Wrong Answer {test[currentPage].description[userAnswer]} </div>}
                        </div>}

                    <div className="flex justify-between px-3">
                        <button disabled={currentPage==0 || showAnswer==false} className="bg-green-600 hover:bg-green-700 rounded-md p-2 text-white text-shadow-xs cursor-pointer"  onClick={()=>{
                            setCurrentPage((prev)=>prev-1)
                            setShowAnswer(false)}}>
                            Previous
                        </button>
                        {showFinish==false && <button disabled={currentPage==9 || showAnswer==false} className="bg-green-600 hover:bg-green-700 rounded-md p-2 text-white text-shadow-xs cursor-pointer" onClick={()=>{
                            setCurrentPage((prev)=>prev+1)
                            setShowAnswer(false)}}>
                            Next
                        </button>}
                        {showFinish==true && <button disabled={showAnswer==false} className="bg-green-600 hover:bg-green-700 rounded-md p-2 text-white text-shadow-xs cursor-pointer" onClick={()=>{
                            let finalScore = 0;
                            for (let i = 0; i < test.length; i++) {
                                if (userAnswers[i] === test[i].correctAnswerPosition) {
                                finalScore += 1;
                                }
                            }
                            correctAnswer.current = finalScore;
                            setFinalScore(true)
                            setShowAnswer(false)}}>
                            Finish
                        </button>}
                    </div>
                </div>}
                </div>
                            
                </div>
        </Headers>
        </div>
    )
}