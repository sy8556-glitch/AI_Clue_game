function LocationList({ locations, selectedLocationId, setSelectedLocationId }) {
  return (
    <div className="card">
      <h2>장소</h2>

      {locations.length === 0 ? (
        <p>장소 불러오는 중...</p>
      ) : (
        <ul>
          {locations.map((location) => (
            <li
              key={location.id}
              onClick={() => {
                console.log("clicked:", location.id);
                setSelectedLocationId(location.id);
              }}
              style={{
                cursor: "pointer",
                backgroundColor:
                  Number(selectedLocationId) === Number(location.id)
                    ? "#ff8787"
                    : "transparent",
              }}
            >
              <strong>{location.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationList;