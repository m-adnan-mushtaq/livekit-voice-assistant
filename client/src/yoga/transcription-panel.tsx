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
    <section className="mt-5 rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-5 soft-ambient-shadow">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-headline-sm text-on-surface">Live transcript</h2>
          <p className="font-body-md text-on-surface-variant">
            Realtime conversation between you and Alexa
          </p>
        </div>

        <div className="rounded-full bg-surface-container px-3 py-1 text-xs text-on-surface-variant">
          {messages.length} messages
        </div>
      </div>

      <div className="max-h-40 space-y-3 overflow-y-auto pr-2">
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-low p-6 text-center text-sm text-on-surface-variant">
            Start speaking. Your transcript will appear here.
          </div>
        ) : (
          messages.map((message, index) => (
            <TranscriptMessage key={message.id || index} message={message} />
          ))
        )}
        <div id="lastMessage" ref={ref} />
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
            ? "bg-primary text-on-primary"
            : "border border-outline-variant/30 bg-surface-container-low text-on-surface"
        }`}
      >
        <div
          className={`mb-1 text-xs font-semibold ${
            isUser ? "text-primary-fixed" : "text-primary"
          }`}
        >
          {isUser ? "You" : "Alexa"}
        </div>

        <p>{message.text}</p>
      </div>
    </div>
  );
}
