import { useState } from 'react'


function Chat({ userChat }){
    const [input, setInput] = useState("");
    // handle submit 함수
    // 사용자 입력을 서버에 보내고, 응답을 받아서 화면에 반영하는 함수
    const handleSubmit = async () => {
    if (!input) return;

    const res = await fetch(
        `http://127.0.0.1:8000/chat?message=${encodeURIComponent(input)}`,
        { method: "POST" }
    );

    const data = await res.json();

    console.log(data.response);

    setInput("");
    };

    return (
        <div className = "chat">
            <h2>Chat to gpt</h2>

            { !userChat ? (
                <p>chat box 불러오는 중...</p>
            ) : (
                <div className = "chat-area">
                    <label htmlFor="chat">Tell us your story:</label>

                    <textarea
                        id="chat"
                        name="chat"
                        rows="5"
                        cols="33"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        />
                    <button onClick={handleSubmit}>전송</button>
                </div>
            )
        }
        </div>
    )
}


export default Chat;
