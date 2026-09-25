import { useEffect, useState } from 'react';
import Sun from '../icons/sun.svg?react';
import Moon from '../icons/moon.svg?react';


export function ModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label="Dark mode"
      className="theme-toggle"
    >
      <div className="hidden dark:block">
        <Sun className="hidden dark:block" />
      </div>
      <div className="block dark:hidden">
        <Moon className="block dark:hidden" />
      </div>
    </button>
  );
}