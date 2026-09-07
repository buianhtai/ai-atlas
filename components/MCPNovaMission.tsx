"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, RoundedBox } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useResponsive3D } from "@/components/useResponsive3D";

type StationId = "github" | "drive" | "database";
type Phase = "briefing" | "choose" | "request" | "result";

type Station = {
  id: StationId;
  name: string;
  subtitle: string;
  color: string;
  x: number;
  shape: "code" | "docs" | "data";
};

const stations: Station[] = [
  { id: "github", name: "GitHub", subtitle: "Code & pull requests", color: "#7b88a8", x: -3.15, shape: "code" },
  { id: "drive", name: "Drive", subtitle: "Documents & knowledge", color: "#7fa58e", x: 0, shape: "docs" },
  { id: "database", name: "Database", subtitle: "Structured data", color: "#b3925c", x: 3.15, shape: "data" },
];

const point = (x: number, y: number, z = 0) => new THREE.Vector3(x, y, z);

function Packet({ from, to, reverse = false }: { from: [number, number, number]; to: [number, number, number]; reverse?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const start = useMemo(() => point(...from), [from]);
  const end = useMemo(() => point(...to), [to]);

  useFrame((state) => {
    if (!ref.current) return;
    const raw = (state.clock.elapsedTime * 0.46) % 1;
    const t = reverse ? 1 - raw : raw;
    ref.current.position.lerpVectors(start, end, t);
    ref.current.position.y += Math.sin(t * Math.PI) * 0.42;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.09, 18, 18]} />
      <meshStandardMaterial color={reverse ? "#8ac7a0" : "#6bb8c6"} emissive={reverse ? "#8ac7a0" : "#6bb8c6"} emissiveIntensity={1.7} />
    </mesh>
  );
}

function Nova({ compact }: { compact: boolean }) {
  const scale = compact ? 0.82 : 1;
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.08;
  });

  return (
    <Float speed={1.45} floatIntensity={0.18} rotationIntensity={0.025}>
      <group ref={group} position={[0, compact ? 1.34 : 1.5, 0]} scale={scale}>
        <RoundedBox args={[1.2, 0.88, 0.72]} radius={0.2} smoothness={4}>
          <meshPhysicalMaterial color="#eee9df" roughness={0.28} metalness={0.03} />
        </RoundedBox>
        <RoundedBox position={[0, 0.02, 0.39]} args={[0.78, 0.44, 0.025]} radius={0.08} smoothness={3}>
          <meshStandardMaterial color="#22333a" />
        </RoundedBox>
        <mesh position={[-0.2, 0.05, 0.42]}><circleGeometry args={[0.055, 18]} /><meshStandardMaterial color="#9dd6d2" emissive="#9dd6d2" emissiveIntensity={0.6} /></mesh>
        <mesh position={[0.2, 0.05, 0.42]}><circleGeometry args={[0.055, 18]} /><meshStandardMaterial color="#9dd6d2" emissive="#9dd6d2" emissiveIntensity={0.6} /></mesh>
        <mesh position={[0, 0.62, 0]}><cylinderGeometry args={[0.02, 0.02, 0.22, 10]} /><meshStandardMaterial color="#8d8a83" /></mesh>
        <mesh position={[0, 0.77, 0]}><sphereGeometry args={[0.06, 16, 16]} /><meshStandardMaterial color="#d27b63" emissive="#d27b63" emissiveIntensity={0.8} /></mesh>
        <Html center position={[0, -0.68, 0]} transform distanceFactor={7}>
          <div className="mcpObjectLabel"><strong>Nova</strong><span>AI application</span></div>
        </Html>
      </group>
    </Float>
  );
}

function Platform({ position, width = 1.7 }: { position: [number, number, number]; width?: number }) {
  return (
    <group position={position}>
      <RoundedBox args={[width, 0.18, 1.12]} radius={0.08} smoothness={3}>
        <meshStandardMaterial color="#d9d1c5" roughness={0.72} />
      </RoundedBox>
      <mesh position={[0, -0.13, 0]}><boxGeometry args={[width * 0.84, 0.08, 0.92]} /><meshStandardMaterial color="#bdb4a7" roughness={0.8} /></mesh>
    </group>
  );
}

