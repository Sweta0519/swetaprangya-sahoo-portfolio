import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

interface BoxProps {
  color?: string;
  initials: string;
}

function RotatingBox(props: BoxProps) {
  const meshRef = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the box based on mouse position
      const x = (state.mouse.x * viewport.width) / 2;
      const y = (state.mouse.y * viewport.height) / 2;
      meshRef.current.rotation.x = y * 0.1;
      meshRef.current.rotation.y = x * 0.1;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <Text
        font="/Inter-Bold.woff"
        fontSize={0.7}
        color={props.color || 'hotpink'}
        anchorX="center"
        anchorY="middle"
      >
        {props.initials}
      </Text>
    </mesh>
  );
}

export default function Hero3DModel() {
  return (
    <Canvas id="hero-3d-canvas" style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 2] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <RotatingBox color="#3b82f6" initials="SS" /> {/* Using a blue color and initials */}
    </Canvas>
  );
}
