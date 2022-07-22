import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import clsx from "clsx";
import './Weather.scss';
import weatherImage from './img/weather-icons.png';
import WeatherDetails from "./WeatherDetails";

const API_KEY = 'ee438afbfa054fd0b7e07d898bcb1b08';

const  Weather: FC = () => {
  const params = new URLSearchParams({
    appid: API_KEY,
  })

  const [weather, setWeather] = useState<Record<any, any>[] | null>(null)

  const position = useMemo(async () => {
    const {coords} = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      lat: coords.latitude,
      lon: coords.longitude
    }
  }, [])

  useEffect(() => {
    (async () => {
      for (const [key, value] of Object.entries(await position)) {
        params.set(key, value.toString())
      }

      fetch(`http://api.openweathermap.org/data/2.5/forecast?${params}`)
        .then(async (result) => {
          const {list} = await result.json()

          const todayList = list.filter(({dt_txt}: { dt_txt: string | Date; }) => {
            return new Date(dt_txt).getDate() === new Date().getDate()
          })

          setWeather(todayList);
        })
        .catch((error) => {
          console.error(error)
        })
    })()
  }, [position])

  const today = useMemo(() => {
    const monthName = new Date().toLocaleString('default', { month: 'long' });
    const dateNumber = new Date().getDate();

    return [monthName, dateNumber].join(' ');
  }, [])

  const times = [
    {
      name: 'morning',
      title: 'Morning',
      hours: ['6', '9']
    }, {
      name: 'afternoon',
      title: 'Afternoon',
      hours: ['12', '15']
    }, {
      name: 'evening',
      title: 'Evening',
      hours: ['18']
    }, {
      name: 'night',
      title: 'Night',
      hours: ['21', '0', '3']
    }
  ]

  const getTime = useCallback((time: string | Date) => {
    const currentTime = new Date(time).getHours();

    return times.find(({ hours }) => {
      const isExist = hours.find((time) => {
        return time === currentTime.toString()
      })

      return !!isExist;
    })

  }, [times])


  return (
    <div className="weather-app">
      <h1 className="today">{today}</h1>
      {weather && weather.map(({main, weather, dt_txt}) => {
        const time = getTime(dt_txt)
        return (<div className="weather-element" key={dt_txt}>
          <div className="markup"/>
          <div className={clsx('time')}>
            <span className={clsx('icon', `icon-${weather[0].icon}`)} style={{ backgroundImage:`url(${weatherImage})` }}/>
            <span>{time?.title}</span>
          </div>
          <div className={clsx('weather', time?.name)}>
            <span className="temperature">{main.temp}</span>
            <span className="description">{weather[0].description}</span>
          </div>
        </div>)
      })}
      {weather && <WeatherDetails
        wind={weather[0].wind.speed}
        humidity={weather[0].main.humidity}
        // uvIndex not found in API
        uvIndex={'10'}
        pressure={weather[0].main.pressure}
      />}
    </div>
  );
}

export default Weather;