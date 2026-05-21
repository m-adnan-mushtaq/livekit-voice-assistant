import { INSTRUCTORS } from "./shared/constants";
import SectionContainer from "./shared/SectionContainer";

export default function InstructorsSection() {
  return (
    <section id="instructors" className="py-stack-xl">
      <SectionContainer>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="font-display-lg text-headline-md">
            Meet Your Instructors
          </h2>
          <a
            href="#instructors"
            className="flex items-center gap-2 font-label-caps text-label-caps text-primary transition-all hover:gap-3"
          >
            View all
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {INSTRUCTORS.map((instructor) => (
            <div key={instructor.name} className="group cursor-pointer">
              <div className="relative mb-6 aspect-square overflow-hidden rounded-xl">
                <img
                  alt={`${instructor.name} - Yoga Instructor`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={instructor.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="mb-1 font-headline-sm text-headline-sm">
                {instructor.name}
              </h3>
              <p className="mb-3 font-label-caps text-label-caps text-primary">
                {instructor.specialty}
              </p>
              <p className="font-body-sm italic text-on-surface-variant">
                &ldquo;{instructor.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
