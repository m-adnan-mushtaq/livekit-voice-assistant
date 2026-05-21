import SectionContainer from "./shared/SectionContainer";

const benefits = [
  { icon: "speed", label: "Benefit 01", title: "Move at your own pace" },
  { icon: "quiz", label: "Benefit 02", title: "Ask questions freely" },
  {
    icon: "ads_click",
    label: "Benefit 03",
    title: "Focus on personal goals",
  },
  { icon: "home", label: "Benefit 04", title: "Practice from home" },
  { icon: "repeat", label: "Benefit 05", title: "Build consistency" },
];

export default function BenefitsSection() {
  return (
    <section className="py-stack-xl">
      <SectionContainer>
        <h2 className="font-display-lg mb-16 text-center text-headline-md">
          Why Online 1:1 Yoga Works Better for Personal Goals
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <div
              key={benefit.label}
              className="rounded-xl bg-tertiary-fixed p-6 text-center"
            >
              <span className="material-symbols-outlined mb-3 text-tertiary">
                {benefit.icon}
              </span>
              <p className="mb-2 font-label-caps text-[10px] uppercase tracking-wider">
                {benefit.label}
              </p>
              <h5 className="font-headline-sm text-[18px]">{benefit.title}</h5>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
