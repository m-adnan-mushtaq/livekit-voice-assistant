import SectionContainer from "./shared/SectionContainer";

const reasons = [
  {
    icon: "visibility",
    title: "Private 1:1 attention",
    description:
      "Total focus on your form and alignment, ensuring safety and progress.",
  },
  {
    icon: "eco",
    title: "Beginner-friendly flow",
    description:
      "Never feel left behind. We move at a pace that respects your starting point.",
  },
  {
    icon: "target",
    title: "Goal-based matching",
    description:
      "Our AI connects you with the instructor best suited for your specific intentions.",
  },
  {
    icon: "schedule",
    title: "Flexible online sessions",
    description:
      "Book anytime, anywhere. Your studio is wherever you decide to unroll your mat.",
  },
  {
    icon: "groups",
    title: "Real instructors",
    description:
      "No recordings. Real-time feedback and encouragement from living experts.",
  },
  {
    icon: "auto_awesome",
    title: "Simple booking journey",
    description: "Voice commands make scheduling as easy as exhaling.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="bg-surface-container-low py-stack-xl">
      <SectionContainer>
        <h2 className="font-display-lg mb-16 text-center text-headline-md">
          Why Clients Love Practicing With Us
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="yoga-card rounded-xl border border-outline-variant/20 bg-surface p-8"
            >
              <div className="mb-4 text-primary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 40 }}
                >
                  {reason.icon}
                </span>
              </div>
              <h4 className="mb-3 font-headline-sm text-[22px]">
                {reason.title}
              </h4>
              <p className="text-on-surface-variant">{reason.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
