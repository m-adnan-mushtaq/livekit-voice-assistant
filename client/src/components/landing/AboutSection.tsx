import SectionContainer from "./shared/SectionContainer";

const features = [
  {
    icon: "person_celebrate",
    title: "Personal approach",
    description:
      "Every class is tailored to your specific physical needs and goals.",
  },
  {
    icon: "verified_user",
    title: "Certified instructors",
    description:
      "Learn only from experienced, globally recognized yoga masters.",
  },
  {
    icon: "devices",
    title: "Online convenience",
    description:
      "Join high-quality sessions from the comfort of your own home.",
  },
  {
    icon: "self_improvement",
    title: "Calm experience",
    description:
      "A stress-free booking journey designed to keep you centered.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-stack-xl">
      <SectionContainer>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display-lg mb-6 text-headline-md md:text-display-lg">
              A Calm Online Yoga Studio Built Around You
            </h2>
            <p className="mb-6 font-body-lg font-semibold text-primary">
              We combine personal yoga guidance with simple technology to make
              wellness easier to begin.
            </p>
            <div className="space-y-4 text-on-surface-variant">
              <p>
                At Alexa Yoga Studio, we believe that the path to wellness
                shouldn&apos;t be complicated. Our mission is to dismantle the
                barriers that often prevent people from starting their yoga
                journey—whether that&apos;s a busy schedule, a lack of local
                studios, or the intimidation of group classes.
              </p>
              <p>
                By blending intuitive AI matching with the genuine human
                connection of certified instructors, we provide a sanctuary that
                fits into your pocket and your life. Every session is a bespoke
                experience, designed to honor your body&apos;s unique needs and
                your mind&apos;s quietest intentions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-outline-variant/30 bg-surface-container p-6"
              >
                <span
                  className="material-symbols-outlined mb-4 text-primary"
                  style={{ fontSize: 32 }}
                >
                  {feature.icon}
                </span>
                <h4 className="mb-2 font-headline-sm text-[20px]">
                  {feature.title}
                </h4>
                <p className="text-body-sm text-on-surface-variant">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
