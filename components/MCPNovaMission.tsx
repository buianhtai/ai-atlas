"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useResponsive3D } from "@/components/useResponsive3D";

type StationId = "github" | "drive" | "database";
type Phase = "briefing" | "choose" | "request" | "result";

const stations = [
  { id: "github" as const, name: "GitHub", subtitle: "Code & pull requests", x: -3.1, color: "#b8c8d8" },
  { id: "drive" as const, name: "Drive", subtitle: "Documents & knowledge", x: 0, color: "#a9c9ba" },
  { id: "database" as const, name: "Database", subtitle: "Structured data", x: 3.1, color: "#e1bf74" },
];

function CameraDirector({
  phase,
  selected,
  compact,
  tablet,
  reducedMotion,
}: {
  phase: Phase;
  selected: StationId | null;
  compact: boolean;
  tablet: boolean;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);
  const currentLook = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const selectedStation = stations.find((item) => item.id === selected);
    const selectedX = selectedStation
      ? compact
        ? selectedStation.id === "github"
          ? -2.25
          : selectedStation.id === "database"
            ? 2.25
            : 0
        : selectedStation.x
      : 0;

    if (phase === "briefing") {
      desired.set(0, compact ? 1.15 : 1.35, compact ? 7.1 : tablet ? 7.5 : 7.2);
      target.set(0, compact ? 0.7 : 0.85, 0);
    } else if (phase === "choose") {
      desired.set(selectedX * 0.42, compact ? 0.35 : 0.45, compact ? 7.7 : 7.35);
      target.set(selectedX * 0.5, -0.3, 0);
    } else if (phase === "request") {
      desired.set(selectedX * 0.18, 0.1, compact ? 8.15 : 7.8);
      target.set(selectedX * 0.3, -0.35, 0);
    } else {
      desired.set(0, compact ? 0.25 : 0.3, compact ? 8.7 : 8.2);
      target.set(0, 0, 0);
    }

    if (reducedMotion) {
      camera.position.copy(desired);
      camera.lookAt(target);
      return;
    }

    camera.position.lerp(desired, 0.045);
    currentLook.set(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position).lerp(target, 0.06);
    camera.lookAt(currentLook);
  });

  return null;
}

function Packet({
  from,
  to,
  reverse = false,
  reducedMotion,
}: {
  from: [number, number, number];
  to: [number, number, number];
  reverse?: boolean;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const start = useMemo(() => new THREE.Vector3(...from), [from]);
  const end = useMemo(() => new THREE.Vector3(...to), [to]);

  useFrame((state) => {
    if (!ref.current) return;
    const animated = (state.clock.elapsedTime * 0.42) % 1;
    const p = reducedMotion ? (reverse ? 0.7 : 0.42) : reverse ? 1 - animated : animated;
    ref.current.position.lerpVectors(start, end, p);
    ref.current.position.y += Math.sin(p * Math.PI) * 0.48;
  });

  const color = reverse ? "#6d9f98" : "#de5a4e";
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.105, 20, 20]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.65} />
    </mesh>
  );
}

function Rail({ from, to, active }: { from: [number, number, number]; to: [number, number, number]; active: boolean }) {
  const curve = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const mid = a.clone().lerp(b, 0.5);
    mid.y += 0.16;
    return new THREE.CatmullRomCurve3([a, mid, b]);
  }, [from, to]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 32, 0.026, 8, false]} />
      <meshStandardMaterial color={active ? "#de5a4e" : "#b9afa5"} roughness={0.72} />
    </mesh>
  );
}

function Nova({ compact, reducedMotion }: { compact: boolean; reducedMotion: boolean }) {
  const scale = compact ? 0.88 : 1;
  return (
    <Float speed={reducedMotion ? 0 : 1.45} floatIntensity={reducedMotion ? 0 : 0.18} rotationIntensity={reducedMotion ? 0 : 0.035}>
      <group position={[0, compact ? 1.28 : 1.45, 0]} scale={scale}>
        <RoundedBox args={[1.35, 1, 0.8]} radius={0.24} smoothness={4}><meshPhysicalMaterial color="#fffaf2" roughness={0.58} metalness={0} /></RoundedBox>
        {[-0.31, 0.31].map((x) => <mesh key={x} position={[x, 0.12, 0.42]}><sphereGeometry args={[0.095, 20, 20]} /><meshStandardMaterial color="#4b4540" /></mesh>)}
        <mesh position={[0, -0.22, 0.43]} rotation={[0, 0, Math.PI / 2]}><torusGeometry args={[0.16, 0.03, 12, 28, Math.PI]} /><meshStandardMaterial color="#de5a4e" /></mesh>
        <mesh position={[0, 0.72, 0]}><cylinderGeometry args={[0.025, 0.025, 0.25, 12]} /><meshStandardMaterial color="#6f665f" /></mesh>
        <mesh position={[0, 0.88, 0]}><sphereGeometry args={[0.075, 18, 18]} /><meshStandardMaterial color="#d5aa52" /></mesh>
        <mesh position={[0, -0.58, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.58, 36]} /><meshBasicMaterial color="#b9afa5" transparent opacity={0.16} /></mesh>
      </group>
    </Float>
  );
}

