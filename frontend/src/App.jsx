import { useState, useEffect } from "react";
import "./App.css";

import CaseCard from "./components/CaseCard";
import SuspectList from "./components/SuspectList";
import ClueList from "./components/ClueList";
import LocationList from "./components/LocationList";
import WeaponList from "./components/WeaponList";
import Chat from "./components/Chat";

import BoardGameUI from "./components/BoardGameUI";
import answerRoomImg from "./assets/location/answer_room.png";
import basementImg from "./assets/location/basement.jpg";
import bedroomImg from "./assets/location/bedroom.jpg";
import garageImg from "./assets/location/garage.jpg";
import kitchenImg from "./assets/location/kitchen.jpg";
import libraryImg from "./assets/location/library.jpg";
import livingRoomImg from "./assets/location/living_room.jpg";
import studyImg from "./assets/location/study.jpg";
import bathroomDiningImg from "./assets/location/bathroom_and_dining_room.png";


function App() {
  const [caseData, setCaseData] = useState(null);
  const [suspects, setSuspects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [clues, setClues] = useState([]);

  const [selectedSuspectId, setSelectedSuspectId] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedWeaponId, setSelectedWeaponId] = useState(null);

  const [guessResult, setGuessResult] = useState(null);
  const [userChat, setUserChat] = useState([]);

  const [activePanel, setActivePanel] = useState(null);

  const [playerPosition, setPlayerPosition] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [diceValue, setDiceValue] = useState(null);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/case")
      .then((res) => res.json())
      .then((data) => setCaseData(data))
      .catch((err) => console.error("case 불러오기 실패:", err));

    fetch("http://127.0.0.1:8000/suspects")
      .then((res) => res.json())
      .then((data) => setSuspects(data))
      .catch((err) => console.error("suspects 불러오기 실패:", err));

    fetch("http://127.0.0.1:8000/clues")
      .then((res) => res.json())
      .then((data) => setClues(data))
      .catch((err) => console.error("clues 불러오기 실패:", err));

    fetch("http://127.0.0.1:8000/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error("locations 불러오기 실패:", err));

    fetch("http://127.0.0.1:8000/weapons")
      .then((res) => res.json())
      .then((data) => setWeapons(data))
      .catch((err) => console.error("weapons 불러오기 실패:", err));
  }, []);

const boardRooms = [
  { id: "basement", name: "Basement", image: basementImg },
  { id: "bathroom_dining", name: "Bathroom & Dining", image: bathroomDiningImg },
  { id: "bedroom", name: "Bedroom", image: bedroomImg },
  { id: "garage", name: "Garage", image: garageImg },
  { id: "kitchen", name: "Kitchen", image: kitchenImg },
  { id: "library", name: "Library", image: libraryImg },
  { id: "living_room", name: "Living Room", image: livingRoomImg },
  { id: "study", name: "Study", image: studyImg },
];

// 주사위 버튼
const rollDice = () => {
  const value = Math.floor(Math.random() * 6) + 1;
  setDiceValue(value);
};

  const handleGuess = async () => {
    if (!selectedSuspectId || !selectedLocationId || !selectedWeaponId) {
      alert("용의자, 장소, 무기를 모두 선택하세요!");
      return;
    }

    const playerId = 1;

    const res = await fetch(
      `http://127.0.0.1:8000/guess?player_id=${playerId}&suspect_id=${selectedSuspectId}&location_id=${selectedLocationId}&weapon_id=${selectedWeaponId}`,
      { method: "POST" }
    );

    const data = await res.json();
    setGuessResult(data);
  };

  return (
    <div className="app">
      <header className="top-menu">
        <button onClick={rollDice}>🎲 주사위</button>
        <p>주사위: {diceValue}</p>
        <button onClick={() => setActivePanel("case")}>사건 내용</button>
        <button onClick={() => setActivePanel("note")}>추리 노트</button>
        <button onClick={() => setActivePanel("guess")}>추리</button>
        <button onClick={() => setActivePanel("chat")}>Chat</button>
      </header>

      <main className="game-layout">
        <section className="board-area">
          <div className="board">
            {boardRooms.map((room, index) => (
              <button
                key={room.id}
                className={`room room-${index + 1}`}
                style={{ backgroundImage: `url(${room.image})` }}
                onClick={() => setSelectedLocationId(room.id)}
              >
                <span>{room.name}</span>
              </button>
            ))}

            <button
              className="deduction-room"
              style={{ backgroundImage: `url(${answerRoomImg})` }}
            >
              <span>추리방</span>
            </button>

            <button className="deduction-room">
              <span>추리방</span>
            </button>

            <div className="path-grid">
              {Array.from({ length: 81 }).map((_, index) => (
                <div key={index} className="path-cell" />
              ))}
            </div>
          </div>
        </section>

        {activePanel && (
          <aside className="side-panel">
            <button className="close-btn" onClick={() => setActivePanel(null)}>
              ×
            </button>

            {activePanel === "case" && (
              <>
                <h2>사건 내용</h2>
                <CaseCard caseData={caseData} />
                <ClueList clues={clues} />
              </>
            )}

            {activePanel === "note" && (
              <>
                <h2>추리 노트</h2>
                <p>나중에 체크박스 형태로 만들면 됨.</p>
              </>
            )}

            {activePanel === "guess" && (
              <>
                <h2>추리하기</h2>

                <SuspectList
                  suspects={suspects}
                  selectedSuspectId={selectedSuspectId}
                  setSelectedSuspectId={setSelectedSuspectId}
                />

                <LocationList
                  locations={locations}
                  selectedLocationId={selectedLocationId}
                  setSelectedLocationId={setSelectedLocationId}
                />

                <WeaponList
                  weapons={weapons}
                  selectedWeaponId={selectedWeaponId}
                  setSelectedWeaponId={setSelectedWeaponId}
                />

                <button className="submit-btn" onClick={handleGuess}>
                  추리 제출
                </button>

                {guessResult && (
                  <div className="guess-result-card">
                    <h3>{guessResult.message}</h3>

                    <p>
                      추리한 플레이어: <strong>{guessResult.guess_by}</strong>
                    </p>

                    {guessResult.shown_cards && (
                      <div className="shown-card-box">
                        <p>공개된 단서</p>
                        <p>
                          <strong>{guessResult.shown_cards.shown_by}</strong>가
                          카드를 보여줬어요
                        </p>
                        <p>
                          카드 종류:{" "}
                          <strong>{guessResult.shown_cards.card_type}</strong>
                        </p>
                        <p>
                          카드 ID:{" "}
                          <strong>{guessResult.shown_cards.card_id}</strong>
                        </p>
                      </div>
                    )}

                    <p>
                      다음 턴: <strong>{guessResult.next_player}</strong>
                    </p>
                  </div>
                )}
              </>
            )}

            {activePanel === "chat" && (
              <>
                <h2>Chat</h2>
                <Chat userChat={userChat} suspects={suspects} />
              </>
            )}
          </aside>
        )}
      </main>
    </div>
  );
}

export default App;