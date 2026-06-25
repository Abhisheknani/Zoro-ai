import Cookies from 'js-cookie';

export async function* streamChat(convId, msg) {
  const token = Cookies.get('token');

  const resp = await fetch('http://127.0.0.1:8000/api/V1/chat/stream/chat/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ conversation: convId, role: 'user', content: msg }),
  });

  if (!resp.ok) throw new Error(`Stream error: ${resp.status}`);

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop(); // hold incomplete last line

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === 'data: [DONE]') continue;

      const raw = trimmed.startsWith('data: ') ? trimmed.slice(6) : trimmed;
      try {
        const { content } = JSON.parse(raw);
        if (content) yield content;
      } catch {
        // skip malformed lines
      }
    }
  }
}
