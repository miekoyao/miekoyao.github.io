import './headerBar.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ModeToggle } from './modeToggle';

// const navItems = ["about", "projects", "experiences", "contact"];

const navItems = ["about", "projects", "contact"];

function useScrollSpy(ids: string[], options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string | null>(null); // no default

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          // if the visible section is "home", clear the active nav item
          setActiveId(visible.target.id === 'home' ? null : visible.target.id);
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0, ...options }
    );

    // observe nav sections AND the home section
    const allIds = ['home', ...ids];
    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
        <a href={"/assets/cv.pdf"} target="_blank">
          resume
        </a>
        <ModeToggle />
      </div>
    </div>
  );
}