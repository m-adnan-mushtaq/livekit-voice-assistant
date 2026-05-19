import { useEffect, useRef } from "react";
import type { TranscriptMessage as TranscriptMessageType } from "./yoga-room";

type TranscriptPanelProps = {
  messages: TranscriptMessageType[];
};

export default function TranscriptPanel({ messages }: TranscriptPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages?.length]);

  return (
    <section className="mt-5 rounded-[2rem] border border-white/10 bg-neutral-900 p-5 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Live transcript</h2>
          <p className="text-sm text-neutral-400">
            Realtime conversation between you and Alexa
          </p>
        </div>

        <div className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-neutral-400">
          {messages.length} messages
        </div>
      </div>

      <div className="max-h-40  space-y-3 overflow-y-auto pr-2">
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-neutral-950 p-6 text-center text-sm text-neutral-500">
            Start speaking. Your transcript will appear here.
          </div>
        ) : (
          messages.map((message, index) => (
            <TranscriptMessage key={message.id || index} message={message} />
          ))
        )}
        <div id="lastMessage" ref={ref}></div>
      </div>
    </section>
  );
}

function TranscriptMessage({ message }: { message: TranscriptMessageType }) {
  const isUser = message.type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 md:max-w-[70%] ${
          isUser
            ? "bg-emerald-400 text-neutral-950"
            : "border border-white/10 bg-neutral-950 text-neutral-100"
        }`}
      >
        <div
          className={`mb-1 text-xs font-semibold ${
            isUser ? "text-neutral-800" : "text-emerald-300"
          }`}
        >
          {isUser ? "You" : "Alexa"}
        </div>

        <p>{message.text}</p>
      </div>
    </div>
  );
}
