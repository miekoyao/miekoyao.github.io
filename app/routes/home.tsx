import { useEffect, useRef } from "react";

// Split into words (runs of non-space characters) and single spaces
function toWords(text: string): string[] {
  return text.split(/(\s+)/).filter(Boolean);
}

// Within a word, keep the same letter-vs-punctuation grouping as before
function tokenize(word: string): string[] {
  return word.match(/[a-zA-Z0-9]|[^\sa-zA-Z0-9]+/g) ?? [];
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
  const words = toWords(text);

  // Total number of animated pieces (letters/punctuation groups), spaces excluded
  const tokenCount = words.reduce(
    (n, w) => n + (/^\s+$/.test(w) ? 1 : tokenize(w).length),
    0
  );

  useEffect(() => {
    const totalDuration = (tokenCount - 1) * stepMs + bounceMs + pauseMs;
    const animations: Animation[] = [];
    const bounceFraction = bounceMs / totalDuration;

    spanRefs.current.slice(0, tokenCount).forEach((el, i) => {
      if (!el) return;
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
  }, [text, stepMs, bounceMs, pauseMs, tokenCount]);

  let refIndex = 0;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => {
        // Whitespace between words: a normal, breakable space
        if (/^\s+$/.test(word)) {
          const i = refIndex++;
          return (
            <span
              key={wi}
              aria-hidden="true"
              ref={(el) => { spanRefs.current[i] = el; }}
              className="inline-block whitespace-pre"
            >
              {" "}
            </span>
          );
        }

        return (
          <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
            {tokenize(word).map((token, ti) => {
              const i = refIndex++;
              return (
                <span
                  key={ti}
                  ref={(el) => { spanRefs.current[i] = el; }}
                  className="inline-block"
                >
                  {token}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-7xl text-center font-extrabold bg-slate-50 dark:bg-slate-950 max-sm:leading-25">
          <BouncingText text="Hi! I'm Mieko :)" stepMs={250} bounceMs={150} pauseMs={3000} />
        </h1>
        <p className="pt-10 text-lg bg-slate-50 dark:bg-slate-950">
          I'm a software developer who likes translating ideas and complex technical specs into functional products and delightful user experiences that solve real problems.
        </p>
      </div>
    </>
  );
}