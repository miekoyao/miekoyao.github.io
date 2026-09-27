import { useEffect, useRef } from "react";

function tokenize(text: string): string[] {
  return text.match(/[a-zA-Z0-9]|[^\sa-zA-Z0-9]+|\s/g) ?? [];
}

function BouncingText({
  text,
  className,
  stepMs = 20,
  bounceMs = 20,
  pauseMs = 5000,
}: {
  text: string;
  className?: string;
  stepMs?: number;
  bounceMs?: number;
  pauseMs?: number;
}) {
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tokens = tokenize(text);

  useEffect(() => {
    const totalDuration = (tokens.length - 1) * stepMs + bounceMs + pauseMs;
    const animations: Animation[] = [];

    tokens.forEach((_, i) => {
      const el = spanRefs.current[i];
      if (!el) return;

      const bounceFraction = bounceMs / totalDuration;
      const anim = el.animate(
        [
          { transform: "translateY(0)", offset: 0 },
          { transform: "translateY(-0.6em)", offset: bounceFraction / 2 },
          { transform: "translateY(0)", offset: bounceFraction },
          { transform: "translateY(0)", offset: 1 },
        ],
        {
          duration: totalDuration,
          delay: i * stepMs,
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
      animations.push(anim);
    });

    return () => animations.forEach((a) => a.cancel());
  }, [text, stepMs, bounceMs, pauseMs]);

  return (
    <span className={className} aria-label={text}>
      {tokens.map((token, i) => (
        <span
          key={i}
          aria-hidden="true"
          ref={(el) => { spanRefs.current[i] = el; }}
          className="inline-block"
        >
          {token === " " ? "\u00A0" : token}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-7xl text-center font-extrabold bg-slate-50 dark:bg-slate-950">
          <BouncingText text="Hi! I'm Mieko :)" stepMs={125} bounceMs={175} pauseMs={3000} />
        </h1>
        <p className="pt-10 text-lg bg-slate-50 dark:bg-slate-950">
          I'm a software developer who likes translating ideas and complex technical specs into functional products and delightful user experiences that solve real problems.
        </p>
      </div>
    </>
  );
}