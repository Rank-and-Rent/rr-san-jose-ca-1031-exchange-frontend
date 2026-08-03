const phoneNumberHref = "tel:+14085392254";

export default function StickyCTA() {
  return (
    <a
      href={phoneNumberHref}
      aria-label="Call 1031 Exchange San Jose at (408) 539-2254"
      className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-navy text-white shadow-2xl transition hover:bg-navy-light md:hidden"
    >
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M3 5a2 2 0 0 1 2-2h2.7a1 1 0 0 1 .95.68l1.1 3.3a1 1 0 0 1-.48 1.2l-1.5.75a12 12 0 0 0 7.3 7.3l.75-1.5a1 1 0 0 1 1.2-.48l3.3 1.1a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2h-1C9.72 21 3 14.28 3 6V5Z"
        />
      </svg>
    </a>
  );
}
