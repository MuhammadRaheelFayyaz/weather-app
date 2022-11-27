import {  createSlice } from "@reduxjs/toolkit";

export type Coord = {
  lat: number;
  lon: number;
};
export type Temp={
    temp:number;
    max_temp:number;
    min_temp:number;
}
export type Weather={
    icon:string,
    description:string
}
export type StateType = {
  city: string;
  coord: Coord;
  loading:boolean;
  temp?:Temp;
  weather?:Weather,
  windSpeed:string|number;
  humidity:string|number;
  pressure:string|number;
  sunrise:string|number;
  sunset:string|number;
};

const initialState: StateType = {
  city: "Islamabad",
  coord: { lon: 73.1338, lat: 33.7104 },
  loading:false,
  windSpeed:'',
  humidity:'',
  sunrise:'',
  sunset:'',
  pressure:''
};
export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLoading:(state,action)=>({...state,loading:action.payload}),
    setCity: (state, action) => ({
      ...state,
      city: action.payload,
    }),
    setWeatherReport:(state,action)=>{
        return({
            ...state,
            ...action.payload
        })
    }
  },

});

export const { setCity,setWeatherReport,setLoading } = weatherSlice.actions;
export default weatherSlice.reducer;
