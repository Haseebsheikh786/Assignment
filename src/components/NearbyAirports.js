import React, { useState } from "react";

const NearbyAirports = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [nearbyAirports, setNearbyAirports] = useState([]);
  const [isFetchingNearby, setIsFetchingNearby] = useState(false);
  const [nearbySearched, setNearbySearched] = useState(false);

  const getNearbyAirports = async () => {
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${latitude}&lng=${longitude}&locale=en-US`;

    try {
      setIsFetchingNearby(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "917bbff6a9msheefe7768395dc2ap16af04jsn2ddb44d332bd",
          "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        },
      });

      const data = await response.json();
      setNearbySearched(true);
      setNearbyAirports(data.data && data.data.nearby ? data.data.nearby : []);
    } catch (error) {
      console.error(`Error fetching nearby airports: ${error.message}`);
      setNearbyAirports([]);
    } finally {
      setIsFetchingNearby(false);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h2 className="mb-4 text-center">Nearby Airports</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary w-100 mb-3"
        onClick={getNearbyAirports}
        disabled={isFetchingNearby}
      >
        {isFetchingNearby ? "Fetching..." : "Get Nearby Airports"}
      </button>
      {nearbySearched && (
        <>
          {nearbyAirports.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Airport Name</th>
                  </tr>
                </thead>
                <tbody>
                  {nearbyAirports.map((airport, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{airport.presentation.suggestionTitle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No nearby airports found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default NearbyAirports;
