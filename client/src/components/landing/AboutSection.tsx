const features = [
  {
    icon: "self_improvement",
    title: "Gentle Movement",
    description:
      "Low-impact mobility exercises designed to ease tension and improve flexibility without strain.",
    iconBg: "bg-primary-container/30",
    iconColor: "text-primary",
  },
  {
    icon: "air",
    title: "Breathwork",
    description:
      "Conscious breathing techniques to calm the nervous system and anchor your focus in the present.",
    iconBg: "bg-tertiary-container/30",
    iconColor: "text-tertiary",
  },
  {
    icon: "spa",
    title: "Relaxation",
    description:
      "A dedicated portion of every session for restorative stillness, leaving you feeling centered.",
    iconBg: "bg-secondary-container/30",
    iconColor: "text-secondary",
  },
];

const ABOUT_IMAGE = "/images/hero-img.jpeg";

export default function AboutSection() {
  return (
    <section id="about" className="py-stack-xl relative">
      <div className="absolute inset-0 wave-bg pointer-events-none" />
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop text-center relative">
        <h2 className="font-headline-md text-on-surface mb-stack-md">
          A softer way to begin yoga.
        </h2>
        <p className="font-body-lg text-secondary max-w-2xl mx-auto mb-stack-lg leading-relaxed">
          Yoga doesn&apos;t have to be intense to be effective. We focus on
          slow, mindful movements that honor your body&apos;s rhythm and create
          space for peace in your daily life.
        </p>

        <div className="mb-stack-lg rounded-3xl overflow-hidden soft-ambient-shadow">
          <img
            alt="Close-up of a person's hands in a meditation pose"
            className="w-full h-[400px] object-cover md:h-[500px]"
            src={ABOUT_IMAGE}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-surface-container-low p-10 rounded-3xl border border-outline-variant/10 text-left transition-transform hover:scale-[1.02] duration-300"
            >
              <div
                className={`w-12 h-12 rounded-full ${feature.iconBg} flex items-center justify-center ${feature.iconColor} mb-6`}
              >
                <span className="material-symbols-outlined">
                  {feature.icon}
                </span>
              </div>
              <h3 className="font-headline-sm text-on-surface mb-4">
                {feature.title}
              </h3>
              <p className="font-body-md text-on-surface-variant">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
