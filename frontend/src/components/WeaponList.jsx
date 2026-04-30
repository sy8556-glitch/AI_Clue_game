function WeaponList({ weapons, selectedWeaponId, setSelectedWeaponId }) {
  return (
    <div className="card">
      <h2>무기</h2>

      {weapons.length === 0 ? (
        <p>무기 불러오는 중...</p>
      ) : (
        <ul>
          {weapons.map((weapon) => (
            <li
              key={weapon.id}
              onClick={() => {
                console.log("clicked:", weapon.id);
                setSelectedWeaponId(weapon.id);
              }}
              style={{
                cursor: "pointer",
                backgroundColor:
                  Number(selectedWeaponId) === Number(weapon.id)
                    ? "#ff8787"
                    : "transparent",
              }}
            >
              <strong>{weapon.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WeaponList;