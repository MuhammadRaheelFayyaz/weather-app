import React, { useCallback, useEffect, useState } from "react";
import { Slider } from "./slider";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { API_KEY, API_URL } from "../config/config";
import { Temp, Weather } from "../store/weather.slice";

type StateType = {
  weather: Weather;
  temp: Temp;
  date: string;
};
type State = StateType[];
export const WeaklyForcast = () => {
  const { city,coord } = useSelector((state: RootState) => state.weatherReducer);
  const [data, setData] = useState<State>([]);

  const loadData = useCallback(async () => {
    try {
      
      const response = await axios.get(
        `${API_URL}/forecast?q=${city}&APPID=${API_KEY}`
      );
      const tempData: StateType[] = response.data.list.slice(1).map((item: any) => {
        const { main, weather, dt } = item;
        return {
          date: new Date(dt * 1000).toLocaleString(),
          temp: {
            temp: `${Math.round((main.temp - 273.15) * 100) / 100}°C`,
            max_temp: `${Math.round((main.temp_max - 273.15) * 100) / 100}°C`,
            min_temp: `${Math.round((main.temp_min - 273.15) * 100) / 100}°C`,
          },
          weather: {
            description:
              weather[0].description.charAt(0).toUpperCase() +
              weather[0].description.slice(1),
            icon: weather[0].icon,
          },
        };
      });
      setData(tempData);
    } catch (e) {
      console.log(e);
    }
  }, [city]);
  useEffect(() => {
    loadData();
  }, [city]);
  return (
    <div className="weekly-forcast">
      <div className="title">{`Weekly Forcast for ${city}`}</div>
      <Slider data={data} />
    </div>
  );
};
