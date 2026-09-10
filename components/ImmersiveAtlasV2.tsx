"use client";

import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox, Scroll, ScrollControls, Stars, useScroll } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useResponsive3D } from "@/components/useResponsive3D";
import {
  AgentWorkbench,
  ConnectorDock,
  DatabaseRack,
  DocumentArchive,
  ModelCore,
  RepoLaptop,
  WorkflowConsole,
} from "@/components/immersive/RealisticProps";

const coral = "#ff6b57";
const cyan = "#72d8ff";
const mint = "#7fe0bd";
const gold = "#f4c96b";
const violet = "#9d8cff";
const ink = "#080a0f";

const cameraStops = [
  { position: new THREE.Vector3(0, 1.65, 9.7), target: new THREE.Vector3(0, .55, 0) },
  { position: new THREE.Vector3(-2.0, 1.05, .9), target: new THREE.Vector3(-3.15, -.05, -7) },
  { position: new THREE.Vector3(2.35, .9, -6.1), target: new THREE.Vector3(3.05, -.12, -14) },
  { position: new THREE.Vector3(-2.2, 1.0, -13.1), target: new THREE.Vector3(-3.05, -.12, -21) },
  { position: new THREE.Vector3(2.15, .92, -20.3), target: new THREE.Vector3(3.0, -.18, -28) },
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
      camera.position.lerp(desiredPosition, .052);
      look.current.lerp(desiredTarget, .065);
    }
    camera.lookAt(look.current);
  });

  return null;
}

function Tube({ points, color, active = false }: { points: [number, number, number][]; color: string; active?: boolean }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), [points]);
  return (
    <mesh>
      <tubeGeometry args={[curve, 48, active ? .045 : .026, 10, false]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? .7 : .16} roughness={.5} />
    </mesh>
  );
}

