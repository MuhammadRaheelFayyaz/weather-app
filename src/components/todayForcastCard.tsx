import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ICON_URL } from "../config/config";
import { RootState } from "../store/store";

export const TodayForcast = () => {
  const {
    city,
    weather,
    temp,
    loading,
    windSpeed,
    humidity,
    pressure,
    sunrise,
    sunset,
  } = useSelector((state: RootState) => state.weatherReducer);
  const [isMoreData, setIsMoreData] = useState<boolean>(false);
  if (loading) {
    return <></>;
  }
  return (
    <div className="card">
      <div className="title">{`Today's Forecast for ${city}`}</div>
      <div className="card-body">
        <div className="detail">
          <div>{`Current Temprature: ${temp?.temp}`}</div>
          <div>{`Weather Condition: ${weather?.description}`}</div>
          <div>{`Highest and Lowed Temp: ${temp?.max_temp}/${temp?.min_temp}`}</div>
          {!isMoreData && (
            <div className="more-data" onClick={() => setIsMoreData(true)}>
              More data...
            </div>
          )}
          {isMoreData && (
            <>
              <div className="detail">
                <div>{`Wind Speed: ${windSpeed}`}</div>
                <div>{`Humidity ${humidity}`}</div>
                <div>{`Pressure: ${pressure}`}</div>
                <div>{`Sunrise/Sunset Time: ${sunrise}/${sunset}`}</div>
              </div>
            </>
          )}
          {isMoreData && (
            <div className="more-data" onClick={() => setIsMoreData(false)}>
              Less Data
            </div>
          )}
        </div>

        <img className="weather-icon" src={`${ICON_URL}${weather?.icon}.png`} />
      </div>
    </div>
  );
};
