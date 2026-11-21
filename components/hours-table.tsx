import type { OpeningHours } from '../lib/hours';

export function HoursTable({ hours }: { hours: readonly OpeningHours[] }) {
  return (
    <table className="w-full border-collapse text-sm">
      <caption className="sr-only">Carlton office opening hours</caption>
      <tbody>
        {hours.map(entry => (
          <tr key={entry.day} className="border-b border-line last:border-b-0">
            <th scope="row" className="py-2 pr-4 text-left font-medium text-ink">
              {entry.day}
            </th>
            <td className="py-2 text-right font-mono text-xs text-muted">
              {entry.opens && entry.closes ? `${entry.opens} – ${entry.closes}` : 'Closed'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
