import fetch from 'node-fetch'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { prompt } = req.body || {}
  if (!prompt) return res.status(400).json({ error: 'prompt is required' })

  const HF_API_KEY = process.env.HF_KEY || process.env.HF_API_KEY || ''

  if (!HF_API_KEY) {
    // If no key, return a friendly message so user can still run the app without a key
    return res.status(200).json({
      output:
        "Hugging Face API key not configured. Create a free Hugging Face account and set HF_API_KEY in your environment to enable text generation. Example output: 'This is a placeholder response because no HF_API_KEY is set.'"
    })
  }

  try {
    // Default model: google/flan-t5-small (lightweight)
    const model = 'google/flan-t5-small'
    const r = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    })

    if (!r.ok) {
      const text = await r.text()
      return res.status(r.status).json({ error: text })
    }

    const data = await r.json()
    // Many HF models return an array of {generated_text: "..."} or direct text.
    let output = ''
    if (Array.isArray(data)) {
      output = data.map((d) => d.generated_text || d.text || JSON.stringify(d)).join('\n')
    } else if (typeof data === 'object' && (data.generated_text || data.text)) {
      output = data.generated_text || data.text
    } else if (typeof data === 'string') {
      output = data
    } else {
      output = JSON.stringify(data)
    }

    res.status(200).json({ output })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
