import { useState , useEffect } from 'react'
import './App.css'
import CaseCard from "./components/CaseCard";
import SuspectList from "./components/SuspectList";
import ClueList from "./components/ClueList";
import LocationList from "./components/LocationList"
import WeaponList from "./components/WeaponList"

import Chat from "./components/Chat";


function App() {
  const [caseData, setCaseData] = useState(null);
  const [suspects, setSuspects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const [clues, setClues] = useState([]);

  const [userChat, setUserChat] = useState([]);
  const [selectedSuspectId, setSelectedSuspectId] = useState(null);
  const [guessResult, setGuessResult] = useState(null);

  const [weapons, setWeapons] = useState([]);
  const [selectedWeaponId, setSelectedWeaponId] = useState(null);

  // clue 초기 suspects, locations, weapons, clues 데이터 로딩
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
      <h1>AI Clue Game</h1>

      <div className="layout">
        <CaseCard caseData={caseData} />

        <SuspectList
          suspects={suspects}
          selectedSuspectId={selectedSuspectId}
          setSelectedSuspectId={setSelectedSuspectId}
        />

        <LocationList 
          locations= {locations}
          selectedLocationId={selectedLocationId}
          setSelectedLocationId={setSelectedLocationId}
          />
        
        <WeaponList
          weapons={weapons}
          selectedWeaponId={selectedWeaponId}
          setSelectedWeaponId={setSelectedWeaponId}
        />
          
        <button onClick={handleGuess}>추리 제출</button>

        {guessResult && (
        <div className="guess-result-card">
          <h2>{guessResult.message}</h2>

          <p className="guess-player">
            추리한 플레이어: <strong>{guessResult.guess_by}</strong>
          </p>

          {guessResult.shown_cards && (
            <div className="shown-card-box">
              <p className="section-title">공개된 단서</p>

              <div className="shown-card">
                <p>
                  <strong>{guessResult.shown_cards.shown_by}</strong> 가 카드를 보여줬어요
                </p>
                <p>
                  카드 종류: <strong>{guessResult.shown_cards.card_type}</strong>
                </p>
                <p>
                  카드 ID: <strong>{guessResult.shown_cards.card_id}</strong>
                </p>
              </div>
            </div>
          )}

          <p className="next-player">
            다음 턴: <strong>{guessResult.next_player}</strong>
          </p>
        </div>
      )}
              <ClueList clues={clues} />
      </div>

      <div className = "chat">
        <Chat userChat= {userChat}></Chat>
      </div>

    </div>
  );
}

export default App;