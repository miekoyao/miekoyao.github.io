import { useEffect, useRef, useState } from 'react';
import { StarIcon } from '../icons/star';
import './starBackground.css';
import { useStarStats } from './starStatsContext';

type Star = {
  id: number;
  isLeft: boolean;
  x: number;
  y: number;
  size: number;
  rotation: number;
  lightnessFactor: number;
  activated?: boolean;
  exploding?: boolean;
};

type ConstellationLine = {
  id: number;
  fromId: number;
  toId: number;
  lightnessFactor: number; // own random factor, so the line's resolved color isn't tied to either star
  resolved: boolean; // false = still baseline/activated color; true = settled into normal light/dark color
};

const STAR_COUNT = 80;
const SIDE_WIDTH = 30;
const PARTICLE_COUNT = 8;
const BURST_DURATION = 600;
const LINE_DURATION = 500;
const TOP_OFFSET = 86;

const HUE = 270;
const SATURATION = 38.6;
const BASELINE_LIGHTNESS = 77.65;

const DARK_MODE_MIN = 28;
const DARK_MODE_MAX = 55;
const LIGHT_MODE_MIN = 88;
const LIGHT_MODE_MAX = 85;

let nextLineId = 0;

function randomSideX(isLeft: boolean) {
  const offset = Math.random() ** 2 * SIDE_WIDTH;
  return isLeft ? offset : 97 - offset;
}

function makeStar(id: number, isLeft: boolean): Star {
  return {
    id,
    isLeft,
    x: randomSideX(isLeft),
    y: Math.random() * 100,
    size: 16,
    rotation: Math.random() * 360,
    lightnessFactor: Math.random(),
  };
}

function getColorForFactor(factor: number, isDark: boolean): string {
  const [min, max] = isDark ? [DARK_MODE_MIN, DARK_MODE_MAX] : [LIGHT_MODE_MIN, LIGHT_MODE_MAX];
  const lightness = min + factor * (max - min);
  return `hsl(${HUE}, ${SATURATION}%, ${lightness}%)`;
}

function getBaselineColor(): string {
  return `hsl(${HUE}, ${SATURATION}%, ${BASELINE_LIGHTNESS}%)`;
}

function getStarColor(star: Star, isDark: boolean): string {
  if (star.activated) return getBaselineColor();
  return getColorForFactor(star.lightnessFactor, isDark);
}

function getLineColor(line: ConstellationLine, isDark: boolean): string {
  if (!line.resolved) return getBaselineColor();
  return getColorForFactor(line.lightnessFactor, isDark);
}

