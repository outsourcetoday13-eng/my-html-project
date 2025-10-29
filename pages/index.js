import { useState } from 'react'
import ChatBox from '../components/ChatBox'

export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loadingWeather, setLoadingWeather] = useState(false)

  async function fetchWeather(e) {
    e.preventDefault()
    if (!city) return
    setLoadingWeather(true)
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const data = await res.json()
      setWeather(data)
    } catch (err) {
      setWeather({ error: err.message })
    } finally {
      setLoadingWeather(false)
    }
  }

  return (
    <main style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Free APIs demo app</h1>
      <p>This app uses only free services: Open-Meteo, OpenStreetMap, and Hugging Face (optional).</p>

      <section style={{ margin: '2rem 0' }}>
        <h2>Weather (Open-Meteo)</h2>
        <form onSubmit={fetchWeather}>
          <input
            placeholder="Enter city (e.g., London)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ padding: '0.5rem', width: 300 }}
          />
          <button type="submit" style={{ marginLeft: 8, padding: '0.5rem' }}>
            {loadingWeather ? 'Loading…' : 'Get Weather'}
          </button>
        </form>
        {weather && (
          <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
            {JSON.stringify(weather, null, 2)}
          </pre>
        )}
      </section>

      <section style={{ margin: '2rem 0' }}>
        <h2>Text generation (Hugging Face — optional)</h2>
        <ChatBox />
        <p style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
          Note: To enable the LLM you must add HF_API_KEY to your environment (see README).
        </p>
      </section>
    </main>
  )
}
