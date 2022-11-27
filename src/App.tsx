import React, { useEffect } from "react";
import { Navbar } from "./components/navbar";
import "./App.css";
import { SearchBar } from "./components/searchBar";
import { TodayForcast } from "./components/todayForcastCard";
import { WeaklyForcast } from "./components/weeklyForcast";
import { WeatherMap } from "./components/weatherMap";
import axios from "axios";
import { setWeatherReport, setLoading } from "./store/weather.slice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { API_KEY, API_URL } from "./config/config";
import { Convertor } from "./components/convertor";

function App() {
  const { city,loading } = useSelector((state: RootState) => state.weatherReducer);
  const dispatch = useDispatch<AppDispatch>();
  const loadData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${API_URL}/weather?q=${city}&APPID=${API_KEY}`)
      const { data } = response;
      const { main, sys, wind, name } = data;
      const weather = data.weather[0];
      dispatch(
        setWeatherReport({
          coord: data.coord,
          weather: {
            description:
              weather.description.charAt(0).toUpperCase() +
              weather.description.slice(1),
            icon: weather.icon,
          },
          temp: {
            temp: `${Math.round((main.temp - 273.15) * 100) / 100}°C`,
            max_temp: `${Math.round((main.temp_max - 273.15) * 100) / 100}°C`,
            min_temp: `${Math.round((main.temp_min - 273.15) * 100) / 100}°C`,
          },
          city: name,
          sunrise: new Date(sys.sunrise * 1000).toLocaleTimeString("en-US"),
          sunset: new Date(sys.sunset * 1000).toLocaleTimeString("en-US"),
          windSpeed: `${(wind.speed * 3600) / 1000}Km/h`,
          humidity: `${main.humidity}%`,
          pressure: `${main.pressure} hPa`,
          loading: false,
        })
      );
    } catch (e) {
      console.log(e);
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    loadData();
  }, [city]);
  if(loading){
    return <>Loading...</>
  }
  return (
    <div className="container">
      <Navbar />
      <SearchBar />
      <div className="main">
        <div className="right-section">
          <TodayForcast />
          <WeaklyForcast />
        </div>
        <div className="left-section">
          <WeatherMap />
          <Convertor />
        </div>
      </div>
    </div>
  );
}

export default App;
