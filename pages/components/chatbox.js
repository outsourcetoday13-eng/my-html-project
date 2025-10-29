import { useState } from 'react'

export default function ChatBox() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setResponse(null)
    setError(null)
    try {
      const r = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      const data = await r.json()
      if (!r.ok) throw new Error(data.error || 'Unknown error')
      setResponse(data.output)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="60"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something (e.g., 'Write a haiku about coffee')"
        />
        <div>
          <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? 'Thinking…' : 'Generate'}
          </button>
        </div>
      </form>

      {response && (
        <div style={{ marginTop: 12, background: '#f0fff0', padding: 12 }}>
          <strong>Response:</strong>
          <pre>{response}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: 12, background: '#fff0f0', padding: 12 }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  )
}
