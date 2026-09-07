"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, RoundedBox } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import type { Group } from "three";

const islands = [
  { label: "MCP", slug: "mcp", position: [-3.2, 1.1, 0] as [number,number,number], color: "#55e7ff", icon: "🔌" },
  { label: "RAG", slug: "rag", position: [3.1, 1.3, -0.4] as [number,number,number], color: "#ffd66b", icon: "📚" },
  { label: "Agents", slug: "agents", position: [-2.5, -1.5, 0.4] as [number,number,number], color: "#8bffb5", icon: "🤖" },
  { label: "Multi-Agent", slug: "multi-agent", position: [2.5, -1.5, 0.2] as [number,number,number], color: "#c29cff", icon: "👥" }
];

function Robot() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * .6) * .22;
  });
  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={ref} position={[0,0.15,0]}>
        <RoundedBox args={[1.5,1.15,.85]} radius={.22} smoothness={4}>
          <meshStandardMaterial color="#f4f7ff" roughness={.3}/>
        </RoundedBox>
        <mesh position={[-.36,.12,.44]}><sphereGeometry args={[.11,24,24]}/><meshStandardMaterial color="#18263a"/></mesh>
        <mesh position={[.36,.12,.44]}><sphereGeometry args={[.11,24,24]}/><meshStandardMaterial color="#18263a"/></mesh>
        <mesh position={[0,-.22,.45]} rotation={[0,0,Math.PI/2]}><torusGeometry args={[.18,.035,12,30,Math.PI]}/><meshStandardMaterial color="#55e7ff"/></mesh>
        <mesh position={[0,.78,0]}><cylinderGeometry args={[.035,.035,.32,12]}/><meshStandardMaterial color="#c29cff"/></mesh>
        <mesh position={[0,.98,0]}><sphereGeometry args={[.1,20,20]}/><meshStandardMaterial color="#ffd66b" emissive="#ffd66b" emissiveIntensity={1.4}/></mesh>
      </group>
    </Float>
  );
}

function ConceptIsland({label,slug,position,color,icon}:{label:string;slug:string;position:[number,number,number];color:string;icon:string}) {
  const router = useRouter();
  return (
    <Float speed={1.5} floatIntensity={.8} rotationIntensity={.12}>
      <group position={position}>
        <mesh onClick={()=>router.push(`/learn/${slug}`)} scale={[1.15,.3,1.15]}>
          <sphereGeometry args={[1,32,20]}/>
          <meshStandardMaterial color={color} roughness={.55}/>
        </mesh>
        <Html center position={[0,.63,0]} transform distanceFactor={7}>
          <button className="worldLabel" onClick={()=>router.push(`/learn/${slug}`)}><span>{icon}</span>{label}</button>
        </Html>
      </group>
    </Float>
  );
}

export function ConceptWorld() {
  return (
    <div className="worldShell">
      <Canvas camera={{position:[0,0.5,8],fov:43}} dpr={[1,1.6]}>
        <ambientLight intensity={1.8}/>
        <directionalLight position={[4,7,6]} intensity={2.7}/>
        <pointLight position={[-5,2,3]} intensity={20} color="#55e7ff"/>
        <pointLight position={[5,-1,2]} intensity={15} color="#c29cff"/>
        <Robot/>
        {islands.map((item)=><ConceptIsland key={item.slug} {...item}/>)}
        <OrbitControls enablePan={false} minDistance={6} maxDistance={10} autoRotate autoRotateSpeed={.45}/>
      </Canvas>
      <div className="worldHint">Drag to explore · click a floating island</div>
    </div>
  );
}
