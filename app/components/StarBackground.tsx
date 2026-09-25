import { useEffect, useRef, useState } from 'react';
import starUrl from '/assets/star.svg';
import './starBackground.css';

type Star = { id: number; x: number; y: number; size: number; rotation: number; opacity: number };

const STAR_COUNT = 15;

const SIDE_WIDTH = 30; 

function randomSideX(isLeft: boolean) {
  const offset = Math.random() ** 2 * SIDE_WIDTH;
  return isLeft ? offset : 97 - offset;
}

export function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate on the client only
  useEffect(() => {
    setStars(
        Array.from({ length: STAR_COUNT }, (_, id) => ({
            id,
            x: randomSideX(id % 2 === 0),
            y: Math.random() * 100,
            size: 16,
            rotation: Math.random() * 360,
            opacity: 0.5,
        }))
    );
  }, []);

  // Hit-test the cursor against each star
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      for (const el of Array.from(container.children)) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const inside = Math.hypot(e.clientX - cx, e.clientY - cy) <= rect.width / 2;
        if (inside) el.classList.add('spin');
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [stars]);

  return (
    <div ref={containerRef} className="star-field" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            rotate: `${s.rotation}deg`,
          }}
        >
          <img
            src={starUrl}
            alt=""
            draggable={false}
            onAnimationEnd={(e) => e.currentTarget.parentElement?.classList.remove('spin')}
          />
        </div>
      ))}
    </div>
  );
}