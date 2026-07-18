import { Component, useRef } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

/** Renders nothing on any WebGL/render failure — this element is purely decorative. */
class Silent3DBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn("[HeroOrnament3D] disabled after render error:", error.message);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function GoldOrnament() {
  const mesh = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.18;
    mesh.current.rotation.x += delta * 0.05;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.32, 100, 16, 2, 3]} />
      <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.22} />
    </mesh>
  );
}

/**
 * Single lightweight decorative 3D element for the Hero. Lazy-loaded from Hero.tsx
 * and only mounted on desktop viewports when motion isn't reduced — this is the
 * only WebGL surface on the page, kept to one low-poly mesh and capped pixel ratio.
 */
export default function HeroOrnament3D() {
  return (
    <Silent3DBoundary>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 4.5], fov: 40 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1.3} color="#fff5da" />
        <pointLight position={[-3, -2, -2]} intensity={0.5} color="#5D001E" />
        <GoldOrnament />
      </Canvas>
    </Silent3DBoundary>
  );
}
