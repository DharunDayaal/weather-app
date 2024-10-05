import 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App(){

  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '33f1f2b56d384368ae044133240510'
  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=seoul`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try{
        const response = await axios.get(url);
        if(response.status > 250 ) throw new Error("Data not Fetched")
        setWeatherData(response.data);
      }
      catch(e) {
        console.log("Error on fetching the data ", e);
      }
    }
    fetchWeatherData()
  }, [url])

  return (
    <>
      {
        weatherData ? (
          <div>
            <h2>Weather in {weatherData.location.name}</h2>
            <p>{weatherData.current.condition.text}</p>
            <p>{weatherData.location.region}</p>
            <p>{weatherData.location.country}</p>
            <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
            <p>Temperature: {weatherData.current.temp_c}°C</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        ) 
      }

    </>
  );
}

export default App;