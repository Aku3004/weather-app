import React, { useState, useEffect } from 'react'
import VoiceSearch from './components/VoiceSearch'
import WeatherCard from './components/WeatherCard'

const API_KEY = '59b3e51f7efaffd45d543012b6ab8a40'

export default function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async (cityName) => {
    if (!cityName) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      )
      if (!res.ok) throw new Error('City not found')
      const data = await res.json()
      setWeather(data)
    } catch (err) {
      setWeather(null)
      setError(err.message || 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // optionally prefill by geolocation
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        if (!res.ok) return
        const data = await res.json()
        setWeather(data)
      } catch (err) {
        // ignore
      }
    })
  }, [])

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 overflow-hidden">
      {/* decorative orbs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent-400/40 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-cloud-300/30 blur-2xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl px-4">
        <div className="mx-auto bg-white/8 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-card">
          <h1 className="text-center text-3xl font-extrabold text-white mb-4">🌤 Weather</h1>

          {/* Search input */}
          <div>
            <input
              className="w-full px-4 py-3 rounded-lg bg-white/80 placeholder:text-brand-700 text-brand-900 outline-none shadow-sm"
              placeholder="Enter city (e.g. London)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') fetchWeather(city) }}
            />
          </div>

          {/* Buttons under input */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => fetchWeather(city)}
              className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
            >
              Search
            </button>

            <VoiceSearch onSearch={(c) => { setCity(c); fetchWeather(c) }} />
          </div>

          {/* Result area */}
          <div className="mt-6">
            {loading && (
              <div className="text-center text-white/90">Loading...</div>
            )}

            {error && (
              <div className="text-center text-accent-100/90">{error}</div>
            )}

            {!loading && !error && weather && (
              <div className="mt-2">
                <WeatherCard weather={weather} />
              </div>
            )}

            {!loading && !weather && !error && (
              <div className="mt-4 text-center text-white/80">Search for a city or use voice search.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
