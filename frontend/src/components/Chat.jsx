import { useState } from "react";

function Chat({ userChat, suspects }) {
  const [input, setInput] = useState("");
  const [selectedSuspectId, setSelectedSuspectId] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async () => {
    if (!input) return;

    if (!selectedSuspectId) {
      alert("대화할 용의자를 선택하세요!");
      return;
    }

    const res = await fetch(
      `http://127.0.0.1:8000/chat?message=${encodeURIComponent(
        input
      )}&suspect_id=${selectedSuspectId}`,
      { method: "POST" }
    );

    const result = await res.json();

    setData(result);
    setInput("");
  };

  return (
    <div className="chat-card">
  <h2>Chat to suspects</h2>

  {!userChat ? (
    <p>chat box 불러오는 중...</p>
  ) : (
    <>
      <div className="chat-controls">
        <select
          className="suspect-select"
          value={selectedSuspectId}
          onChange={(e) => setSelectedSuspectId(e.target.value)}
        >
          <option value="">용의자를 선택하세요</option>

          {suspects.map((suspect) => (
            <option key={suspect.id} value={suspect.id}>
              {suspect.name}
            </option>
          ))}
        </select>

        <textarea
          className="chat-textarea"
          id="chat"
          name="chat"
          rows="4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="용의자에게 질문해보세요..."
        />

        <button className="send-button" onClick={handleSubmit}>
          전송
        </button>
      </div>

      <div className="result-area">
        {!data ? (
          <p className="empty-message">아직 대화 결과가 없습니다.</p>
        ) : (
          <div className="chat-bubble">
            <span className="speaker">Suspect</span>
            <p>{data.response}</p>
          </div>
        )}
      </div>
    </>
  )}
</div>
  );
}

export default Chat;