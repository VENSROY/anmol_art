const GRAIN_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch' />
      <feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0' />
    </filter>
    <rect width='100%' height='100%' filter='url(#n)' />
  </svg>`
)}`;

/** Single fixed, extremely subtle animated film-grain layer. Mount once at the app root. */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[65] pointer-events-none overflow-hidden opacity-[0.035] mix-blend-overlay"
    >
      <div
        className="absolute -inset-1/2 w-[200%] h-[200%] animate-grain"
        style={{ backgroundImage: `url("${GRAIN_SVG}")`, backgroundRepeat: "repeat", backgroundSize: "180px 180px" }}
      />
    </div>
  );
}
