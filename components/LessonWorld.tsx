"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

function Pulse({ position, color = "#ffffff" }: { position: [number, number, number]; color?: string }) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s = 0.75 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.13, 20, 20]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} />
    </mesh>
  );
}

function CartoonBot({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.18;
  });

  return (
    <Float speed={2} floatIntensity={0.35} rotationIntensity={0.08}>
      <group ref={ref} position={position}>
        <RoundedBox args={[1.25, 0.92, 0.72]} radius={0.2} smoothness={4}>
          <meshStandardMaterial color="#f7fbff" roughness={0.32} />
        </RoundedBox>
        <mesh position={[-0.3, 0.1, 0.38]}>
          <sphereGeometry args={[0.09, 20, 20]} />
          <meshStandardMaterial color="#17263b" />
        </mesh>
        <mesh position={[0.3, 0.1, 0.38]}>
          <sphereGeometry args={[0.09, 20, 20]} />
          <meshStandardMaterial color="#17263b" />
        </mesh>
        <mesh position={[0, -0.19, 0.39]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.15, 0.03, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#55e7ff" />
        </mesh>
      </group>
    </Float>
  );
}

function Label({ text, position, icon }: { text: string; position: [number, number, number]; icon: string }) {
  return (
    <Html center position={position} transform distanceFactor={7}>
      <div className="sceneLabel"><span>{icon}</span>{text}</div>
    </Html>
  );
}

