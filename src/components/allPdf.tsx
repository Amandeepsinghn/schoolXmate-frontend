import { IoDocumentOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

interface ChatHistoryItem {
    question:string
    answer:string
}

interface Data {
    _id:string
    name:string 
    chatHistory:ChatHistoryItem[]
}

interface finalData {
    data: Data []
}

export const Pdf = ({data}:finalData) => {
    return (
        <div className="space-y-2">
            {data.map((item)=>(
                <Link key={item._id} className="flex w-80 items-center space-x-0.5" to={`/chat/${item._id}`}>
                    <div className="bg-[#DDEFD9] p-2 rounded-2xl"> 
                        <IoDocumentOutline  size={40}/>
                    </div>
                    <div> {item.name} </div>
                </Link>
            ))}
        </div>
    )
}