import React, { useState } from "react";
import { API_KEY } from "../config/config";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import "leaflet/dist/leaflet.css";

export const WeatherMap = () => {
  const { coord, loading } = useSelector(
    (state: RootState) => state.weatherReducer
  );
  const [map, setMap] = useState("temp");
  return (
    <>
    <div className="btn-group">
        <button onClick={() => setMap("clouds")}>Clouds</button>
        <button onClick={() => setMap("precipitation")}>Precipitation</button>
        <button onClick={() => setMap("temp")}>Temprature</button>
      </div>
    <div className="mapBox">
      
      <MapContainer
        center={[coord.lat, coord.lon]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`https://{s}.tile.osm.org/{z}/{x}/{y}.png`}
        />
        {/* --------------------------------------- Cloud layer --------------------------------------- */}
        {map === "clouds" && (
          <TileLayer
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          />
        )}
        {map === "precipitation" && (
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          />
        )}
        {map === "temp" && (
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          />
        )}
      </MapContainer>
    </div>
    </>
  );
};
