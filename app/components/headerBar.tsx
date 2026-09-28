import './headerBar.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ModeToggle } from './modeToggle';

const navItems = ["about", "projects", "experiences", "contact"];

function useHashScroll() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    let cancelled = false;
    let mutationObserver: MutationObserver | null = null;
    let rafId: number;

    const waitForStableLayout = (el: HTMLElement, onStable: () => void) => {
      let lastTop = el.getBoundingClientRect().top;
      let stableFrames = 0;

      const check = () => {
        if (cancelled) return;
        const currentTop = el.getBoundingClientRect().top;

        if (Math.abs(currentTop - lastTop) < 1) {
          stableFrames++;
        } else {
          stableFrames = 0;
        }
        lastTop = currentTop;

        if (stableFrames >= 5) {
          onStable();
          return;
        }
        rafId = requestAnimationFrame(check);
      };

      rafId = requestAnimationFrame(check);
    };

    const tryFind = () => {
      if (cancelled) return false;
      const el = document.getElementById(hash);
      if (!el) return false;

      waitForStableLayout(el, () => {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
      return true;
    };

    if (!tryFind()) {
      mutationObserver = new MutationObserver(() => {
        if (tryFind()) {
          mutationObserver?.disconnect();
        }
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      cancelled = true;
      mutationObserver?.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);
}

function useScrollSpy(ids: string[], options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let cancelled = false;

    const allIds = ['home', ...ids];

    const trySetup = () => {
      if (cancelled || intersectionObserver) return;

      const elements = allIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0) return; // not mounted yet, keep waiting

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (visible) {
            setActiveId(visible.target.id === 'home' ? null : visible.target.id);
          }
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0, ...options }
      );

      elements.forEach((el) => intersectionObserver!.observe(el));
      mutationObserver?.disconnect(); // no longer need to watch for DOM changes
    };

    trySetup();

    if (!intersectionObserver) {
      mutationObserver = new MutationObserver(() => trySetup());
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      cancelled = true;
      intersectionObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [ids]);

  return activeId;
}

function NavItem({
  id,
  label,
  isActive,
  onNavigate,
}: {
  id: string;
  label: string;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }
    onNavigate?.();
  };

  return (
    <a href={`#${id}`} className={isActive ? 'active' : ''} onClick={handleClick}>
      {label}
    </a>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}

export function HeaderBar() {
  const activeId = useScrollSpy(navItems);
  useHashScroll();

  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Close on Escape or a click outside the header
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  return (
    <div
      ref={headerRef}
      className="header-bar relative flex items-center justify-between gap-10 bg-slate-50 dark:bg-slate-950"
    >
      <Link to="/" className="flex gap-2 name-logo">
        <img src={'/assets/logo.svg'} alt="Logo" />
        Mieko Yao
      </Link>

      <div className="flex items-center gap-4">
        {/* Desktop links: hidden below the grid2 breakpoint */}
        <nav className="links flex gap-10 max-grid2:hidden" aria-label="Primary">
          {navItems.map((item) => (
            <NavItem key={item} id={item} label={item} isActive={activeId === item} />
          ))}
        </nav>

        {/* Single ModeToggle instance, always visible */}
        <ModeToggle />

        {/* Hamburger: only visible below the grid2 breakpoint */}
        <button
          type="button"
          className="hamburger grid2:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="mobile-menu absolute left-0 right-0 top-full flex flex-col gap-6 p-6 grid2:hidden bg-slate-50 dark:bg-slate-950 shadow-md"
        >
          {navItems.map((item) => (
            <NavItem
              key={item}
              id={item}
              label={item}
              isActive={activeId === item}
              onNavigate={() => setMenuOpen(false)}
            />
          ))}
        </nav>
      )}
    </div>
  );
}