function Platform({ color, radius = 2.8 }: { color: string; radius?: number }) {
  return (
    <group position={[0, -1.5, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius * .96, .22, 64]} />
        <meshStandardMaterial color="#11161e" roughness={.94} metalness={.04} />
      </mesh>
      <mesh position={[0, .12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * .72, radius * .735, 64]} />
        <meshBasicMaterial color={color} transparent opacity={.46} />
      </mesh>
      <mesh position={[0, .115, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * .9, radius * .905, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={.07} />
      </mesh>
    </group>
  );
}

function SearchLens({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Float speed={reducedMotion ? 0 : 1.25} floatIntensity={reducedMotion ? 0 : .12} rotationIntensity={reducedMotion ? 0 : .025}>
      <group position={[.72, .34, .26]} rotation={[0, 0, -.18]}>
        <mesh>
          <torusGeometry args={[.38, .058, 16, 48]} />
          <meshStandardMaterial color={mint} roughness={.28} metalness={.24} emissive={mint} emissiveIntensity={.18} />
        </mesh>
        <mesh position={[.33, -.33, 0]} rotation={[0, 0, -.78]}>
          <cylinderGeometry args={[.045, .06, .78, 18]} />
          <meshStandardMaterial color="#6f7b86" roughness={.34} metalness={.35} />
        </mesh>
        <mesh position={[0, 0, -.03]}>
          <circleGeometry args={[.31, 48]} />
          <meshPhysicalMaterial color="#bceee1" transparent opacity={.16} roughness={.08} metalness={0} />
        </mesh>
      </group>
    </Float>
  );
}

function MiniBot({ position, color, reducedMotion }: { position: [number, number, number]; color: string; reducedMotion: boolean }) {
  return (
    <Float speed={reducedMotion ? 0 : 1.1} floatIntensity={reducedMotion ? 0 : .08} rotationIntensity={reducedMotion ? 0 : .018}>
      <group position={position}>
        <RoundedBox args={[.66, .52, .5]} radius={.14} smoothness={3}>
          <meshStandardMaterial color="#e7ebef" roughness={.48} metalness={.06} />
        </RoundedBox>
        {[-.15, .15].map((x) => (
          <mesh key={x} position={[x, .08, .26]}>
            <sphereGeometry args={[.046, 14, 14]} />
            <meshStandardMaterial color="#15181d" />
          </mesh>
        ))}
        <mesh position={[0, -.11, .262]}>
          <boxGeometry args={[.23, .025, .015]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[0, .39, 0]}>
          <cylinderGeometry args={[.018, .018, .2, 10]} />
          <meshStandardMaterial color="#737d88" />
        </mesh>
        <mesh position={[0, .52, 0]}>
          <sphereGeometry args={[.055, 14, 14]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={.8} />
        </mesh>
      </group>
    </Float>
  );
}

function CoreWorld({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  return (
    <group position={[0, .18, 0]}>
      <Platform color={cyan} radius={2.65} />
      <ModelCore reducedMotion={reducedMotion} compact={compact} />
      {[-1.65, -.78, .72, 1.65].map((x, index) => (
        <group key={x} position={[x, -.72, index % 2 ? -.42 : .35]}>
          <RoundedBox args={[.52, .18, .66]} radius={.05} smoothness={2}>
            <meshStandardMaterial color="#252c35" roughness={.62} metalness={.18} />
          </RoundedBox>
          <mesh position={[0, .11, .02]}>
            <planeGeometry args={[.34, .05]} />
            <meshBasicMaterial color={[coral, gold, mint, violet][index]} />
          </mesh>
        </group>
      ))}
      <ContactShadows position={[0, -1.35, 0]} scale={5} opacity={.48} blur={2.4} far={3.2} />
    </group>
  );
}

function KnowledgeWorld({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  return (
    <group position={[-3.15, -.02, -7]}>
      <Platform color={mint} radius={2.9} />
      <group position={[-.8, -.62, -.12]} rotation={[0, .12, 0]}>
        <DocumentArchive reducedMotion={reducedMotion} compact={compact} />
      </group>
      <SearchLens reducedMotion={reducedMotion} />
      <Float speed={reducedMotion ? 0 : 1.15} floatIntensity={reducedMotion ? 0 : .1} rotationIntensity={reducedMotion ? 0 : .018}>
        <group position={[1.45, .5, .15]} rotation={[0, -.28, -.05]}>
          <RoundedBox args={[.92, 1.16, .045]} radius={.035} smoothness={2}>
            <meshStandardMaterial color="#f2ede5" roughness={.92} />
          </RoundedBox>
          {[.3, .13, -.04, -.21, -.38].map((y, i) => (
            <mesh key={y} position={[0, y, .03]}>
              <boxGeometry args={[.58 - i * .045, .025, .012]} />
              <meshBasicMaterial color={i === 1 ? coral : i === 2 ? mint : "#777d83"} />
            </mesh>
          ))}
        </group>
      </Float>
      <Tube points={[[-.15, -.1, .1], [.45, .2, .16], [1.05, .42, .15]]} color={mint} active />
      <ContactShadows position={[0, -1.34, 0]} scale={5.4} opacity={.5} blur={2.2} far={3.2} />
    </group>
  );
}

function ConnectionWorld({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  return (
    <group position={[3.05, -.02, -14]}>
      <Platform color={coral} radius={3.05} />
      <group position={[0, -.25, .15]}><ConnectorDock compact={compact} /></group>
      <group position={[-1.55, -.56, .4]}><RepoLaptop compact={compact} /></group>
      <group position={[.05, -.58, -1.18]} scale={.72}><DocumentArchive reducedMotion={reducedMotion} compact={compact} /></group>
      <group position={[1.6, -.55, .35]} scale={.76}><DatabaseRack compact={compact} /></group>
      <Tube points={[[0, -.1, .15], [-.65, -.32, .35], [-1.34, -.55, .4]]} color={cyan} active />
      <Tube points={[[0, -.1, .1], [.02, -.35, -.48], [.04, -.58, -1.0]]} color={mint} />
      <Tube points={[[0, -.1, .15], [.72, -.3, .32], [1.4, -.52, .35]]} color={gold} />
      <ContactShadows position={[0, -1.34, 0]} scale={5.7} opacity={.54} blur={2.3} far={3.5} />
    </group>
  );
}

function AgentWorld({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  return (
    <group position={[-3.05, -.02, -21]}>
      <Platform color={violet} radius={3.05} />
      <group position={[0, -.12, -.1]} scale={.85}><AgentWorkbench compact={compact} /></group>
      <MiniBot position={[-1.45, .32, .65]} color={gold} reducedMotion={reducedMotion} />
      <MiniBot position={[1.35, .48, .58]} color={cyan} reducedMotion={reducedMotion} />
      <MiniBot position={[1.25, -.42, -.72]} color={mint} reducedMotion={reducedMotion} />
      <Tube points={[[-1.25, .18, .58], [-.7, -.02, .32], [-.42, -.2, .1]]} color={gold} />
      <Tube points={[[1.15, .35, .5], [.68, .05, .25], [.4, -.18, .08]]} color={cyan} />
      <Tube points={[[1.05, -.42, -.62], [.62, -.34, -.3], [.36, -.2, -.05]]} color={mint} active />
      <ContactShadows position={[0, -1.34, 0]} scale={5.8} opacity={.54} blur={2.4} far={3.5} />
    </group>
  );
}

function GraphWorld({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  const nodes: { p: [number, number, number]; color: string }[] = [
    { p: [-1.45, .42, .35], color: coral },
    { p: [-.72, .84, -.2], color: cyan },
    { p: [-.48, -.46, -.4], color: gold },
    { p: [.62, .72, .18], color: mint },
    { p: [.82, -.38, -.36], color: violet },
    { p: [1.54, .25, .28], color: coral },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[4,1]];

  return (
    <group position={[3.0, -.02, -28]}>
      <Platform color={cyan} radius={3.08} />
      <group position={[0, -.42, .02]} scale={.76}><WorkflowConsole compact={compact} /></group>
      {nodes.map((node, index) => (
        <Float key={index} speed={reducedMotion ? 0 : 1 + index * .06} floatIntensity={reducedMotion ? 0 : .08} rotationIntensity={reducedMotion ? 0 : .015}>
          <group position={node.p}>
            <mesh>
              <cylinderGeometry args={[.16, .19, .36, 22]} />
              <meshStandardMaterial color="#343b45" roughness={.42} metalness={.22} />
            </mesh>
            <mesh position={[0, .22, 0]}>
              <sphereGeometry args={[.09 + (index % 2) * .02, 20, 20]} />
              <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={.7} />
            </mesh>
          </group>
        </Float>
      ))}
      {edges.map(([a, b], i) => <Tube key={i} points={[nodes[a].p, [0, i % 2 ? .12 : -.08, -.2], nodes[b].p]} color={i === 6 ? coral : "#536170"} active={i === 6} />)}
      <ContactShadows position={[0, -1.34, 0]} scale={5.8} opacity={.52} blur={2.4} far={3.5} />
    </group>
  );
}

function World({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  return (
    <>
      <color attach="background" args={[ink]} />
      <fog attach="fog" args={[ink, 10, 35]} />
      <ambientLight intensity={.95} />
      <hemisphereLight args={["#dcecff", "#15181e", 1.15]} />
      <directionalLight castShadow={!compact} position={[5, 9, 7]} intensity={2.65} color="#e8efff" shadow-mapSize-width={compact ? 512 : 1024} shadow-mapSize-height={compact ? 512 : 1024} />
      <pointLight position={[-5, 2, 1]} intensity={10} color={cyan} />
      <pointLight position={[5, 1, -12]} intensity={9} color={coral} />
      <pointLight position={[-4, 1, -21]} intensity={7} color={violet} />
      <Stars radius={44} depth={30} count={compact ? 260 : reducedMotion ? 320 : 780} factor={2} saturation={0} fade speed={reducedMotion ? 0 : .16} />
      <CoreWorld reducedMotion={reducedMotion} compact={compact} />
      <KnowledgeWorld reducedMotion={reducedMotion} compact={compact} />
      <ConnectionWorld reducedMotion={reducedMotion} compact={compact} />
      <AgentWorld reducedMotion={reducedMotion} compact={compact} />
      <GraphWorld reducedMotion={reducedMotion} compact={compact} />
    </>
  );
}

const sections = [
  {
    eyebrow: "00 · Enter the Atlas",
    title: "See AI as a system, not a glossary.",
    body: "Move through a miniature AI world. Every region is built from recognizable engineering objects so the architecture feels tangible, not symbolic.",
    action: { href: "/paths", label: "Choose a learning path" },
  },
  {
    eyebrow: "01 · Knowledge",
    title: "Give the model somewhere to look.",
    body: "Walk past the document archive, inspect the retrieved page, and see why RAG behaves more like a research desk than model training.",
    action: { href: "/learn/rag", label: "Enter the RAG library" },
  },
  {
    eyebrow: "02 · Connections",
    title: "Connect intelligence to real systems.",
    body: "The MCP station now connects to a repo laptop, document archive, and database rack—real capabilities rather than anonymous boxes.",
    action: { href: "/learn/mcp", label: "Explore MCP" },
  },
  {
    eyebrow: "03 · Agents",
    title: "Turn answers into actions.",
    body: "A real workstation, tools, and specialist bots make the agent loop visible: decide, use a capability, observe, and continue.",
    action: { href: "/learn/agents", label: "Enter the agent workshop" },
  },
  {
    eyebrow: "04 · Control flow",
    title: "Make the path explicit.",
    body: "The workflow console turns nodes and transitions into something closer to an operational control surface you can inspect and reason about.",
    action: { href: "/learn/langgraph", label: "Follow the graph" },
  },
];

export function ImmersiveAtlasV2() {
  const { dpr, reducedMotion, compact } = useResponsive3D();

  return (
    <div className="immersiveAtlas immersiveAtlasRealistic">
      <div className="immersiveChrome">
        <Link href="/" className="immersiveBrand"><span>AI</span><strong>ATLAS</strong></Link>
        <nav aria-label="Immersive Atlas navigation">
          <Link href="/paths">Paths</Link>
          <Link href="/learn/mcp">MCP</Link>
          <Link href="/learn/rag">RAG</Link>
        </nav>
      </div>

      <Canvas shadows={!compact} dpr={dpr} camera={{ position: [0, 1.65, 9.7], fov: compact ? 54 : 42 }} gl={{ antialias: !compact, powerPreference: "high-performance" }}>
        <ScrollControls pages={5} damping={reducedMotion ? .01 : .18} distance={1}>
          <CameraJourney reducedMotion={reducedMotion} />
          <World reducedMotion={reducedMotion} compact={compact} />
          <Scroll html style={{ width: "100%" }}>
            <div className="immersiveNarrative">
              {sections.map((section, index) => (
                <section className={`immersiveChapter chapter-${index}`} key={section.eyebrow} id={index === sections.length - 1 ? "concepts" : undefined}>
                  <div className="immersiveCopy">
                    <span>{section.eyebrow}</span>
                    {index === 0 ? <h1>{section.title}</h1> : <h2>{section.title}</h2>}
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
