'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { CloseIcon, MenuIcon } from './art/icons';
import { KeystoneMark } from './art/keystone-mark';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/listings/', label: 'For sale', markCurrent: 'section' as const },
  { href: '/sold/', label: 'Sold', markCurrent: 'page' as const },
  { href: '/agents/', label: 'Agents', markCurrent: 'page' as const },
  { href: '/appraisal/', label: 'Appraisal', markCurrent: 'page' as const },
  { href: '/contact/', label: 'Contact', markCurrent: 'page' as const },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm">
      <div className="wrap flex min-h-16 items-center justify-between gap-3 md:min-h-20">
        {/* Keystone mark & Bodoni wordmark */}
        <SiteLink
          href="/"
          className="group flex shrink-0 items-center gap-2.5 no-underline hover:no-underline"
        >
          <KeystoneMark className="h-9 w-9 shrink-0 md:h-10 md:w-10" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-medium tracking-tight text-ink sm:text-xl">
              {business.name}
            </span>
            <span className="mono-label mt-0.5 hidden text-[0.65rem] text-muted sm:inline">
              Carlton · Inner North
            </span>
          </span>
        </SiteLink>

        {/* Single semantic Primary navigation landmark */}
        <nav aria-label="Primary" className="flex items-center gap-2 md:gap-4 lg:gap-6">
          <ul className="hidden items-center gap-4 text-[0.94rem] font-medium md:flex lg:gap-6">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <SiteLink
                  href={item.href}
                  markCurrent={item.markCurrent}
                  className="py-1.5 text-ink transition-colors hover:text-gold-text hover:no-underline"
                >
                  {item.label}
                </SiteLink>
              </li>
            ))}
          </ul>

          <SiteLink
            href="/appraisal/"
            className="button button-compact hidden whitespace-nowrap md:inline-flex"
          >
            Request an appraisal
          </SiteLink>

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button
              type="button"
              className="inline-flex min-h-10 min-w-10 items-center justify-center gap-1.5 border border-line bg-bg px-2.5 text-sm font-medium text-ink md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-primary-menu"
              onClick={() => setMenuOpen(open => !open)}
            >
              {menuOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
              <span>{menuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Crisp flat gold-leaf rule beneath header */}
      <div className="gold-leaf-rule" aria-hidden="true" />

      {/* Mobile disclosure panel under 768px */}
      <div
        id="mobile-primary-menu"
        hidden={!menuOpen}
        className="border-b border-line bg-surface md:hidden"
      >
        <div className="wrap py-5">
          <ul className="grid gap-1 border-b border-line pb-4">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <SiteLink
                  href={item.href}
                  markCurrent={item.markCurrent}
                  className="flex min-h-11 items-center justify-between px-1 font-display text-2xl text-ink hover:text-gold-text hover:no-underline"
                >
                  <span>{item.label}</span>
                  <span className="mono-label text-gold-text" aria-hidden="true">→</span>
                </SiteLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <SiteLink href="/appraisal/" className="button w-full">
              Request an appraisal
            </SiteLink>
            <p className="mono-label text-center text-muted">
              {business.phone} · {business.address.street}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
