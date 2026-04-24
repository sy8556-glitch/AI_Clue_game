import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import CaseCard from "./components/CaseCard";
import SuspectList from "./components/SuspectList";
import ClueList from "./components/ClueList";
import Chat from "./components/Chat";


function App() {
  const [caseData, setCaseData] = useState(null);
  const [suspects, setSuspects] = useState([]);
  const [clues, setClues] = useState([]);
  const [userChat, setUserChat] = useState([]);
  const [selectedSuspectId, setSelectedSuspectId] = useState(null);
  const [guessResult, setGuessResult] = useState(null);

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

  }, []);

  const handleGuess = async () => {
    if (!selectedSuspectId) {
    alert("먼저 용의자를 선택하세요!");
    return;
  }

    const res = await fetch(
      `http://127.0.0.1:8000/guess?suspect_id=${selectedSuspectId}`,
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
        <button onClick={handleGuess}>범인 지목</button>

        {guessResult && (
          <p>{guessResult.message}</p>
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