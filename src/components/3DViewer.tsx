import { FC, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";

interface Model3DProps {
  modelUrl: string;
}

const Model: FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const Viewer3D: FC<Model3DProps> = ({ modelUrl }) => {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-royal-gold/30">
      <Canvas>
        <PerspectiveCamera position={[2, 2, 2]} makeDefault />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Model url={modelUrl} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Viewer3D;