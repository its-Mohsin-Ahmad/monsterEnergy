import { useState } from 'react'

const convos = [
  { id: '1', customerName: 'Alex Carter', subject: 'Order question', lastMessage: 'When will my order ship?', timestamp: '2h ago', unread: true, messages: [
    { id: 'm1', conversationId: '1', sender: 'customer', text: 'When will my order ship?', timestamp: '2h ago' },
    { id: 'm2', conversationId: '1', sender: 'agent', text: 'Demo reply: shipping soon.', timestamp: '1h ago' },
  ]},
  { id: '2', customerName: 'Sam Rivera', subject: 'Product info', lastMessage: 'Is Ultra White zero sugar?', timestamp: '1d ago', unread: false, messages: [
    { id: 'm3', conversationId: '2', sender: 'customer', text: 'Is Ultra White zero sugar?', timestamp: '1d ago' },
  ]},
]

export default function ChatPage() {
  const [active, setActive] = useState(convos[0].id)
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState(convos)
  const c = msgs.find((x) => x.id === active)!
  const send = () => {
    if (!input.trim()) return
    setMsgs((prev) => prev.map((x) => x.id === active ? { ...x, messages: [...x.messages, { id: 'm' + Date.now(), conversationId: active, sender: 'customer', text: input, timestamp: 'now' }] } : x))
    setInput('')
  }
  return (
    <div className="px-4 md:px-8 py-6 grid md:grid-cols-3 gap-4 h-[70vh]">
      <div className="bg-card border border-border rounded-card overflow-y-auto">
        {msgs.map((x) => (
          <button key={x.id} onClick={() => setActive(x.id)} className={`w-full text-left px-4 py-3 border-b border-border ${active === x.id ? 'bg-card-elev' : ''}`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">{x.customerName}</span>
              {x.unread && <span className="w-2 h-2 rounded-full bg-neon" />}
            </div>
            <div className="text-xs text-muted">{x.subject}</div>
            <div className="text-xs text-text-2 truncate">{x.lastMessage}</div>
          </button>
        ))}
      </div>
      <div className="md:col-span-2 bg-card border border-border rounded-card flex flex-col">
        <div className="px-4 py-3 border-b border-border font-semibold">{c.customerName} — {c.subject}</div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {c.messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${m.sender === 'customer' ? 'bg-neon text-black' : 'bg-card-elev text-text'}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-border flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Type a message (demo)..." className="flex-1 bg-bg border border-border rounded-lg px-4 py-2 text-sm focus:border-neon outline-none" />
          <button onClick={send} className="bg-neon text-black font-semibold px-4 py-2 rounded-lg">Send</button>
        </div>
        <p className="text-xs text-muted px-3 pb-2">Demo chat. No real agent online.</p>
      </div>
    </div>
  )
}

