function SuspectList({ suspects, selectedSuspectId, setSelectedSuspectId }) {
  
  return (
    <div className="card">
      <h2>용의자</h2>

      {suspects.length === 0 ? (
        <p>용의자 불러오는 중...</p>
      ) : (
        <ul>
          {suspects.map((suspect) => (
            <li 
                key={suspect.id}
                onClick={ () => {
                    console.log("clicked:", suspect.id);
                    setSelectedSuspectId(suspect.id);
                }}
                style={{
                    cursor: "pointer",
                    //  작동 안됨
                    backgroundColor:
                        Number(selectedSuspectId) === Number(suspect.id)? "#ff8787" : "transparent",
                }}
                >
              <strong>{suspect.name}</strong> - {suspect.role}
            </li>
          ))}
        </ul>
      )} 
    </div>
  );
} 

export default SuspectList;