function Cable({ from, to, color }: { from: [number,number,number]; to: [number,number,number]; color: string }) {
  const points = useMemo(() => {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const dz = to[2] - from[2];
    return Array.from({ length: 18 }, (_, i) => {
      const t = i / 17;
      return [
        from[0] + dx * t,
        from[1] + dy * t + Math.sin(t * Math.PI) * 0.16,
        from[2] + dz * t
      ] as [number,number,number];
    });
  }, [from, to]);

  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function MCPScene() {
  const targets = [
    { icon: "🐙", label: "GitHub", pos: [-3.1, 1.35, 0] as [number,number,number], color: "#b7c8ff" },
    { icon: "📁", label: "Drive", pos: [3.05, 1.4, -0.2] as [number,number,number], color: "#7ce6b8" },
    { icon: "🗄️", label: "Database", pos: [3.0, -1.55, 0.1] as [number,number,number], color: "#ffd36b" },
    { icon: "💬", label: "Slack", pos: [-3.05, -1.5, -0.15] as [number,number,number], color: "#d0a7ff" }
  ];

  return (
    <>
      <CartoonBot position={[0, 1.45, 0]} />
      <RoundedBox position={[0, -0.1, 0]} args={[1.55, 0.78, 0.68]} radius={0.18} smoothness={4}>
        <meshStandardMaterial color="#55e7ff" roughness={0.3} emissive="#1b8aa1" emissiveIntensity={0.35} />
      </RoundedBox>
      <Label text="MCP Hub" icon="🔌" position={[0, -0.08, 0.45]} />
      {targets.map((target) => (
        <group key={target.label}>
          <Float speed={1.6} floatIntensity={0.3}>
            <RoundedBox position={target.pos} args={[1.35,0.72,0.62]} radius={0.18} smoothness={4}>
              <meshStandardMaterial color={target.color} roughness={0.42} />
            </RoundedBox>
            <Label text={target.label} icon={target.icon} position={[target.pos[0], target.pos[1], target.pos[2]+0.38]} />
          </Float>
          <Cable from={[0,-0.1,0]} to={target.pos} color={target.color} />
        </group>
      ))}
      <Pulse position={[0,0.58,0]} color="#ffffff" />
    </>
  );
}

function Book({ position, color, rotation = [0,0,0] }: { position:[number,number,number]; color:string; rotation?:[number,number,number] }) {
  return (
    <RoundedBox position={position} rotation={rotation} args={[0.72,0.18,0.5]} radius={0.05} smoothness={3}>
      <meshStandardMaterial color={color} roughness={0.58} />
    </RoundedBox>
  );
}

function RAGScene() {
  const shelves = [-2.8,-2,-1.2,1.2,2,2.8];
  return (
    <>
      <CartoonBot position={[0,-1.5,0]} />
      {shelves.map((x, i) => (
        <group key={x}>
          <mesh position={[x,0,0]}>
            <boxGeometry args={[0.16,3.6,0.55]} />
            <meshStandardMaterial color="#6b4d3b" roughness={0.72} />
          </mesh>
          <Book position={[x + (i % 2 ? 0.24 : -0.24),1.15,0.35]} color={i%2 ? "#ffd36b" : "#55e7ff"} rotation={[0,0,i%2 ? .08 : -.08]} />
          <Book position={[x + (i % 2 ? -0.2 : 0.22),0.25,0.35]} color={i%3 ? "#c29cff" : "#7ce6b8"} rotation={[0,0,i%2 ? -.05 : .06]} />
          <Book position={[x + .05,-.7,0.35]} color={i%2 ? "#ff9ca8" : "#b7c8ff"} />
        </group>
      ))}
      <Float speed={2.2} floatIntensity={0.55}>
        <group position={[0,1.2,0.2]}>
          <RoundedBox args={[1.15,0.72,0.12]} radius={0.08} smoothness={3}>
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </RoundedBox>
          <Label text="Relevant page" icon="📄" position={[0,0,0.12]} />
        </group>
      </Float>
      <Cable from={[-2.3,0.5,0]} to={[0,1.2,0]} color="#ffd36b" />
      <Cable from={[0,1.2,0]} to={[0,-1.05,0]} color="#55e7ff" />
      <Pulse position={[-1.15,0.85,0]} color="#ffd36b" />
      <Label text="Search → retrieve → answer" icon="🔎" position={[0,2.25,0]} />
    </>
  );
}

function GenericScene({ slug }: { slug: string }) {
  const items = slug === "agents"
    ? [["Goal","🎯",-2.5],["Tools","🧰",0],["Result","✅",2.5]]
    : slug === "multi-agent"
      ? [["Planner","🧭",-2.6],["Researcher","🔎",-0.85],["Builder","🛠️",0.9],["Reviewer","✅",2.65]]
      : [["Input","💡",-2.4],["Workflow","⚙️",0],["Output","✨",2.4]];

  return (
    <>
      {items.map(([label,icon,x],i) => (
        <Float key={String(label)} speed={1.5+i*.12} floatIntensity={.45}>
          <RoundedBox position={[Number(x),0,0]} args={[1.4,.82,.68]} radius={.18} smoothness={4}>
            <meshStandardMaterial color={["#55e7ff","#ffd36b","#7ce6b8","#c29cff"][i%4]} roughness={.4}/>
          </RoundedBox>
          <Label text={String(label)} icon={String(icon)} position={[Number(x),0,.42]} />
        </Float>
      ))}
      <CartoonBot position={[0,-1.55,0]}/>
    </>
  );
}

export function LessonWorld({ slug }: { slug: string }) {
  return (
    <div className="lessonWorldShell">
      <Canvas camera={{ position: [0, 0.3, 8.6], fov: 42 }} dpr={[1, 1.6]}>
        <ambientLight intensity={1.7} />
        <directionalLight position={[4,7,6]} intensity={2.4} />
        <pointLight position={[-4,2,3]} intensity={16} color="#55e7ff" />
        <pointLight position={[4,-1,2]} intensity={12} color="#c29cff" />
        {slug === "mcp" ? <MCPScene /> : slug === "rag" ? <RAGScene /> : <GenericScene slug={slug} />}
        <OrbitControls enablePan={false} minDistance={6.7} maxDistance={10} autoRotate autoRotateSpeed={0.22} />
      </Canvas>
      <div className="sceneHint">Drag to rotate · explore the visual story</div>
    </div>
  );
}
