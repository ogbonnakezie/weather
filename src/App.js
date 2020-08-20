import React from "react";

import "./App.css";

import WeatherEngine from "./components/WeatherEngine";

function App() {
  return (
    <div className="App">
      <WeatherEngine location="sydney,au" />
      <br />

      <br />
      <WeatherEngine location="lagos,ng" />
    </div>
  );
}

export default App;
