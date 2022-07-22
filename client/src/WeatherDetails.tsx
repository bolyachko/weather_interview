import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import clsx from "clsx";

import Wind from './img/wind.svg';
import Humidity from './img/humidity.svg';
import UVIndex from './img/uvindex.svg';
import Pressure from './img/pressure.svg';

function WeatherDetails({
    wind,
    humidity,
    uvIndex,
    pressure
  }: Record<any, any>) {

  return (
    <div className="weather-details">
        <h1 className="today">Today Details</h1>
        <div className="weather-items">
          <div className="weather-item wind">
            <div className="img">
              <img src={Wind} alt="Wind" />
            </div>
            <div className="weather-text">
              <div className="value">{wind} kmh</div>
              <div className="description">Wind</div>
            </div>
          </div>
          <div className="weather-item humidity">
            <div className="img">
              <img src={Humidity} alt="Humidity" />
            </div>
            <div className="weather-text">
              <div className="value">{humidity}%</div>
              <div className="description">Humidity</div>
            </div>
          </div>
          <div className="weather-item uvIndex">
            <div className="img">
              <img src={UVIndex} alt="UV Index" />
            </div>
            <div className="weather-text">
              <div className="value">{uvIndex}</div>
              <div className="description">UV Index</div>
            </div>
          </div>
          <div className="weather-item pressure">
            <div className="img">
              <img src={Pressure} alt="Pressure" />
            </div>
            <div className="weather-text">
              <div className="value">{pressure} hPA</div>
              <div className="description">Pressure</div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default WeatherDetails;