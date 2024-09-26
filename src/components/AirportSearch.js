import React, { useState } from "react";

const AirportSearch = () => {
  const [airportName, setAirportName] = useState("");
  const [airports, setAirports] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!airportName) return;

    try {
      setIsSearching(true);
      const response = await fetch(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${airportName}&locale=en-US`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "917bbff6a9msheefe7768395dc2ap16af04jsn2ddb44d332bd",
            "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
          },
        }
      );

      const data = await response.json();
      setSearched(true);
      setAirports(data.data || []);
    } catch (error) {
      console.error("Error fetching airports:", error);
      setAirports([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h2 className="mb-4 text-center">Search Airports</h2>
      <div className="search-bar d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search airport"
          value={airportName}
          onChange={(e) => setAirportName(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
      {searched && (
        <>
          {airports.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Airport Name</th>
                  </tr>
                </thead>
                <tbody>
                  {airports.map((airport, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{airport.navigation.localizedName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No airports found</p>
          )}
        </>
      )}
    </div>
  );
};

export default AirportSearch;
