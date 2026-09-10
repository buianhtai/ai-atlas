"use client";

import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Scroll, ScrollControls, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useResponsive3D } from "@/components/useResponsive3D";

const coral = "#ff6b57";
const cyan = "#72d8ff";
const mint = "#7fe0bd";
const gold = "#f4c96b";
const violet = "#9d8cff";
const ink = "#080a0f";
const panel = "#121722";

const cameraStops = [
  { position: new THREE.Vector3(0, 1.5, 10), target: new THREE.Vector3(0, .7, 0) },
  { position: new THREE.Vector3(-2.1, 1.1, 1.2), target: new THREE.Vector3(-3.2, .15, -7) },
  { position: new THREE.Vector3(2.4, .85, -6.2), target: new THREE.Vector3(3.1, -.05, -14) },
  { position: new THREE.Vector3(-2.25, 1.05, -13.3), target: new THREE.Vector3(-3.1, .1, -21) },
  { position: new THREE.Vector3(2.1, .9, -20.4), target: new THREE.Vector3(3.1, -.1, -28) },
];

function CameraJourney({ reducedMotion }: { reducedMotion: boolean }) {
  const scroll = useScroll();
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0, -1));
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const scaled = THREE.MathUtils.clamp(scroll.offset, 0, .9999) * (cameraStops.length - 1);
    const index = Math.floor(scaled);
    const mix = scaled - index;
    const next = Math.min(index + 1, cameraStops.length - 1);

    desiredPosition.lerpVectors(cameraStops[index].position, cameraStops[next].position, mix);
    desiredTarget.lerpVectors(cameraStops[index].target, cameraStops[next].target, mix);

    if (reducedMotion) {
      camera.position.copy(desiredPosition);
      look.current.copy(desiredTarget);
    } else {
      camera.position.lerp(desiredPosition, .055);
      look.current.lerp(desiredTarget, .07);
    }
    camera.lookAt(look.current);
  });

  return null;
}

function GroundRing({ x, z, color, radius = 2.5 }: { x: number; z: number; color: string; radius?: number }) {
  return (
    <group position={[x, -1.48, z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 64]} />
        <meshStandardMaterial color="#0d111a" roughness={1} />
      </mesh>
      <mesh position={[0, .015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * .72, radius * .735, 64]} />
        <meshBasicMaterial color={color} transparent opacity={.45} />
      </mesh>
    </group>
  );
}

