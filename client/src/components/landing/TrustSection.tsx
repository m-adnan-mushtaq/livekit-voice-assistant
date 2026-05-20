const trustItems = [
  { icon: "schedule", label: "30-minute online sessions" },
  { icon: "favorite", label: "Beginner-friendly" },
  { icon: "air", label: "Gentle movement & breathwork" },
  { icon: "voice_selection", label: "Easy booking with Alexa" },
];

export default function TrustSection() {
  return (
    <section className="bg-surface-container py-12">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop overflow-x-auto">
        <div className="flex flex-nowrap md:flex-wrap justify-between items-center gap-8 min-w-max md:min-w-0">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 text-primary"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-md whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
