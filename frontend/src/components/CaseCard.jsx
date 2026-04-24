function CaseCard({ caseData }) {
  return (
    <div className="card">
      <h2>사건 내용</h2>

      {!caseData ? (
        <p>사건 내용 불러오는 중...</p>
      ) : (
        <div>
          <strong>{caseData.title}</strong>
          <p>{caseData.summary}</p>
        </div>
      )}
    </div>
  );
}

export default CaseCard;