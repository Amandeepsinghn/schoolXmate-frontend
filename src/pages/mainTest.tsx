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
        <div className="h-[100vh] bg-gradient-to-b from-white from-10% via-[#ecfccb]  via-50% to-white to-90% ">
        <Headers>
            {score && <div>You have scored {correctAnswer.current}</div>}
            { score==false && test.length>0 && <div className="flex flex-col m-10 bg-red-300 w-[500px]">
                <div>
                    {test[currentPage].question}
                </div>

                <div className="">
                    {test[currentPage].options.map((option,index)=>(
                        <button key={index} disabled={showAnswer}  className=" block w-full border rounded-md h-10 bg-white hover:bg-[#5F9C4C]  transition cursor-pointer" onClick={async()=>{
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
                {showAnswer && <div>
                    {userAnswer===test[currentPage].correctAnswerPosition ? <div>
                        Correct Answer {test[currentPage].description[userAnswer]} </div> : <div>Wrong Answer {test[currentPage].description[userAnswer]} </div>}
                    </div>}

                <div className="flex justify-center space-x-6">
                    <button disabled={currentPage==0 || showAnswer==false} className="bg-[#5F9C4C] hover:bg-[#365314] rounded-md p-2 text-white text-shadow-xs cursor-pointer"  onClick={()=>{
                        setCurrentPage((prev)=>prev-1)
                        setShowAnswer(false)}}>
                        Previous
                    </button>
                    {showFinish==false && <button disabled={currentPage==9 || showAnswer==false} className="bg-[#5F9C4C] hover:bg-[#365314] rounded-md p-2 text-white text-shadow-xs cursor-pointer" onClick={()=>{
                        setCurrentPage((prev)=>prev+1)
                        setShowAnswer(false)}}>
                        Next
                    </button>}
                    {showFinish==true && <button disabled={showAnswer==false} className="bg-[#5F9C4C] hover:bg-[#365314] rounded-md p-2 text-white text-shadow-xs cursor-pointer" onClick={()=>{
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
        </Headers>
        </div>
    )
}