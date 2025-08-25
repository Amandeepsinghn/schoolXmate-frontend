import { useNavigate, useParams } from "react-router-dom";
import { Headers } from "../components/header";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const baseUrl = import.meta.env.VITE_ENDPOINT;

interface Chats {
  question: string | null;
  answer: string;
}

export const Chat = () => {
  const { sessionId } = useParams();
  const [chat, setChat] = useState<Chats[]>([]);
  const navigate = useNavigate();
  const questionRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}/api/chatPdf/getSinglePdf`,
          { id: sessionId },
          {
            headers: { Authorization: localStorage.getItem("Authorization") },
          }
        );
        setChat(response.data.body);
      } catch (error: unknown) {
        const err = error as AxiosError;
        if (err.response && err.response.status == 403) {
          navigate("/");
        }
      }
    };
    getChats();
  }, []);

  let number = 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <Headers>
      <div className="text-2xl sm:text-3xl font-bold ml-4 sm:ml-10 mt-4">
        Chat with PDF
      </div>

      {/* Chat messages */}
      <div className="flex justify-center items-center h-full px-2">
        <div className="flex flex-col h-[70vh] w-full sm:w-[600px] md:w-[750px] lg:w-[900px] rounded-2xl overflow-y-auto p-2 bg-white shadow-sm">
          <div className="min-h-min w-full">
            {chat.map((item) => (
              <div ref={messagesEndRef} key={(number += 1)} className="">
                {/* Question bubble */}
                <div className="flex justify-end my-2">
                  <div className="pr-2 bg-[#65E32F] rounded-2xl max-w-[80%] p-2 text-white text-sm sm:text-base">
                    <div className="flex justify-end break-words">
                      {item.question}
                    </div>
                  </div>
                </div>
                {/* Answer bubble */}
                <div className="bg-[#eef7ee] rounded-2xl p-2 max-w-[90%] text-sm sm:text-base break-words">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="flex justify-center p-2 sm:p-4">
        <div className="flex bg-[#eef7ee] justify-between p-2 w-full sm:w-[600px] md:w-[750px] lg:w-[900px] rounded-2xl">
          <input
            className="flex-grow outline-0 bg-transparent px-2 text-sm sm:text-base"
            type="text"
            placeholder="Ask a question..."
            ref={questionRef}
          />
          <button
            className="bg-[#65E32F] rounded-2xl p-2 px-4 sm:px-6 font-semibold cursor-pointer hover:bg-[#80EE5A] text-sm sm:text-base"
            disabled={loading}
            onClick={async () => {
              const question = questionRef.current?.value;
              if (!question) return;
              try {
                setLoading(true);
                const response = await axios.post(
                  `${baseUrl}/api/chatPdf/qaChat/${sessionId}`,
                  {
                    question: question,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("Authorization"),
                    },
                  }
                );
                const newData = response.data;
                const newAnswer = newData.body as string;

                setLoading(false);
                if (questionRef.current) {
                  questionRef.current.value = "";
                }
                setChat([...chat, { answer: newAnswer, question: question }]);
              } catch (error: unknown) {
                const err = error as AxiosError;
                if (err.response) {
                  alert(err.response.statusText);
                }
              }
            }}
          >
            {loading ? (
              <div className="flex justify-center space-x-2">
                <AiOutlineLoading3Quarters className="animate-spin mt-1" />
                <div>Processing</div>
              </div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </Headers>
  );
};