export function StarBackground() {
  const { markHovered, markClicked, markConnected } = useStarStats();

  const [stars, setStars] = useState<Star[]>([]);
  const [lines, setLines] = useState<ConstellationLine[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [, forceTick] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const selectedIdRef = useRef<number | null>(null);
  const connectingRef = useRef(false);
  const timeoutsRef = useRef<number[]>([]);

  starsRef.current = stars;
  selectedIdRef.current = selectedId;

  useEffect(() => {
    setStars(Array.from({ length: STAR_COUNT }, (_, id) => makeStar(id, id % 2 === 0)));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains('dark'));

    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains('dark'));
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => forceTick((t) => t + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  const runAfter = (ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms);
    timeoutsRef.current.push(id);
  };

  const handleStarClick = (id: number) => {
    if (connectingRef.current) return;

    if (selectedIdRef.current === id) {
      setStars((prev) => prev.map((s) => (s.id === id ? { ...s, activated: false } : s)));
      setSelectedId(null);
      return;
    }

    markClicked(id);

    setStars((prev) => prev.map((s) => (s.id === id ? { ...s, exploding: true, activated: true } : s)));
    runAfter(BURST_DURATION, () => {
      setStars((prev) => prev.map((s) => (s.id === id ? { ...s, exploding: false } : s)));
    });

    if (selectedIdRef.current === null) {
      setSelectedId(id);
      return;
    }

    const fromId = selectedIdRef.current;
    const toId = id;
    connectingRef.current = true;

    runAfter(BURST_DURATION, () => {
      const lineId = nextLineId++;
      setLines((prev) => [
        ...prev,
        { id: lineId, fromId, toId, lightnessFactor: Math.random(), resolved: false },
      ]);
      runAfter(LINE_DURATION, () => {
        setStars((prev) =>
          prev.map((s) => (s.id === fromId || s.id === toId ? { ...s, activated: false } : s))
        );
        setLines((prev) => prev.map((l) => (l.id === lineId ? { ...l, resolved: true } : l)));
        markConnected(fromId);
        markConnected(toId);
        setSelectedId(null);
        connectingRef.current = false;
      });
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hitTest = (clientX: number, clientY: number) => {
      const containerRect = container.getBoundingClientRect();
      const hitIds = new Set<number>();

      for (const s of starsRef.current) {
        const leftPx = (s.x / 100) * containerRect.width;
        const topPx = (s.y / 100) * containerRect.height + TOP_OFFSET;
        const centerX = containerRect.left + leftPx + s.size / 2;
        const centerY = containerRect.top + topPx + s.size / 2;
        const radius = s.size / 2;
        if (Math.hypot(clientX - centerX, clientY - centerY) <= radius) hitIds.add(s.id);
      }
      return hitIds;
    };

    const onMove = (e: MouseEvent) => {
      const hitIds = hitTest(e.clientX, e.clientY);
      for (const el of Array.from(container.children) as HTMLElement[]) {
        const id = Number(el.dataset.id);
        if (Number.isNaN(id)) continue;
        const isHovering = hitIds.has(id);
        if (isHovering && !el.classList.contains('hovering')) markHovered(id);
        el.classList.toggle('hovering', isHovering);
      }
    };

    const onClick = (e: MouseEvent) => {
      const hitIds = hitTest(e.clientX, e.clientY);
      if (hitIds.size === 0) return;
      const [id] = hitIds;
      handleStarClick(id);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  const getStarCenter = (id: number) => {
    const container = containerRef.current;
    const star = stars.find((s) => s.id === id);
    if (!container || !star) return null;
    const rect = container.getBoundingClientRect();
    const leftPx = (star.x / 100) * rect.width;
    const topPx = (star.y / 100) * rect.height + TOP_OFFSET;
    return { x: leftPx + star.size / 2, y: topPx + star.size / 2 };
  };

  return (
    <div ref={containerRef} className="star-field" aria-hidden="true">
      <svg className="constellation-lines">
        {lines.map((line) => {
          const from = getStarCenter(line.fromId);
          const to = getStarCenter(line.toId);
          if (!from || !to) return null;
          return (
            <ConstellationLine
              key={line.id}
              from={from}
              to={to}
              color={getLineColor(line, isDark)}
            />
          );
        })}
      </svg>

      {stars.map((s) => (
        <div
          key={s.id}
          data-id={s.id}
          data-is-left={s.isLeft}
          className={`star${s.activated ? ' activated' : ''}`}
          style={{
            left: `${s.x}%`,
            top: `calc(${s.y}% + ${TOP_OFFSET}px)`,
            width: s.size,
            height: s.size,
            rotate: `${s.rotation}deg`,
            color: getStarColor(s, isDark),
          }}
        >
          <StarIcon />
          {s.exploding &&
            Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
              const angle = (360 / PARTICLE_COUNT) * i + Math.random() * 20;
              const distance = 18 + Math.random() * 12;
              const rad = (angle * Math.PI) / 180;
              const dx = Math.cos(rad) * distance;
              const dy = Math.sin(rad) * distance;
              return (
                <span
                  key={i}
                  className="star-particle"
                  style={{ ['--dx' as any]: `${dx}px`, ['--dy' as any]: `${dy}px` }}
                />
              );
            })}
        </div>
      ))}
    </div>
  );
}

function ConstellationLine({
  from,
  to,
  color,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
}) {
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      className="constellation-line"
      style={{
        stroke: color,
        strokeDasharray: length,
        strokeDashoffset: drawn ? 0 : length,
      }}
    />
  );
}