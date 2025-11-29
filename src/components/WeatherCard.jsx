import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { name, main, weather: w } = weather;

  return (
    <div className="bg-glass rounded-3xl p-6 text-center transition-transform transform hover:scale-105 duration-500 shadow-card border border-white/20">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-brand-900">{name}</h2>
      <p className="text-4xl md:text-5xl font-extrabold text-brand-700">{Math.round(main.temp)}°C</p>
      <p className="capitalize text-lg md:text-xl text-brand-600">{w[0].description}</p>
      <p className="mt-2 text-brand-800 text-base md:text-lg">Humidity: {main.humidity}%</p>
    </div>
  );
};

export default WeatherCard;
