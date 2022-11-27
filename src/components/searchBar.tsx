import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setCity, StateType } from "../store/weather.slice";

export const SearchBar = () => {
  const [cityName, setCityName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const onSearch=()=>{
    dispatch(setCity(cityName.charAt(0).toUpperCase() + cityName.slice(1)))
  }
  return (
    <div className="search-box">
      <input
        onChange={(e) => setCityName(e.target.value)}
        className="searchbar"
        value={cityName}
        placeholder="Search bar"
      />
      <button onClick={() => onSearch()}>Search</button>
    </div>
  );
};
