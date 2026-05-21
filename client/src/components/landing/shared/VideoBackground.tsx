type VideoBackgroundProps = {
  src: string;
  poster?: string;
  className?: string;
};

export default function VideoBackground({
  src,
  poster,
  className = "",
}: VideoBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="h-full w-full object-cover"
        aria-hidden
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
