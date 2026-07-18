import { useId } from "react";

/**
 * Jali — the perforated stone lattice of Rajasthani architecture.
 *
 * This is the site's structural motif rather than a decorative border. It is
 * pure SVG (no images, no JS, no runtime cost) built from an eight-point star
 * grid, the geometry used in Indo-Islamic screens across Jodhpur.
 *
 * Three roles:
 *   variant="screen"  — a faint lattice laid over a surface, like light through
 *                       a carved window. Purely atmospheric.
 *   variant="band"    — a horizontal strip used to separate sections in place
 *                       of a rule or ornament.
 *   variant="aperture"— a mask id you can apply to an image so it is revealed
 *                       *through* the lattice openings.
 */

interface JaliProps {
  variant?: "screen" | "band";
  /** Size of one lattice repeat, in px. Larger reads as architecture, smaller as texture. */
  scale?: number;
  className?: string;
  /** Stroke colour; defaults to currentColor so it inherits from the parent. */
  color?: string;
  opacity?: number;
}

export default function Jali({
  variant = "screen",
  scale = 72,
  className = "",
  color = "currentColor",
  opacity = 0.14,
}: JaliProps) {
  const id = useId().replace(/:/g, "");
  const patternId = `jali-${id}`;

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none ${variant === "band" ? "w-full h-16" : "absolute inset-0 w-full h-full"} ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern id={patternId} width={scale} height={scale} patternUnits="userSpaceOnUse">
          {/* Eight-point star: two overlaid squares, the core jali motif */}
          <g
            fill="none"
            stroke={color}
            strokeWidth={Math.max(0.6, scale * 0.011)}
            strokeLinejoin="round"
          >
            <rect x={scale * 0.22} y={scale * 0.22} width={scale * 0.56} height={scale * 0.56} />
            <rect
              x={scale * 0.22}
              y={scale * 0.22}
              width={scale * 0.56}
              height={scale * 0.56}
              transform={`rotate(45 ${scale / 2} ${scale / 2})`}
            />
            {/* Connecting bars to the neighbouring repeats */}
            <path
              d={`M${scale / 2} 0 V${scale * 0.22} M${scale / 2} ${scale * 0.78} V${scale}
                  M0 ${scale / 2} H${scale * 0.22} M${scale * 0.78} ${scale / 2} H${scale}`}
            />
            {/* Small centre rosette */}
            <circle cx={scale / 2} cy={scale / 2} r={scale * 0.075} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
