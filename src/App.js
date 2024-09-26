import React from "react";
import AirportSearch from "./components/AirportSearch";
import NearbyAirports from "./components/NearbyAirports";

const App = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Airport Search App</h1>
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <AirportSearch />
        </div>
        <div className="col-12 col-md-6">
          <NearbyAirports />
        </div>
      </div>
    </div>
  );
};

export default App;
// getNearbyAirports(19.076, 72.8777); // Coordinates for Mumbai

