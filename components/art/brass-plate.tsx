/** Engraved-style brass name plate with corner screws and Bodoni monogram. */
export function BrassPlate({
  initials,
  name,
  role,
  detail,
  size = 'md',
}: {
  initials: string;
  name: string;
  role: string;
  detail: string;
  size?: 'md' | 'lg';
}) {
  const isLarge = size === 'lg';

  return (
    <div className={`brass-plate ${isLarge ? 'p-7 sm:p-9' : 'p-5 sm:p-6'}`}>
      {/* Engraved inner double hairline frame */}
      <div className="pointer-events-none absolute inset-2 border border-current opacity-35" aria-hidden="true" />

      {/* Four slotted brass corner screws */}
      {[
        'top-3 left-3',
        'top-3 right-3',
        'bottom-3 left-3',
        'bottom-3 right-3',
      ].map(pos => (
        <svg
          key={pos}
          viewBox="0 0 12 12"
          className={`pointer-events-none absolute ${pos} h-2.5 w-2.5`}
          aria-hidden="true"
        >
          <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
          <line x1="3" y1="9" x2="9" y2="3" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        </svg>
      ))}

      <div className={`relative flex ${isLarge ? 'flex-col items-center text-center gap-4 py-4' : 'items-center gap-4 sm:gap-5'}`}>
        {/* Engraved monogram seal */}
        <div
          className={`flex shrink-0 items-center justify-center border border-current/70 bg-band font-display tracking-wider text-gold-leaf ${
            isLarge ? 'h-24 w-24 text-4xl sm:h-28 sm:w-28 sm:text-5xl' : 'h-14 w-14 text-2xl'
          }`}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className={`font-display font-medium leading-tight ${isLarge ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
            {name}
          </p>
          <p className="mono-label mt-1 opacity-85">{role}</p>
          <p className="mt-1.5 text-sm leading-snug opacity-80">{detail}</p>
        </div>
      </div>
    </div>
  );
}