function StationSymbol({ shape, color }: { shape: Station["shape"]; color: string }) {
  if (shape === "code") {
    return (
      <group>
        <RoundedBox args={[0.72, 0.5, 0.08]} radius={0.06} smoothness={3}><meshStandardMaterial color="#f5f1e9" /></RoundedBox>
        <mesh position={[-0.18, 0, 0.05]} rotation={[0, 0, 0.7]}><boxGeometry args={[0.26, 0.035, 0.03]} /><meshStandardMaterial color={color} /></mesh>
        <mesh position={[0.18, 0, 0.05]} rotation={[0, 0, -0.7]}><boxGeometry args={[0.26, 0.035, 0.03]} /><meshStandardMaterial color={color} /></mesh>
      </group>
    );
  }
  if (shape === "docs") {
    return (
      <group>
        {[0, 0.12, 0.24].map((y, i) => (
          <RoundedBox key={i} position={[0, y - 0.12, i * 0.03]} rotation={[0, 0, i === 1 ? 0.08 : i === 2 ? -0.06 : 0]} args={[0.62, 0.38, 0.055]} radius={0.04} smoothness={3}>
            <meshStandardMaterial color={i === 2 ? color : "#f5f1e9"} />
          </RoundedBox>
        ))}
      </group>
    );
  }
  return (
    <group>
      {[-0.16, 0, 0.16].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}><cylinderGeometry args={[0.34, 0.34, 0.14, 28]} /><meshStandardMaterial color={i === 1 ? color : "#e7e0d6"} /></mesh>
      ))}
    </group>
  );
}

function StationCard({ station, selected, compact, onSelect }: { station: Station; selected: boolean; compact: boolean; onSelect: () => void }) {
  const x = compact ? (station.id === "github" ? -2.1 : station.id === "database" ? 2.1 : 0) : station.x;
  const y = compact ? -1.18 : -1.34;
  const scale = compact ? 0.8 : 1;

  return (
    <group position={[x, y, 0]} scale={scale} onClick={onSelect}>
      <Platform position={[0, -0.38, 0]} width={1.75} />
      <group position={[0, 0.1, 0.1]}>
        <StationSymbol shape={station.shape} color={station.color} />
      </group>
      <mesh position={[0, -0.29, 0.56]}><boxGeometry args={[1.08, 0.04, 0.035]} /><meshStandardMaterial color={selected ? "#d36f5d" : "#afa79c"} /></mesh>
      <Html center position={[0, 0.78, 0]} transform distanceFactor={7}>
        <button className={`mcpStationLabel ${selected ? "active" : ""}`} onClick={onSelect}>
          <strong>{station.name}</strong><span>{station.subtitle}</span>
        </button>
      </Html>
    </group>
  );
}

function Hub({ active, compact }: { active: boolean; compact: boolean }) {
  return (
    <group position={[0, compact ? -0.02 : 0, 0]} scale={compact ? 0.84 : 1}>
      <Platform position={[0, -0.34, 0]} width={1.55} />
      <mesh position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.48, 0.62, 0.5, 32]} /><meshPhysicalMaterial color="#4c5553" roughness={0.32} metalness={0.12} /></mesh>
      <mesh position={[0, 0.31, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.38, 0.035, 12, 40]} /><meshStandardMaterial color={active ? "#d36f5d" : "#9d9489"} emissive={active ? "#d36f5d" : "#000000"} emissiveIntensity={active ? 0.6 : 0} /></mesh>
      <Html center position={[0, 0.86, 0]} transform distanceFactor={7}>
        <div className="mcpHubLabel"><span>Standard connection</span><strong>MCP</strong></div>
      </Html>
    </group>
  );
}

