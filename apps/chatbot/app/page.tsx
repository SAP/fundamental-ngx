'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Page() {
    const { messages, sendMessage, status, error } = useChat();
    const [input, setInput] = useState('');

    const busy = status === 'submitted' || status === 'streaming';

    return (
        <main style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui' }}>
            <h1>Fundamental NGX Assistant</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {messages.map((m) => (
                    <div key={m.id}>
                        <strong>{m.role === 'user' ? 'You' : 'Assistant'}:</strong>
                        {m.parts.map((part, i) => (part.type === 'text' ? <span key={i}> {part.text}</span> : null))}
                    </div>
                ))}
            </div>
            {error ? (
                <p role="alert" style={{ color: '#b00', marginTop: 12, whiteSpace: 'pre-wrap' }}>
                    Error: {error.message}
                </p>
            ) : null}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!input.trim()) return;
                    sendMessage({ text: input });
                    setInput('');
                }}
                style={{ marginTop: 16, display: 'flex', gap: 8 }}
            >
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="How do I use fd-dialog?"
                    style={{ flex: 1, padding: 8 }}
                    disabled={busy}
                />
                <button type="submit" disabled={busy}>
                    Send
                </button>
            </form>
        </main>
    );
}
