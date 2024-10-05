import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  
  const API_KEY = '33f1f2b56d384368ae044133240510';
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [url, setUrl] = useState("");


  const handleCityInput = (e) => {
    setCityName(e.target.value);
  };

  const handleSearch = () => {
    if (cityName) {
      setUrl(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`);
    } else {
      alert("Please enter a city name");
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (url) {
        try {
          const response = await axios.get(url);
          if (response.status >= 400) throw new Error("Data not Fetched");
          setWeatherData(response.data);
        } catch (e) {
          console.log("Error fetching the data:", e);
        }
      }
    };
    fetchWeatherData();
  }, [url]);

  return (
    <>
      <input type="text" onChange={handleCityInput} value={cityName} placeholder="Enter city name" />
      <button type="submit" onClick={handleSearch}>Search</button>
      
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
          <p>{url ? "Loading weather data..." : ""}</p>
        )
      }
    </>
  );
}

export default App;
