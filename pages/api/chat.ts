import type { NextApiRequest, NextApiResponse } from 'next';

// Basic server-side guard to prevent missing key usage
const apiKey = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'Server missing OPENAI_API_KEY' });
  }

  try {
    const { messages, model: inputModel } = req.body as {
      messages: { role: 'system' | 'user' | 'assistant'; content: string }[];
      model?: string;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' });
    }

    // Normalize/whitelist model names from UI to valid OpenAI models
    const allowedModels = new Set(['gpt-4o-mini', 'gpt-4o', 'o3-mini']);
    const resolvedModel = inputModel && allowedModels.has(inputModel) ? inputModel : 'gpt-4o-mini';

    const sanitizedMessages = messages.map((m) => ({
      role: m.role === 'assistant' || m.role === 'system' ? m.role : 'user',
      content: String(m.content ?? ''),
    }));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: resolvedModel,
        messages: [
          { role: 'system', content: 'You are a concise, helpful coding assistant. Always structure answers using Markdown: short headings (##), bullet lists, and fenced code blocks with appropriate languages. Keep paragraphs short and scannable.' },
          ...sanitizedMessages,
        ],
        temperature: 0.2,
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: json?.error?.message || 'OpenAI error' });
    }

    const content = json?.choices?.[0]?.message?.content ?? '';

    return res.status(200).json({ content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}


