import { ContactFormWrapper } from "./contact-form";

export const metadata = {
  title: "Free 1031 Exchange Guidance in San Jose",
  description: "Call or submit the short form for free San Jose 1031 exchange guidance, replacement-property information, and help understanding direct and passive options.",
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/contact",
  },
};

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";

export default function ContactPage() {
  return (
    <main className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
        <div className="mb-14 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.25em] text-white/45">Call or use the short form</span>
            <h1 className="max-w-4xl text-5xl font-light leading-tight text-white md:text-7xl">
              Free 1031 Exchange Guidance in San Jose
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-light leading-8 text-white/[0.68]">
              Tell us what you are selling, where you are in the process, and what you want from the replacement property. The first conversation is free and focused on the transaction in front of you.
            </p>
          </div>
          <a
            href={phoneNumberHref}
            className="inline-flex min-h-14 items-center justify-center bg-white px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition hover:bg-gray-100"
          >
            Call {phoneNumberDisplay}
          </a>
        </div>
        <ContactFormWrapper />
      </div>
    </main>
  );
}
