export function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8"
    >
      <div className="relative h-px bg-[linear-gradient(90deg,transparent,rgba(124,198,255,0.34),rgba(255,110,60,0.22),transparent)]">
        <div className="absolute inset-x-[18%] -top-3 h-6 bg-[radial-gradient(circle,rgba(54,133,255,0.14),transparent_68%)] blur-md" />
      </div>
    </div>
  );
}
