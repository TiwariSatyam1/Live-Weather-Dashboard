// import Search from './components/search/search';
// import './App.css';
// import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
// import CurrentWeather from './components/search/current-weather/current-weather';
// import { useState } from 'react';

// function App() {
//   const [CurrentWeather, setCurrentWeather] = useState(null);
//   const [Forecast, setForecast] = useState(null);
    
//     const handleOnSearchChange = (searchData) => {
//       const [lat, lon]    = searchData.value.split("");

//       const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
//       const forecastFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);

//       Promise.all([currentWeatherFetch, forecastFetch])
//       .then(async (response) => {
//         const weatherResponse = await response[0].json();
//         const forecastResponse = await response[1].json();
        
//         setCurrentWeather({city: searchData.label, ...weatherResponse});
//         setForecast({city: searchData.label, ...forecastResponse});

//     })
//     .catch((err) => console.log(err));
//   }

//   console.log(CurrentWeather);
//   console.log(Forecast);

//   return (
//     <div className="container">
//       <Search onSearchChange={handleOnSearchChange}/>

//     </div>
//   );
// }

//  export default App;
// -------------------------------------------------------------------------------------------------------------

import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/search/current-weather/current-weather";
import Forecast from "./components/search/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;