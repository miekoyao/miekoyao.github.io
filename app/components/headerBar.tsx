import './headerBar.css';
import { useEffect, useState } from 'react';
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

function NavItem({ id, label, isActive }: { id: string; label: string; isActive: boolean }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // keep the URL in sync without triggering a router navigation or scroll jump
      history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <a href={`#${id}`} className={isActive ? 'active' : ''} onClick={handleClick}>
      {label}
    </a>
  );
}

export function HeaderBar() {
  const activeId = useScrollSpy(navItems);
  useHashScroll();

  return (
    <div className="header-bar flex gap-10 bg-slate-50 dark:bg-slate-950">
      <Link to="/" className="flex gap-2 name-logo">
        <img src={'/assets/logo.svg'} alt="Logo" />
        Mieko Yao
      </Link>
      <div className="links flex gap-10">
        {navItems.map((item) => (
          <NavItem key={item} id={item} label={item} isActive={activeId === item} />
        ))}
        <ModeToggle />
      </div>
    </div>
  );
}