function Station({ station, selected, onSelect, compact }: { station: (typeof stations)[number]; selected: boolean; onSelect: () => void; compact: boolean }) {
  const compactX = station.id === "github" ? -2.25 : station.id === "database" ? 2.25 : 0;
  const x = compact ? compactX : station.x;
  const scale = compact ? 0.84 : 1;

  return (
    <group position={[x, compact ? -1.22 : -1.35, 0]} scale={scale} onClick={onSelect}>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[1.02, 40]} /><meshStandardMaterial color={selected ? "#ead1ca" : "#ddd3c8"} roughness={0.92} /></mesh>
      <RoundedBox args={[1.78, 0.96, 0.9]} radius={0.18} smoothness={4} position={[0, -0.03, -0.035]}><meshStandardMaterial color="#4b4540" roughness={0.88} /></RoundedBox>
      <RoundedBox args={[1.66, 0.84, 0.82]} radius={0.16} smoothness={4}><meshPhysicalMaterial color={station.color} roughness={0.72} metalness={0} /></RoundedBox>
      <mesh position={[0, 0.44, 0.05]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.24, 0.025, 10, 36]} /><meshStandardMaterial color={selected ? "#de5a4e" : "#8e867e"} /></mesh>
      <Html center position={[0, 0.03, 0.47]} transform distanceFactor={7}>
        <button
          type="button"
          className={`novaStation ${selected ? "active" : ""}`}
          onClick={onSelect}
          aria-pressed={selected}
          aria-label={`Select ${station.name}: ${station.subtitle}`}
        >
          <strong>{station.name}</strong><span>{station.subtitle}</span>
        </button>
      </Html>
    </group>
  );
}

function Hub({ selected, compact }: { selected: boolean; compact: boolean }) {
  return (
    <group position={[0, compact ? -0.02 : 0, 0]} scale={compact ? 0.9 : 1}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.72, 0.88, 0.38, 40]} /><meshPhysicalMaterial color="#d8cbbd" roughness={0.82} metalness={0} /></mesh>
      <mesh position={[0, 0.22, 0]}><torusGeometry args={[0.5, 0.06, 16, 48]} /><meshStandardMaterial color={selected ? "#de5a4e" : "#8f857c"} /></mesh>
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.37, 40]} /><meshStandardMaterial color="#fffaf2" roughness={0.85} /></mesh>
      <Html center position={[0, 0.57, 0]} transform distanceFactor={7}><div className="novaHubLabel"><small>COMMON CONNECTION</small><strong>MCP</strong></div></Html>
    </group>
  );
}

