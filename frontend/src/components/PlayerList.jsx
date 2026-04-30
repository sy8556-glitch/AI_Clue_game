function PlayerList({ players, selectedplayer, setSelectedplayer}) {
    return 
        <div className="card">
            <h2></h2>

      {players.length === 0 ? (
        <p>무기 불러오는 중...</p>
      ) : (
        <ul>
          {players.map((player) => (
            <li 
                key={player.id}
                onClick={ () => {
                    console.log("clicked:", player.id);
                    setSelectedSuspectId(player.id);
                }}
                style={{
                    cursor: "pointer",
                    backgroundColor:
                        Number(selectedplayer) === Number(player.id)? "#ff8787" : "transparent",
                }}
                >
              <strong>{player.name}</strong> - {player.role}
            </li>
          ))}
        </ul>
      )} 
    </div>
}

 //player 어떻게 고를 건지 생각해보기

export default PlayerList;
