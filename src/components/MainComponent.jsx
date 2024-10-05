import React from 'react'
import { useEffect ,useState } from 'react'
import axios from 'axios'
import './mainComponent.css'

const MainComponent = () => {

  //const API_KEY = '33f1f2b56d384368ae044133240510';

  const API_KEY = "b03a640e5ef6980o4da35b006t5f2942";
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [url, setUrl] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  


  const handleCityInput = (e) => {
    setCityName(e.target.value);
  };

  const handleSearch = () => {
    if (cityName) {
      // setUrl(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`);
      setUrl(`https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${API_KEY}&units=metric`);
      updateDate()
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

  function updateDate() {
    const date = new Date();
    const options = {weekday: 'long', year:'numeric', month: 'long', day: 'numeric'}
    const formattedDate = date.toLocaleDateString('en-us', options)
    setFormattedDate(formattedDate)
  }


  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" onChange={handleCityInput} value={cityName} placeholder="Enter city name" />
          <button type="submit" onClick={handleSearch}>Search</button>
        </div>
        {
          weatherData ? (
            <>
              <p>{formattedDate}</p>
              <h2>Weather in {weatherData.city}, {weatherData.country}</h2>
              <p>Condition: {weatherData.daily[0].condition.description}</p>
              <img src={weatherData.daily[0].condition.icon_url} alt={weatherData.daily[0].condition.description} />
              <p>Temperature: {weatherData.daily[0].temperature.day}°C</p>
              <p>Humidity: {weatherData.daily[0].temperature.humidity}%</p>
              <p>Wind Speed: {weatherData.daily[0].wind.speed} m/s</p>
            </>
          ) : (
            <p>{url ? "Loading weather data..." : ""}</p>
          )
        }
      </div>
      
    </>
  )
}

export default MainComponent