function CoreModel() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * .08;
  });
  return (
    <group ref={group} position={[0, .45, 0]}>
      <Float speed={1.2} floatIntensity={.22} rotationIntensity={.04}>
        <mesh>
          <icosahedronGeometry args={[1.32, 2]} />
          <meshPhysicalMaterial color="#151e2b" roughness={.18} metalness={.08} transparent opacity={.9} transmission={.06} />
        </mesh>
        <mesh scale={1.06}>
          <icosahedronGeometry args={[1.32, 2]} />
          <meshBasicMaterial color={cyan} wireframe transparent opacity={.28} />
        </mesh>
        {[1.65, 1.95, 2.25].map((radius, index) => (
          <mesh key={radius} rotation={[Math.PI / 2 + index * .33, index * .6, 0]}>
            <torusGeometry args={[radius, .018, 8, 96]} />
            <meshBasicMaterial color={[coral, cyan, violet][index]} transparent opacity={.55} />
          </mesh>
        ))}
        {[-1.5, -.7, .45, 1.35].map((x, index) => (
          <mesh key={x} position={[x, Math.sin(index) * .6, Math.cos(index) * 1.15]}>
            <sphereGeometry args={[.1 + index * .012, 20, 20]} />
            <meshStandardMaterial color={[coral, gold, mint, violet][index]} emissive={[coral, gold, mint, violet][index]} emissiveIntensity={.8} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

function KnowledgeWorld() {
  const books = Array.from({ length: 18 });
  return (
    <group position={[-3.2, -.15, -7]}>
      <GroundRing x={0} z={0} color={mint} radius={2.7} />
      <group position={[-.9, -.65, 0]}>
        {[0, 1, 2].map((row) => (
          <group key={row} position={[0, row * .62, 0]}>
            <RoundedBox args={[2.25, .08, .72]} radius={.03} smoothness={2}>
              <meshStandardMaterial color="#343946" roughness={.72} />
            </RoundedBox>
            {books.slice(row * 6, row * 6 + 6).map((_, i) => (
              <mesh key={i} position={[-.9 + i * .36, .22, 0]}>
                <boxGeometry args={[.24, .42 + (i % 3) * .05, .48]} />
                <meshStandardMaterial color={["#50687d", "#7b5f72", "#4d786e", "#8a744f"][i % 4]} roughness={.88} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
      <Float speed={1.7} floatIntensity={.35} rotationIntensity={.08}>
        <group position={[1.1, .55, .15]} rotation={[0, -.18, -.08]}>
          <RoundedBox args={[1.12, 1.42, .08]} radius={.05} smoothness={3}>
            <meshStandardMaterial color="#f5efe4" roughness={.92} />
          </RoundedBox>
          {[.35, .08, -.2, -.47].map((y, i) => (
            <mesh key={y} position={[0, y, .055]}>
              <boxGeometry args={[.72 - i * .07, .035, .02]} />
              <meshBasicMaterial color={i === 0 ? coral : "#857f77"} />
            </mesh>
          ))}
        </group>
      </Float>
      <mesh position={[.56, .28, .05]} rotation={[0, 0, -.2]}>
        <torusGeometry args={[.38, .065, 14, 48]} />
        <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={.35} />
      </mesh>
      <mesh position={[.84, -.02, .05]} rotation={[0, 0, -.8]}>
        <cylinderGeometry args={[.045, .045, .72, 16]} />
        <meshStandardMaterial color={mint} />
      </mesh>
    </group>
  );
}

function Tube({ points, color, active = false }: { points: [number, number, number][]; color: string; active?: boolean }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), [points]);
  return (
    <mesh>
      <tubeGeometry args={[curve, 40, active ? .055 : .032, 10, false]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? .65 : .12} roughness={.42} />
    </mesh>
  );
}

function ConnectionWorld() {
  const endpoints: [number, number, number][] = [[-1.5, -.75, .25], [0, -.95, -.9], [1.55, -.72, .28]];
  return (
    <group position={[3.1, -.02, -14]}>
      <GroundRing x={0} z={0} color={coral} radius={2.8} />
      <group position={[0, .28, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[.72, .9, .38, 48]} />
          <meshStandardMaterial color="#303541" roughness={.5} />
        </mesh>
        <mesh position={[0, .22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[.43, .53, 48]} />
          <meshStandardMaterial color={coral} emissive={coral} emissiveIntensity={.75} />
        </mesh>
      </group>
      {endpoints.map((point, index) => (
        <group key={index} position={point}>
          <RoundedBox args={[1.15, .72, .72]} radius={.15} smoothness={3}>
            <meshStandardMaterial color={["#384758", "#315047", "#574a34"][index]} roughness={.72} />
          </RoundedBox>
          <mesh position={[0, .38, .05]}>
            <sphereGeometry args={[.09, 18, 18]} />
            <meshStandardMaterial color={[cyan, mint, gold][index]} emissive={[cyan, mint, gold][index]} emissiveIntensity={.9} />
          </mesh>
        </group>
      ))}
      <Tube points={[[0, .25, 0], [-.55, -.1, .05], endpoints[0]]} color={cyan} />
      <Tube points={[[0, .25, 0], [0, -.15, -.35], endpoints[1]]} color={mint} />
      <Tube points={[[0, .25, 0], [.55, -.1, .05], endpoints[2]]} color={gold} />
      <Float speed={1.5} floatIntensity={.24} rotationIntensity={.04}>
        <mesh position={[0, 1.35, 0]}>
          <octahedronGeometry args={[.48, 0]} />
          <meshStandardMaterial color="#f1f5f7" roughness={.44} />
        </mesh>
      </Float>
    </group>
  );
}

function BotNode({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={1.2} floatIntensity={.12} rotationIntensity={.025}>
      <group position={position}>
        <RoundedBox args={[.8, .62, .55]} radius={.16} smoothness={3}>
          <meshStandardMaterial color="#e9edf1" roughness={.62} />
        </RoundedBox>
        {[-.18, .18].map((x) => (
          <mesh key={x} position={[x, .08, .29]}>
            <sphereGeometry args={[.055, 14, 14]} />
            <meshBasicMaterial color="#16191f" />
          </mesh>
        ))}
        <mesh position={[0, -.12, .3]}>
          <boxGeometry args={[.28, .035, .025]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </Float>
  );
}

function AgentWorld() {
  const positions: [number, number, number][] = [[-1.35, .35, .55], [1.25, .5, .4], [-.95, -.55, -.45], [1.15, -.5, -.55]];
  return (
    <group position={[-3.1, -.02, -21]}>
      <GroundRing x={0} z={0} color={violet} radius={2.9} />
      <RoundedBox args={[1.75, .24, 1.4]} radius={.12} smoothness={3} position={[0, -.48, 0]}>
        <meshStandardMaterial color="#292e39" roughness={.7} />
      </RoundedBox>
      <mesh position={[0, -.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[.5, 48]} />
        <meshBasicMaterial color={violet} transparent opacity={.7} />
      </mesh>
      {positions.map((position, index) => <BotNode key={index} position={position} color={[gold, cyan, mint, coral][index]} />)}
      {positions.map((p, index) => <Tube key={index} points={[[p[0], p[1] - .15, p[2]], [p[0] * .45, -.05, p[2] * .4], [0, -.27, 0]]} color={[gold, cyan, mint, coral][index]} />)}
    </group>
  );
}

function GraphWorld() {
  const nodes: { p: [number, number, number]; color: string; scale: number }[] = [
    { p: [-1.6, .2, .3], color: coral, scale: .22 },
    { p: [-.55, .75, -.1], color: cyan, scale: .28 },
    { p: [-.45, -.55, -.3], color: gold, scale: .26 },
    { p: [.72, .65, .15], color: mint, scale: .3 },
    { p: [.8, -.45, -.3], color: violet, scale: .24 },
    { p: [1.7, .1, .2], color: coral, scale: .34 },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[4,1]];
  return (
    <group position={[3.1, -.02, -28]}>
      <GroundRing x={0} z={0} color={cyan} radius={3} />
      {edges.map(([a,b], i) => <Tube key={i} points={[nodes[a].p, [0, 0, -.12], nodes[b].p]} color={i === 6 ? coral : "#52606f"} active={i === 6} />)}
      {nodes.map((node, index) => (
        <Float key={index} speed={1.1 + index * .08} floatIntensity={.12} rotationIntensity={.02}>
          <mesh position={node.p}>
            <sphereGeometry args={[node.scale, 24, 24]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={.35} roughness={.4} />
          </mesh>
        </Float>
      ))}
      <mesh position={[0, -.95, .1]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.25, 1.32, 64]} />
        <meshBasicMaterial color={cyan} transparent opacity={.32} />
      </mesh>
    </group>
  );
}

function World({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <color attach="background" args={[ink]} />
      <fog attach="fog" args={[ink, 10, 34]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 9, 7]} intensity={2.8} color="#dce9ff" />
      <pointLight position={[-5, 2, 1]} intensity={14} color={cyan} />
      <pointLight position={[5, 1, -12]} intensity={11} color={coral} />
      <Stars radius={42} depth={28} count={reducedMotion ? 260 : 900} factor={2.2} saturation={0} fade speed={reducedMotion ? 0 : .22} />
      <CoreModel />
      <KnowledgeWorld />
      <ConnectionWorld />
      <AgentWorld />
      <GraphWorld />
    </>
  );
}

const sections = [
  {
    eyebrow: "00 · Enter the Atlas",
    title: "See AI as a system, not a glossary.",
    body: "Move through the architecture. Each region turns an abstract AI term into a place, a flow, and a mental model.",
    action: { href: "/paths", label: "Choose a learning path" },
  },
  {
    eyebrow: "01 · Knowledge",
    title: "Give the model somewhere to look.",
    body: "RAG is a research room: the question enters, relevant evidence is retrieved, and only then does the model answer.",
    action: { href: "/learn/rag", label: "Enter the RAG library" },
  },
  {
    eyebrow: "02 · Connections",
    title: "Connect intelligence to the outside world.",
    body: "MCP gives AI applications a consistent protocol for reaching tools and context without inventing a new integration shape every time.",
    action: { href: "/learn/mcp", label: "Explore MCP" },
  },
  {
    eyebrow: "03 · Agents",
    title: "Turn answers into actions.",
    body: "Agents decide, act, observe, and continue. Multi-agent systems add specialists and coordination when one loop is not enough.",
    action: { href: "/learn/agents", label: "Enter the agent workshop" },
  },
  {
    eyebrow: "04 · Control flow",
    title: "Make the path explicit.",
    body: "Frameworks such as LangGraph turn hidden loops and branches into visible stateful workflows you can inspect, test, and control.",
    action: { href: "/learn/langgraph", label: "Follow the graph" },
  },
];

export function ImmersiveAtlas() {
  const { dpr, reducedMotion, compact } = useResponsive3D();

  return (
    <div className="immersiveAtlas">
      <div className="immersiveChrome">
        <Link href="/" className="immersiveBrand"><span>AI</span><strong>ATLAS</strong></Link>
        <nav aria-label="Immersive Atlas navigation">
          <Link href="/paths">Paths</Link>
          <Link href="/learn/mcp">MCP</Link>
          <a href="#concepts">Index</a>
        </nav>
      </div>

      <Canvas dpr={dpr} camera={{ position: [0, 1.5, 10], fov: compact ? 54 : 43 }} gl={{ antialias: !compact, powerPreference: "high-performance" }}>
        <ScrollControls pages={5} damping={reducedMotion ? 0 : .18} distance={1}>
          <CameraJourney reducedMotion={reducedMotion} />
          <World reducedMotion={reducedMotion} />
          <Scroll html style={{ width: "100%" }}>
            <div className="immersiveNarrative">
              {sections.map((section, index) => (
                <section className={`immersiveChapter chapter-${index}`} key={section.eyebrow} id={index === sections.length - 1 ? "concepts" : undefined}>
                  <div className="immersiveCopy">
                    <span>{section.eyebrow}</span>
                    <h1>{section.title}</h1>
                    <p>{section.body}</p>
                    <Link href={section.action.href}>{section.action.label}<b>↗</b></Link>
                  </div>
                  <div className="chapterMarker" aria-hidden="true"><i />{String(index + 1).padStart(2, "0")}</div>
                </section>
              ))}
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>

      <div className="immersiveRail" aria-hidden="true">
        {sections.map((_, index) => <span key={index}>{String(index + 1).padStart(2, "0")}</span>)}
      </div>
      <div className="immersiveHint" aria-hidden="true"><i /> Scroll to travel</div>
    </div>
  );
}
