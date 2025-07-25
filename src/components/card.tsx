import { IoMdClipboard } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface test {
    _id:string 
    topic:string
    subTopic:string
    current_position:number
}

interface newData {
    data:test[]
}


export const Card = ({data}:newData) => {

    const navigate = useNavigate();

    return(
        <>
            {data.map((item)=>(
                <div key={item._id} className="bg-[#e6f4ea] border border-gray-300 border-opacity-30 shadow-lg rounded-md p-4 w-70">
                    <div className="flex flex-col">
                        <IoMdClipboard size={30}/>
                        <div className="font-bold">
                            Topic : {item.topic}
                        </div>
                        <div className="">
                            SubTopic : {item.subTopic}
                        </div>
                        <div className="flex justify-between space-x-2 mt-1">
                            <div className="bg-[#bae6fd] text-black rounded-md p-1">
                                Good Luck 
                            </div>
                            <button className="bg-[#5F9C4C] rounded-md p-1 cursor-pointer hover:bg-[#365314]" onClick={async()=>{
                                navigate(`/giveTest/${item._id}`)
                            }}>
                                <p className="text-white text-shadow-2xs px-1">
                                    Start
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
        )
}