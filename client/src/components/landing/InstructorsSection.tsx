import { useQuery } from "@tanstack/react-query";
import { CACHE_KEYS } from "../../common";
import * as staffService from "../../services/staff.service";
import SectionContainer from "./shared/SectionContainer";
import { ASSETS } from "./shared/constants";

function staffImage(url: string | null | undefined) {
  return url?.trim() || ASSETS.heroImage;
}

export default function InstructorsSection() {
  const { data: staff = [], isLoading } = useQuery({
    queryKey: [CACHE_KEYS.STAFF_PUBLIC],
    queryFn: staffService.fetchPublicStaff,
  });

  return (
    <section id="instructors" className="py-stack-xl">
      <SectionContainer>
        <div className="mb-12">
          <h2 className="font-display-lg text-headline-md">
            Meet Your Instructors
          </h2>
          <p className="mt-2 font-body-md text-on-surface-variant">
            Our certified yoga teachers ready for your 1:1 sessions.
          </p>
        </div>

        {isLoading && (
          <p className="text-on-surface-variant">Loading instructors...</p>
        )}

        {!isLoading && staff.length === 0 && (
          <p className="text-on-surface-variant">
            Instructors will appear here soon.
          </p>
        )}

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {staff.map((instructor) => (
            <div key={instructor.id} className="group">
              <div className="relative mb-6 aspect-square overflow-hidden rounded-xl">
                <img
                  alt={`${instructor.name} - Yoga Instructor`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={staffImage(instructor.avatar_url)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="mb-1 font-headline-sm text-headline-sm">
                {instructor.name}
              </h3>
              {instructor.specialization && (
                <p className="mb-3 font-label-caps text-label-caps text-primary">
                  {instructor.specialization}
                </p>
              )}
              {instructor.bio && (
                <p className="font-body-sm italic text-on-surface-variant">
                  &ldquo;{instructor.bio}&rdquo;
                </p>
              )}
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
