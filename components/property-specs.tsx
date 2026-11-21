import { BathIcon, BedIcon, CarIcon, InternalIcon, LandIcon } from './art/icons';

export interface PropertySpecsProps {
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landM2?: number;
  internalM2?: number;
  compact?: boolean;
}

export function PropertySpecs({
  bedrooms,
  bathrooms,
  carSpaces,
  landM2,
  internalM2,
  compact = false,
}: PropertySpecsProps) {
  const area = landM2
    ? { icon: <LandIcon className="h-4 w-4 text-gold-text" />, label: `${landM2} m² land`, short: `${landM2} m²` }
    : internalM2
      ? { icon: <InternalIcon className="h-4 w-4 text-gold-text" />, label: `${internalM2} m² internal`, short: `${internalM2} m² int.` }
      : null;

  return (
    <ul
      className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-xs tracking-wide text-muted ${
        compact ? '' : 'text-[0.8rem]'
      }`}
      aria-label="Property specifications"
    >
      <li className="inline-flex items-center gap-1.5">
        <BedIcon className="h-4 w-4 text-gold-text" />
        <span>
          {bedrooms}
          <span className="sr-only"> {bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
        </span>
      </li>
      <li className="inline-flex items-center gap-1.5">
        <BathIcon className="h-4 w-4 text-gold-text" />
        <span>
          {bathrooms}
          <span className="sr-only"> {bathrooms === 1 ? 'bathroom' : 'bathrooms'}</span>
        </span>
      </li>
      <li className="inline-flex items-center gap-1.5">
        <CarIcon className="h-4 w-4 text-gold-text" />
        <span>
          {carSpaces}
          <span className="sr-only"> {carSpaces === 1 ? 'car space' : 'car spaces'}</span>
        </span>
      </li>
      {area && (
        <li className="inline-flex items-center gap-1.5">
          {area.icon}
          <span>{compact ? area.short : area.label}</span>
        </li>
      )}
    </ul>
  );
}
