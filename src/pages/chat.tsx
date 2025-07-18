import { useParams } from "react-router-dom"

export const Chat = () => {
    const {sessionId} = useParams();
    return  <div>
        <h1 className="text-indigo-600 m-12">User {sessionId}</h1>
    </div>
}