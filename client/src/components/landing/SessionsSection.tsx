const sessionPoints = [
  {
    title: "Online Live Guidance",
    description:
      "Join from anywhere with high-quality video and clear audio.",
  },
  {
    title: "Time-Efficient 30 Mins",
    description: "Perfectly timed sessions that fit into your busy schedule.",
  },
  {
    title: "Beginner-Friendly Pace",
    description: "No complex poses or advanced requirements. Just ease.",
  },
  {
    title: "Supportive Community",
    description:
      "Connect with others on a similar journey of mindful living.",
  },
];

export default function SessionsSection() {
  return (
    <section
      id="sessions"
      className="py-stack-xl bg-surface-container-highest/30"
    >
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-stack-md">
            <div className="inline-block px-4 py-1.5 bg-primary-container/20 rounded-full text-primary font-label-md tracking-wider uppercase mb-4">
              The Experience
            </div>
            <h2 className="font-headline-md text-on-surface">
              What to expect in your flow.
            </h2>
            <ul className="space-y-6 pt-6">
              {sessionPoints.map((point) => (
                <li key={point.title} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">
                    check_circle
                  </span>
                  <div>
                    <h4 className="font-label-md text-on-surface font-bold">
                      {point.title}
                    </h4>
                    <p className="font-body-md text-on-surface-variant">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary text-on-primary p-12 rounded-[40px] soft-ambient-shadow relative overflow-hidden flex flex-col justify-between min-h-[450px]">
            <div className="relative z-10">
              <h3 className="font-display-lg-mobile italic mb-6">
                Ready to begin?
              </h3>
              <p className="font-body-lg text-primary-fixed mb-10 leading-relaxed">
                Experience your first session in a safe, nurturing environment. No
                special equipment needed, just a small space and a willingness to
                breathe.
              </p>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("home")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-primary px-10 py-4 rounded-full font-label-md hover:shadow-xl transition-all w-full sm:w-auto"
              >
                View Class Schedule
              </button>
            </div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
