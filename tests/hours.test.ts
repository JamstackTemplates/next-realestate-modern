import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const melb = (isoUtc: string) => openingLabel(business.hours, 'Australia/Melbourne', new Date(isoUtc));

test('Melbourne weekday open/closed boundaries (09:00 inclusive, 17:30 exclusive)', () => {
  // Tuesday 2026-07-14 in AEST (UTC+10): 09:00 local = 23:00Z prev day; 17:30 local = 07:30Z
  assert.equal(melb('2026-07-13T22:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(melb('2026-07-13T23:00:00Z'), 'Open now · until 17:30');
  assert.equal(melb('2026-07-14T07:29:00Z'), 'Open now · until 17:30');
  assert.equal(melb('2026-07-14T07:30:00Z'), 'Closed · opens Wednesday at 09:00');
});

test('Melbourne Saturday 09:00–16:00 and Sunday closed wrapping to Monday', () => {
  // Saturday 2026-07-18 in AEST (UTC+10): 09:00 = 23:00Z Fri; 16:00 = 06:00Z Sat
  assert.equal(melb('2026-07-17T22:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(melb('2026-07-17T23:00:00Z'), 'Open now · until 16:00');
  assert.equal(melb('2026-07-18T05:59:00Z'), 'Open now · until 16:00');
  assert.equal(melb('2026-07-18T06:00:00Z'), 'Closed · opens Monday at 09:00');
  // Sunday 2026-07-19 midday local (02:00Z)
  assert.equal(melb('2026-07-19T02:00:00Z'), 'Closed · opens Monday at 09:00');
});

test('Melbourne DST transitions on 2026-10-04 (spring forward) and 2027-04-04 (fall back)', () => {
  // Spring forward: Sunday 2026-10-04 02:00 AEST -> 03:00 AEDT (UTC+11)
  // Saturday 2026-10-03 09:00 AEST (UTC+10) = 2026-10-02T23:00:00Z
  assert.equal(melb('2026-10-02T22:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(melb('2026-10-02T23:00:00Z'), 'Open now · until 16:00');
  // Sunday 2026-10-04 10:00 AEDT (UTC+11) = 2026-10-03T23:00:00Z (closed)
  assert.equal(melb('2026-10-03T23:00:00Z'), 'Closed · opens Monday at 09:00');
  // Monday 2026-10-05 09:00 AEDT (UTC+11) = 2026-10-04T22:00:00Z
  assert.equal(melb('2026-10-04T21:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(melb('2026-10-04T22:00:00Z'), 'Open now · until 17:30');
  // Monday 2026-10-05 17:30 AEDT (UTC+11) = 2026-10-05T06:30:00Z
  assert.equal(melb('2026-10-05T06:30:00Z'), 'Closed · opens Tuesday at 09:00');

  // Fall back: Sunday 2027-04-04 03:00 AEDT -> 02:00 AEST (UTC+10)
  // Saturday 2027-04-03 09:00 AEDT (UTC+11) = 2027-04-02T22:00:00Z
  assert.equal(melb('2027-04-02T21:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(melb('2027-04-02T22:00:00Z'), 'Open now · until 16:00');
  // Sunday 2027-04-04 12:00 AEST (UTC+10) = 2027-04-04T02:00:00Z (closed)
  assert.equal(melb('2027-04-04T02:00:00Z'), 'Closed · opens Monday at 09:00');
  // Monday 2027-04-05 09:00 AEST (UTC+10) = 2027-04-04T23:00:00Z
  assert.equal(melb('2027-04-04T22:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(melb('2027-04-04T23:00:00Z'), 'Open now · until 17:30');
});

test('missing/invalid zones stay neutral and invalid/overnight intervals name the weekday', () => {
  assert.equal(openingLabel(business.hours, '', new Date('2026-07-14T00:00:00Z')), 'See opening hours');
  assert.equal(openingLabel(business.hours, 'Mars/Base', new Date('2026-07-14T00:00:00Z')), 'See opening hours');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');

  const hours: OpeningHours[] = [...business.hours];
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});
