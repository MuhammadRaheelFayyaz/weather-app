import React, { useState } from "react";

export const Convertor = () => {
  const [celsius, setCelsius] = useState<string | number>("");
  const [fahrenheit, setFahrenheit] = useState<string | number>("");
  const onChange = (name: string, value: string) => {
    if (name === "celsius" && value !== celsius) {
      setCelsius(value);
      setFahrenheit(+value * 1.8 + 32);
    }
    if (name === "fahrenheit" && value !== fahrenheit) {
      setFahrenheit(value);
      setCelsius((+value - 32) * 0.5556);
    }
  };
  return (
    <div className="card" style={{marginLeft:0}}>
      <div className="title">Temperature Convertor</div>
      <div className="form">
        <span className="input-group">
          <div>Celsius</div>
          <input
            type="number"
            value={celsius}
            name="celsius"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </span>
        <span className="input-group">
          <div>Fahrenheit</div>
          <input
            value={fahrenheit}
            name="fahrenheit"
            onChange={(e) => onChange(e.target.name, e.target.value)}
            type="number"
          />
        </span>
      </div>
    </div>
  );
};
