import React, { useState, useEffect } from "react";
import VoiceSearch from "./components/VoiceSearch";
import WeatherCard from "./components/WeatherCard";

const API_KEY = "59b3e51f7efaffd45d543012b6ab8a40"; 

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [bgClass, setBgClass] = useState(
    "bg-gradient-to-b from-brand-400 via-brand-500 to-brand-700"
  );

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
      updateBackground(data.weather[0].main);
    } catch (err) {
      console.error(err);
    }
  };

  const updateBackground = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        setBgClass("bg-gradient-to-b from-accent-200 via-accent-400 to-accent-600");
        break;
      case "clouds":
        setBgClass("bg-gradient-to-b from-cloud-100 via-cloud-200 to-cloud-300");
        break;
      case "rain":
      case "drizzle":
        setBgClass("bg-gradient-to-b from-brand-700 via-brand-600 to-cloud-400");
        break;
      case "thunderstorm":
        setBgClass("bg-gradient-to-b from-brand-900 via-brand-800 to-black");
        break;
      case "snow":
        setBgClass("bg-gradient-to-b from-cloud-200 via-cloud-100 to-white");
        break;
      default:
        setBgClass("bg-gradient-to-b from-brand-400 via-brand-500 to-brand-700");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
        updateBackground(data.weather[0].main);
      } catch (err) {
        console.error(err);
      }
    });
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start p-6 transition-all duration-700 relative overflow-hidden ${bgClass}`}
    >
      {/* Animated bouncing title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 animate-bounce drop-shadow-lg">
        🌤️ Weather App
      </h1>

      {/* Search input + buttons */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-xl">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 text-gray-800 flex-1 shadow-lg transition-all duration-300 hover:scale-105"
        />
        <div className="flex gap-2">
          <button
            onClick={() => fetchWeather(city)}
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold px-4 py-3 rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-lg"
          >
            Search
          </button>
          <VoiceSearch onSearch={fetchWeather} />
        </div>
      </div>

      {/* Weather card */}
      <div className="w-full max-w-md">
        {weather ? (
          <WeatherCard weather={weather} />
        ) : (
          <p className="text-white text-center mt-10 animate-pulse text-lg md:text-xl">
            Enter a city or use voice search to see the weather!
          </p>
        )}
      </div>

      {/* Floating clouds */}
      <div className="absolute top-20 left-0 w-full h-64 overflow-hidden pointer-events-none">
        <div className="bg-white/30 rounded-full w-32 h-20 absolute top-10 left-10 animate-float-slow"></div>
        <div className="bg-white/40 rounded-full w-48 h-28 absolute top-20 left-52 animate-float-slow"></div>
        <div className="bg-white/20 rounded-full w-24 h-16 absolute top-40 left-24 animate-float-slow"></div>
      </div>
      <div className="bg-brand-500 text-white p-4 rounded-lg shadow-card mt-6">
        Tailwind is working!
      </div>

    </div>
  );
}

export default App;
