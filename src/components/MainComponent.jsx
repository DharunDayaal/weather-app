import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './mainComponent.css'
import { ClipLoader } from 'react-spinners'
import AnimatedWeather from 'react-animated-weather'
import { IoSearchOutline } from 'react-icons/io5'

const MainComponent = () => {

  const API_KEY = "b03a640e5ef6980o4da35b006t5f2942";
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [url, setUrl] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCityInput = (e) => {
    setCityName(e.target.value);
  };

  const handleSearch = () => {
    if (cityName) {
      setLoading(true);
      setUrl(`https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${API_KEY}&units=metric`);
      updateDate();
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
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWeatherData();
  }, [url]);

  function updateDate() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-us', options);
    setFormattedDate(formattedDate);
  }

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" onChange={handleCityInput} value={cityName} placeholder="Enter city name" />
          <button type="submit" onClick={handleSearch}>
            <IoSearchOutline fontSize={20} />
          </button>
        </div>
        {
          weatherData && !loading ? (
            <>
              <div className='city'>
                <h2>{weatherData.city}, {weatherData.country}</h2>
              </div>
              <div className="date">
                <p>{formattedDate}</p>
              </div>
              <div className="icon-deg">
                <p>{weatherData.daily[0].condition.description}</p>
                <img src={weatherData.daily[0].condition.icon_url} alt={weatherData.daily[0].condition.description} />
              </div>
              <div className="humi-wind">
                <p>{weatherData.daily[0].wind.speed}m/s</p>
                <p>Wind speed</p>
                <p>{weatherData.daily[0].temperature.humidity}%</p>
                <p>Humidity</p>
              </div>
              <p>Temperature: {weatherData.daily[0].temperature.day}°C</p>
            </>
          ) : (
            <div className='loader'>
              <ClipLoader width={100} height={90} loading={loading} color='#3d76a9' />
            </div>
          )
        }
      </div>
    </>
  )
}

export default MainComponent;
