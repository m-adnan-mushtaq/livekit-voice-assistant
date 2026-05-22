import MarkdownPreview from "@uiw/react-markdown-preview";
import "@uiw/react-markdown-preview/markdown.css";

type MarkdownMessageProps = {
  source: string;
  className?: string;
};

export default function MarkdownMessage({
  source,
  className = "",
}: MarkdownMessageProps) {
  return (
    <div className={`markdown-message text-on-surface ${className}`}>
      <MarkdownPreview
        source={source}
        wrapperElement={{ "data-color-mode": "light" }}
        style={{
          padding: 0,
          background: "transparent",
          color: "inherit",
          fontSize: "inherit",
        }}
      />
    </div>
  );
}