function ConnectionLine({ toX, active }: { toX: number; active: boolean }) {
  const segments = 24;
  return (
    <group>
      {Array.from({ length: segments }, (_, i) => {
        const t = i / (segments - 1);
        const x = toX * t;
        const y = -0.08 + (-0.92 + 0.08) * t + Math.sin(t * Math.PI) * 0.16;
        return (
          <mesh key={i} position={[x, y, -0.12]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshStandardMaterial color={active ? "#d36f5d" : "#b6aea4"} />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene({ selected, phase, onSelect, compact }: { selected: StationId | null; phase: Phase; onSelect: (id: StationId) => void; compact: boolean }) {
  const station = stations.find((item) => item.id === selected);
  const selectedX = station ? (compact ? (station.id === "github" ? -2.1 : station.id === "database" ? 2.1 : 0) : station.x) : 0;
  const target = station ? [selectedX, compact ? -0.88 : -1.0, 0] as [number, number, number] : null;

  return (
    <>
      <color attach="background" args={["#efe8dc"]} />
      <fog attach="fog" args={["#efe8dc", 8.5, 14]} />
      <ambientLight intensity={2.0} />
      <directionalLight position={[4, 7, 5]} intensity={2.4} color="#fff7eb" />
      <directionalLight position={[-4, 2, 3]} intensity={0.8} color="#cfd8d2" />

      <Nova compact={compact} />
      <Hub active={!!selected} compact={compact} />
      {stations.map((item) => {
        const x = compact ? (item.id === "github" ? -2.1 : item.id === "database" ? 2.1 : 0) : item.x;
        return (
          <group key={item.id}>
            <ConnectionLine toX={x} active={item.id === selected} />
            <StationCard station={item} selected={item.id === selected} compact={compact} onSelect={() => onSelect(item.id)} />
          </group>
        );
      })}

      {target && (phase === "request" || phase === "result") && <Packet from={[0, 0.12, 0]} to={target} />}
      {target && phase === "result" && <Packet from={[0, 0.12, 0]} to={target} reverse />}

      <mesh position={[0, -1.88, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5.25, 64]} />
        <meshStandardMaterial color="#e4dccf" roughness={0.96} />
      </mesh>
    </>
  );
}

export function MCPNovaMission() {
  const [phase, setPhase] = useState<Phase>("briefing");
  const [selected, setSelected] = useState<StationId | null>(null);
  const station = useMemo(() => stations.find((item) => item.id === selected), [selected]);
  const { compact, tablet, dpr } = useResponsive3D();

  function choose(id: StationId) {
    setSelected(id);
    setPhase("choose");
  }

  function run() {
    if (!selected) return;
    setPhase("request");
    window.setTimeout(() => setPhase("result"), 1700);
  }

  const cameraZ = compact ? 8.8 : tablet ? 9.0 : 8.45;

  return (
    <section className="mcpExperience">
      <header className="mcpExperienceHeader">
        <div><span>Interactive lesson</span><strong>Connect Nova to the world</strong></div>
        <div className="mcpMissionProgress"><b className="active">01</b><i /><b className={phase !== "briefing" ? "active" : ""}>02</b><i /><b className={phase === "result" ? "active" : ""}>03</b></div>
      </header>

      <div className="mcpDiorama">
        <Canvas camera={{ position: [0, 0.26, cameraZ], fov: compact ? 49 : 42 }} dpr={dpr}>
          <Scene compact={compact} selected={selected} phase={phase} onSelect={choose} />
        </Canvas>
        <div className="mcpDioramaNote">{compact ? "Tap a station" : "Choose a station to begin"}</div>
      </div>

      <div className="mcpNarrative">
        <div className="mcpNarrativeCopy">
          <span>{phase === "result" ? "Aha moment" : "Mission"}</span>
          <h2>{phase === "briefing" ? "Nova can reason, but it cannot reach your systems by itself." : phase === "choose" ? `Nova needs ${station?.name}.` : phase === "request" ? "The request moves through one standard connection." : "The result comes back through the same path."}</h2>
          <p>{phase === "briefing" ? "Pick one external system. We’ll connect it without teaching Nova a completely different integration model for every tool." : phase === "choose" ? `MCP gives the AI application a consistent way to discover and use ${station?.name}, instead of inventing a custom connection pattern.` : phase === "request" ? "The AI application asks through its MCP client. The MCP server exposes the external capability in a standard form." : "Nova receives the tool result as context it can reason over. The external system stayed external; MCP standardized the connection."}</p>
        </div>
        <div className="mcpNarrativeAction">
          {phase === "briefing" && <span>{compact ? "Tap GitHub, Drive, or Database above." : "Select GitHub, Drive, or Database in the diorama."}</span>}
          {phase === "choose" && <button onClick={run}>Send request</button>}
          {phase === "request" && <span className="mcpWorking"><i /> Contacting {station?.name}…</span>}
          {phase === "result" && <button onClick={() => { setSelected(null); setPhase("briefing"); }}>Try another</button>}
        </div>
      </div>

      <div className="mcpReveal">
        <div className="mcpRevealIntro">
          <span>From metaphor to architecture</span>
          <h3>What you just built is a real MCP relationship.</h3>
          <p>The illustrated station hides the protocol names at first. Now reveal the engineering model.</p>
        </div>
        <div className="mcpRevealFlow">
          <div><small>AI application</small><strong>Nova</strong><em>Hosts the experience</em></div>
          <i>→</i>
          <div><small>Inside the host</small><strong>MCP Client</strong><em>Maintains the connection</em></div>
          <i>→</i>
          <div className="focus"><small>External integration</small><strong>MCP Server</strong><em>Exposes tools & resources</em></div>
          <i>→</i>
          <div><small>Underlying system</small><strong>{station?.name ?? "Tool / Resource"}</strong><em>GitHub, Drive, DB…</em></div>
        </div>
      </div>
    </section>
  );
}
