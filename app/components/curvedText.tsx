import { useRef } from "react";

interface CurvedTextProps {
  width: number;
  height: number;
  text: string;
  pClasses?: string;
  reversed?: boolean;
  radius?: number;
  offsetDegrees?: number; // 0 = 3 o'clock, 90 = 6 o'clock, 180 = 9 o'clock, 270 = 12 o'clock
  color?: string;
}

let pathIdCounter = 0;

export function CurvedText({
  width,
  height,
  text,
  pClasses = "tracking-md",
  reversed = false,
  radius,
  offsetDegrees = 0,
  color = "currentColor",
}: CurvedTextProps) {
  const id = useRef(`curved-text-path-${pathIdCounter++}`).current;
  const r = radius ?? (width / 2) - 15;
  const cx = width / 2;
  const cy = height / 2;

  const startAngleRad = (offsetDegrees * Math.PI) / 180;
  const midAngleRad = startAngleRad + Math.PI;

  const startX = cx + r * Math.cos(startAngleRad);
  const startY = cy + r * Math.sin(startAngleRad);
  const midX = cx + r * Math.cos(midAngleRad);
  const midY = cy + r * Math.sin(midAngleRad);

  const sweep = reversed ? 0 : 1;
  const d = `M ${startX},${startY} A ${r},${r} 0 1,${sweep} ${midX},${midY} A ${r},${r} 0 1,${sweep} ${startX},${startY}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path id={id} d={d} fill="none" />
      <text className={pClasses}>
        <textPath href={`#${id}`} startOffset="0%" fill={color}>
          {text}
        </textPath>
      </text>
    </svg>
  );
}