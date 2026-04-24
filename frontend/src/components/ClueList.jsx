function ClueList({ clues }) {
  return (
    <div className="card">
      <h2>단서</h2>

      {clues.length === 0 ? (
        <p>단서 불러오는 중...</p>
      ) : (
        <ul>
          {clues.map((clue, index) => (
            <li key={index}>
                <strong>{clue.title}</strong>
                <p>{clue.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClueList;