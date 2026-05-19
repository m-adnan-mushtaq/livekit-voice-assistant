export default function TrustSection() {
  const features = [
    "Online 30-minute sessions available",
    "Beginner-friendly guidance included",
    "Operating Hours: Mon-Fri 9AM-5PM Support",
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-xl">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-gutter">
        <div className="glass-card p-6 sm:p-8 lg:p-xl rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-xl items-center">
          <div>
            <h2 className="font-headline text-xl sm:text-2xl lg:text-headline-lg mb-4 sm:mb-6">
              From curious visitor to confirmed booking — without forms.
            </h2>
            <ul className="space-y-3 sm:space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">
                    check_circle
                  </span>
                  <span className="text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-xl overflow-hidden h-48 sm:h-64 lg:h-[300px]">
            <img
              className="w-full h-full object-cover"
              alt="Booking interface on tablet"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6FRKvrI782x9GNwoSqYQdYFcfISjUliMP4vZpRsrSf1nELFxf-02KvQDw5VQSyS8I0AoADHZW3sCyFo6K-FwmW3h3oCb75gKyZj0u9COLtAbSuUAQpaCqP83H9sapomsHCJnBU9EHWpI8ejhb94LFSH9XJKhaEHFH5I4v1kYz83IsKwzBbBnHJGhzEMaLx9zfIAGCtI8hcBBsGLqKTZZqR0H6N5jjgxHMO2G9B-oDsCt2fDVPFKhg821OCg8atIbuKKdOPMTmZdzO"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
