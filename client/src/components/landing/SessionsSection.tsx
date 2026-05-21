import TalkToAlexaButton from "../ui/TalkToAlexaButton";
import SectionContainer from "./shared/SectionContainer";

const tags = [
  "Beginner friendly",
  "Online session",
  "Personal instructor",
  "Goal-based yoga",
  "Calm guidance",
];

export default function SessionsSection() {
  return (
    <section id="sessions" className="bg-surface-container py-stack-xl">
      <SectionContainer>
        <h2 className="font-display-lg mb-12 text-headline-md">
          Available Sessions
        </h2>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-xl border border-outline-variant/30 bg-surface p-stack-lg shadow-sm">
            <div className="absolute right-0 top-0 p-8 text-primary/10">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 120 }}
              >
                spa
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="mb-4 font-headline-sm text-headline-sm">
                Online 1:1 Yoga
              </h3>
              <p className="mb-8 max-w-md text-on-surface-variant">
                Our premium experience. Completely tailored to your physical
                capabilities and mental intentions. Guided by certified masters.
              </p>
              <div className="mb-10 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary-container/30 px-4 py-1.5 font-body-sm font-medium text-on-primary-container"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <TalkToAlexaButton variant="primary" label="Book Now" />
            </div>
          </div>

          <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-outline-variant/10 bg-surface/50 p-stack-lg text-center opacity-60">
            <div className="relative z-10">
              <h3 className="mb-2 font-headline-sm text-headline-sm">
                Group Yoga
              </h3>
              <p className="mb-4 font-label-caps text-label-caps text-secondary">
                Coming soon
              </p>
              <p className="mx-auto max-w-xs text-on-surface-variant">
                Community-driven sessions for up to 10 practitioners. Register
                for early access notification.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
