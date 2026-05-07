import { useState } from "react";
import "./BoardGameUI.css";

function BoardGameUI({
  rooms = [],
  onOpenGuess,
  children,
}) {
  const [activePanel, setActivePanel] = useState(null);

  const handleTopButton = (panel) => {
    if (panel === "guess") {
      onOpenGuess?.();
    }
    setActivePanel(panel);
  };

  return (
    <div className="game-page">
      <header className="top-menu">
        <button disabled>🎲 주사위</button>
        <button onClick={() => handleTopButton("case")}>사건 내용</button>
        <button onClick={() => handleTopButton("note")}>추리 노트</button>
        <button onClick={() => handleTopButton("guess")}>추리</button>
        <button onClick={() => handleTopButton("chat")}>Chat</button>
      </header>

      <main className="game-layout">
        <section className="board-area">
          <div className="board-grid">
            {rooms.map((room, index) => (
              <button
                key={room.id}
                className={`room-card room-${index + 1}`}
                style={{
                  backgroundImage: `url(${room.image})`,
                }}
              >
                <span>{room.name}</span>
              </button>
            ))}

            <button className="deduction-room">
              <span>추리방</span>
            </button>

            <div className="path-grid">
              {Array.from({ length: 81 }).map((_, i) => (
                <div key={i} className="path-cell" />
              ))}
            </div>
          </div>
        </section>

        {activePanel && (
          <aside className="side-panel">
            <button
              className="close-btn"
              onClick={() => setActivePanel(null)}
            >
              ×
            </button>

            {activePanel === "case" && (
              <>
                <h2>사건 내용</h2>
                <p>사건 내용은 나중에 연결하면 됨.</p>
              </>
            )}

            {activePanel === "note" && (
              <>
                <h2>추리 노트</h2>
                <p>추리 노트는 나중에 만들면 됨.</p>
              </>
            )}

            {activePanel === "guess" && (
              <>
                <h2>추리하기</h2>
                {children}
              </>
            )}

            {activePanel === "chat" && (
              <>
                <h2>Chat</h2>
                {children}
              </>
            )}
          </aside>
        )}
      </main>
    </div>
  );
}

export default BoardGameUI;