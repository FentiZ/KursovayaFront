import { useState } from "react";

export default function Chat({ t }: any) {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text) return;
    setMessages([...messages, text]);
    setText("");
  };

  return (
    <div className="chat">
      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className="msg">{m}</div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.messagePlaceholder}
        />
        <button onClick={send}>➤</button>
      </div>
    </div>
  );
}