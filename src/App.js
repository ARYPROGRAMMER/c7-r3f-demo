import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Rings } from "./CircularRings";
import { Boxes } from "./Box";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { FloatingGrid } from "./Grid";

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.5} />
      <PerspectiveCamera makeDefault fov={60} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
            
          </>
        )}
      </CubeCamera>
     
      <Rings />
     
      <Boxes />

      
      <FloatingGrid />
      <spotLight
        color={[1, 0.45, 0.7]}
        intensity={4.2} // Slightly increased from 1.5
        angle={0.7}
        penumbra={0.7}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.001}
      />

      <spotLight
        color={[0.14, 0.7, 1]}
        intensity={3.2} // Slightly increased from 2
        angle={0.7}
        penumbra={0.7}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.001}
      />

      <Ground />
      
      <EffectComposer>
       
        <Bloom
        blendFunction={BlendFunction.ADD}
        intensity={1.3}
        width={300}
        height={300}
        kernelSize={5}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.025}
        />

        <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0005,0.0012]}
        />

      </EffectComposer>
      
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <ambientLight intensity={0.02} />
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
