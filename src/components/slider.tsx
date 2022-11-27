import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { ICON_URL } from "../config/config";
import { RootState } from "../store/store";
import { Temp, Weather } from "../store/weather.slice";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type Item={
  temp:Temp,
  weather:Weather,
  date:string
}

type Props={
  data:Item[]  
}
export const Slider = ({data}:Props) => {
  const { city } = useSelector(
    (state: RootState) => state.weatherReducer
  );
  return (
    <div className="slider">
      <Carousel responsive={responsive}>
        {data.map((item:Item) => {
          return (
            <div className="card">
              <img  className="weather-icon" src={`${ICON_URL}${item.weather?.icon}.png`} />
              <div className="title">{item.date}</div>
               
              <div className="card-body">
                <div className="detail">
                  <div>{`Current Temprature: ${item.temp.temp}`}</div>
                  <div>{`Weather Condition: ${item.weather.description}`}</div>
                  <div>{`Highest and Lowed Temp: ${item.temp.max_temp}/${item.temp.min_temp}`}</div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
