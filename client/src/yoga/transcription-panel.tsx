import { useEffect, useRef } from "react";
import MarkdownMessage from "../components/chat/MarkdownMessage";
import type { TranscriptMessage as TranscriptMessageType } from "./yoga-room";

type TranscriptPanelProps = {
  messages: TranscriptMessageType[];
};

export default function TranscriptPanel({ messages }: TranscriptPanelProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <section className="flex w-full flex-col bg-surface p-container-padding-mobile md:w-1/2 md:p-container-padding-desktop">
      <div className="mb-10">
        <h1 className="font-headline-md text-headline-md text-primary">
          Live Conversation
        </h1>
        <p className="mt-2 font-body-sm text-on-surface-variant">
          Your voice conversation with Alexa appears here in Markdown.
        </p>
      </div>

      <div className="grow max-h-[calc(100vh-25rem)] overflow-y-auto space-y-6 pr-2">
        {messages.length === 0 ? (
          <div className="message-entrance rounded-xl border border-dashed border-outline-variant/40 bg-surface-container-low p-8 text-center">
            <p className="font-body-md text-on-surface-variant">
              Start speaking. Your conversation with Alexa will appear here.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <TranscriptMessage
              key={message.id || index}
              message={message}
              index={index}
            />
          ))
        )}
        <div ref={endRef} />
      </div>
    </section>
  );
}

function TranscriptMessage({
  message,
  index,
}: {
  message: TranscriptMessageType;
  index: number;
}) {
  const isUser = message.type === "user";

  return (
    <div
      className={`message-entrance flex ${isUser ? "justify-end" : "justify-start"}`}
      style={{ animationDelay: `${Math.min(index * 0.15, 1.5)}s` }}
    >
      <div
        className={`max-w-[85%] px-6 py-4 ${
          isUser
            ? "rounded-xl rounded-tr-none border border-primary/10 bg-primary-container/30"
            : "rounded-xl rounded-tl-none bg-surface-container-high"
        }`}
      >
        <p
          className={`mb-2 font-label-caps text-[10px] ${
            isUser ? "text-right text-primary" : "text-on-surface-variant"
          }`}
        >
          {isUser ? "YOU" : "ALEXA"}
        </p>
        {isUser ? (
          <p className="font-body-md text-body-md whitespace-pre-wrap">
            {message.text}
          </p>
        ) : (
          <MarkdownMessage source={message.text || "_Listening…_"} />
        )}
      </div>
    </div>
  );
}
