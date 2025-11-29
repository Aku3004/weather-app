import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { name, main, weather: w } = weather;

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl duration-500">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">{name}</h2>
      <p className="text-4xl md:text-5xl font-extrabold">{Math.round(main.temp)}°C</p>
      <p className="capitalize text-lg md:text-xl">{w[0].description}</p>
      <p className="mt-2 text-gray-700 text-base md:text-lg">Humidity: {main.humidity}%</p>
    </div>
  );
};

export default WeatherCard;