function Scene({
  selected,
  phase,
  onSelect,
  compact,
  reducedMotion,
}: {
  selected: StationId | null;
  phase: Phase;
  onSelect: (id: StationId) => void;
  compact: boolean;
  reducedMotion: boolean;
}) {
  const station = stations.find((item) => item.id === selected);
  const stationX = (id: StationId) => compact ? (id === "github" ? -2.25 : id === "database" ? 2.25 : 0) : (stations.find((item) => item.id === id)?.x ?? 0);
  const selectedX = station ? stationX(station.id) : 0;
  const target = station ? [selectedX, compact ? -0.86 : -0.95, 0] as [number, number, number] : null;
  const hubPoint: [number, number, number] = [0, 0.12, 0];

  return (
    <>
      <fog attach="fog" args={["#efe7dc", 9, 15]} />
      <ambientLight intensity={2.2} />
      <directionalLight position={[4, 7, 5]} intensity={2.4} color="#fff7e8" />
      <pointLight position={[-4, 3, 3]} intensity={4.5} color="#efc986" />
      <Nova compact={compact} reducedMotion={reducedMotion} />
      <Hub selected={!!selected} compact={compact} />
      {stations.map((item) => {
        const x = stationX(item.id);
        const endpoint: [number, number, number] = [x, compact ? -0.86 : -0.95, 0];
        return <Rail key={`rail-${item.id}`} from={hubPoint} to={endpoint} active={item.id === selected} />;
      })}
      {stations.map((item) => <Station key={item.id} station={item} compact={compact} selected={item.id === selected} onSelect={() => onSelect(item.id)} />)}
      {target && (phase === "request" || phase === "result") && <Packet from={hubPoint} to={target} reducedMotion={reducedMotion} />}
      {target && phase === "result" && <Packet from={hubPoint} to={target} reverse reducedMotion={reducedMotion} />}
      <mesh position={[0, -1.83, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[5.35, 64]} /><meshStandardMaterial color="#e5d9cc" roughness={1} /></mesh>
      <mesh position={[0, -1.81, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[3.8, 3.86, 64]} /><meshBasicMaterial color="#c9bdb1" transparent opacity={0.6} /></mesh>
    </>
  );
}

export function MCPNovaMission() {
  const [phase, setPhase] = useState<Phase>("briefing");
  const [selected, setSelected] = useState<StationId | null>(null);
  const station = useMemo(() => stations.find((item) => item.id === selected), [selected]);
  const { compact, tablet, reducedMotion, dpr } = useResponsive3D();

  function choose(id: StationId) {
    setSelected(id);
    setPhase("choose");
  }

  function run() {
    if (!selected) return;
    setPhase("request");
  }

  useEffect(() => {
    if (phase !== "request") return;
    const timer = window.setTimeout(() => setPhase("result"), reducedMotion ? 450 : 1700);
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  const cameraZ = compact ? 8.9 : tablet ? 9.1 : 8.7;
  const announcement = phase === "briefing"
    ? "Choose GitHub, Drive, or Database."
    : phase === "choose"
      ? `${station?.name} selected.`
      : phase === "request"
        ? `Contacting ${station?.name}.`
        : `Result returned from ${station?.name}. Mission complete.`;

  return (
    <section className="novaMission">
      <div className="srOnly" aria-live="polite">{announcement}</div>
      <p className="srOnly" id="mcp-scene-description">Interactive MCP metaphor. Select an external system, then send a request to see the connection flow before the real architecture is revealed below.</p>

      <div className="novaTopbar"><span className="novaStatus"><i /> VISUAL METAPHOR · NOVA TRAINING</span><span>MISSION 01 · MCP</span></div>
      <div className="novaScene" role="group" aria-describedby="mcp-scene-description">
        <Canvas
          camera={{ position: [0, 0.25, cameraZ], fov: compact ? 48 : 42 }}
          dpr={dpr}
          frameloop={reducedMotion ? "demand" : "always"}
          gl={{ antialias: !compact, powerPreference: "high-performance" }}
        >
          <CameraDirector phase={phase} selected={selected} compact={compact} tablet={tablet} reducedMotion={reducedMotion} />
          <Scene compact={compact} selected={selected} phase={phase} onSelect={choose} reducedMotion={reducedMotion} />
        </Canvas>
      </div>

      <div className="novaPanel">
        <div>
          <span className="novaStep">{phase === "result" ? "MISSION COMPLETE" : "YOUR MISSION"}</span>
          <h2>{phase === "briefing" ? "Nova needs information from the outside world." : phase === "choose" ? `Connect Nova to ${station?.name}.` : phase === "request" ? "Watch the request travel through the common connection…" : "Nova received the result."}</h2>
          <p>{phase === "briefing" ? "Choose a system below. The connection station is a metaphor; the real MCP architecture is revealed after the mission." : phase === "choose" ? `Instead of inventing a one-off ${station?.name} integration shape, the AI application can use MCP to communicate through a standard protocol.` : phase === "request" ? "The application sends a structured request through its MCP connection toward the capability it needs." : "The result travels back and becomes context the AI application can use."}</p>
        </div>
        <div className="novaActions">
          {phase === "briefing" && <span className="novaInstruction">{compact ? "Tap GitHub, Drive, or Database in the scene" : "Select GitHub, Drive, or Database in the scene"}</span>}
          {phase === "choose" && <button type="button" className="novaPrimary" onClick={run}>Send request →</button>}
          {phase === "request" && <span className="novaLoading"><i /> Contacting {station?.name}…</span>}
          {phase === "result" && <button type="button" className="novaPrimary" onClick={() => { setSelected(null); setPhase("briefing"); }}>Try another system ↻</button>}
        </div>
      </div>

      <div className="novaReveal"><span>Metaphor → architecture</span><strong>The station is only the mental picture. In a real system, an MCP client connects to an MCP server that exposes capabilities.</strong></div>
      <div className="novaArchitecture">
        <div className="novaArchitectureHead">
          <span>Architecture reveal</span>
          <strong>Now replace the cartoon station with the actual MCP roles.</strong>
        </div>
        <div className="novaArchitectureFlow">
          <div><small>Host application</small><strong>Nova / AI App</strong></div>
          <i>→</i>
          <div><small>Inside the host</small><strong>MCP Client</strong></div>
          <i>→</i>
          <div className="accent"><small>Remote or local</small><strong>MCP Server</strong></div>
          <i>→</i>
          <div><small>Exposed capability</small><strong>Tool / Resource</strong></div>
        </div>
      </div>
    </section>
  );
}
