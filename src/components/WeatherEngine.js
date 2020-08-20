import React, { useState, useEffect } from "react";
import Pulseloader from "react-spinners/PulseLoader";

import WeatherCard from "./WeatherCard/component";

const WeatherEngine = ({ location }) => {
  // init for our state variables
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null,
  });
  // defining the data fetching function
  const getWeather = async (q) => {
    setQuery(""); // To set value to empty when refreshed
    setloading(true);
    try {
      // Try the code
      const apiRes = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=5cfc3d4420a49ba2612b9d92de1ccc50`
      );

      const resJSON = await apiRes.json();
      setWeather({
        temp: resJSON.main.temp,
        city: resJSON.name,
        condition: resJSON.weather[0].main,
        country: resJSON.sys.country,
      });
    } catch (error) {
      // catch error
      setError(true);
    }

    setloading(false);
  };
  // Function to handle search queries from user side
  //const handleSearch = (e) => {// no longer in use
  //e.preventDefault();
  //getWeather(query);
  // };
  // This hook will make the code run only once the component is mounted and never again
  useEffect(() => {
    getWeather(location);
  }, [location]);

  if (error) {
    // If not loading and there is an error, display below
    return (
      <div style={{ color: "black" }}>
        There has been an error!
        <br /> <button onClick={() => setError(false)}> Reset! </button>{" "}
      </div>
    );
  }
  // If  there is loading , Display the belo
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          width: "200px",
          height: "240px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pulseloader size={15} color="green" />
      </div>
    );
  }
  // If there is no loading and no error, Display below
  return (
    <div>
      <WeatherCard
        temp={weather.temp}
        condition={weather.condition}
        city={weather.city}
        country={weather.country}
        getWeather={getWeather}
      />
    </div>
  );
};

export default WeatherEngine;
