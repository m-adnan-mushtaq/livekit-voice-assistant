import SectionContainer from "./shared/SectionContainer";

export default function TrustSection() {
  return (
    <section className="bg-surface-container-high py-stack-xl">
      <SectionContainer className="max-w-4xl">
        <h2 className="font-display-lg mb-6 text-center text-headline-md">
          A Gentle and Safe Start to Yoga
        </h2>
        <p className="mb-10 text-center text-on-surface-variant">
          Your safety is our priority. Before every session, your specific
          health notes and physical limitations are shared securely with your
          certified instructor, allowing them to adjust the practice in real-time
          to suit your body.
        </p>
        <div className="rounded-xl border border-outline-variant bg-background/50 p-6 md:p-8">
          <div className="flex gap-4">
            <span className="material-symbols-outlined shrink-0 text-error">
              info
            </span>
            <div>
              <h5 className="mb-2 font-label-caps text-label-caps text-on-surface">
                Medical Disclaimer
              </h5>
              <p className="font-body-sm italic text-on-surface-variant">
                While our instructors are certified professionals, yoga is a
                physical activity. Please consult with a healthcare provider
                before beginning any new exercise routine. Information shared
                with Alexa is used solely to enhance your session safety and
                quality.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
