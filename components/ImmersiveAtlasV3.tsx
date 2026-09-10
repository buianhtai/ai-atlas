"use client";

import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox, Scroll, ScrollControls, useScroll } from "@react-three/drei";
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
import { ReflectiveDeck, RenderedAsset, StudioEnvironment } from "@/components/immersive/HighFidelityVisuals";

const coral = "#ff6b57";
const cyan = "#72d8ff";
const mint = "#7fe0bd";
const gold = "#f4c96b";
const violet = "#a493ff";
const ink = "#07090d";

const cameraStops = [
  { p: new THREE.Vector3(0, 1.35, 8.2), t: new THREE.Vector3(0, .2, 0) },
  { p: new THREE.Vector3(-1.75, .8, .35), t: new THREE.Vector3(-3.05, -.15, -7) },
  { p: new THREE.Vector3(1.9, .65, -6.55), t: new THREE.Vector3(3.05, -.22, -14) },
  { p: new THREE.Vector3(-1.85, .72, -13.55), t: new THREE.Vector3(-3.05, -.2, -21) },
  { p: new THREE.Vector3(1.85, .72, -20.6), t: new THREE.Vector3(3.05, -.24, -28) },
];

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const scroll = useScroll();
  const { camera } = useThree();
  const desired = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useRef(new THREE.Vector3(0, 0, -1));

  useFrame(() => {
    const scaled = THREE.MathUtils.clamp(scroll.offset, 0, .9999) * (cameraStops.length - 1);
    const i = Math.floor(scaled);
    const n = Math.min(i + 1, cameraStops.length - 1);
    const mix = THREE.MathUtils.smootherstep(scaled - i, 0, 1);

    desired.lerpVectors(cameraStops[i].p, cameraStops[n].p, mix);
    target.lerpVectors(cameraStops[i].t, cameraStops[n].t, mix);

    if (reducedMotion) {
      camera.position.copy(desired);
      look.current.copy(target);
    } else {
      camera.position.lerp(desired, .045);
      look.current.lerp(target, .055);
    }
    camera.lookAt(look.current);
  });

  return null;
}

function Cable({ points, color, active = false }: { points: [number, number, number][]; color: string; active?: boolean }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), [points]);
  return (
    <mesh>
      <tubeGeometry args={[curve, 56, active ? .04 : .022, 12, false]} />
      <meshPhysicalMaterial color={color} roughness={.34} metalness={.18} emissive={color} emissiveIntensity={active ? .52 : .08} />
    </mesh>
  );
}

function ProductPlinth({ accent, wide = false }: { accent: string; wide?: boolean }) {
  return (
    <group position={[0, -1.48, 0]}>
      <RoundedBox args={[wide ? 5.2 : 4.6, .22, wide ? 3.8 : 3.4]} radius={.11} smoothness={4} receiveShadow>
        <meshPhysicalMaterial color="#11151c" roughness={.34} metalness={.42} clearcoat={.16} clearcoatRoughness={.5} />
      </RoundedBox>
      <RoundedBox args={[wide ? 4.72 : 4.12, .035, wide ? 3.32 : 2.92]} radius={.06} smoothness={3} position={[0, .13, 0]}>
        <meshPhysicalMaterial color="#171c24" roughness={.22} metalness={.3} />
      </RoundedBox>
      <mesh position={[0, .16, 1.48]}>
        <boxGeometry args={[wide ? 3.8 : 3.25, .018, .022]} />
        <meshBasicMaterial color={accent} transparent opacity={.8} />
      </mesh>
    </group>
  );
}

function FloatingGlass({ position, accent }: { position: [number, number, number]; accent: string }) {
  return (
    <Float speed={.65} floatIntensity={.05} rotationIntensity={.008}>
      <group position={position} rotation={[0, -.2, -.035]}>
        <RoundedBox args={[1.42, .84, .045]} radius={.055} smoothness={4}>
          <meshPhysicalMaterial color="#b8d3e4" transparent opacity={.14} roughness={.08} metalness={0} transmission={.22} thickness={.3} />
        </RoundedBox>
        <mesh position={[-.35, .2, .03]}><boxGeometry args={[.5, .026, .012]} /><meshBasicMaterial color={accent} /></mesh>
        <mesh position={[-.15, .03, .03]}><boxGeometry args={[.9, .018, .012]} /><meshBasicMaterial color="#aebbc8" /></mesh>
        <mesh position={[-.26, -.11, .03]}><boxGeometry args={[.68, .018, .012]} /><meshBasicMaterial color="#788898" /></mesh>
        <mesh position={[.33, -.27, .032]}><circleGeometry args={[.07, 20]} /><meshBasicMaterial color={accent} /></mesh>
      </group>
    </Float>
  );
}

function CoreStage({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  return (
    <group position={[0, .05, 0]}>
      <ProductPlinth accent={cyan} />
      <group scale={1.18}><ModelCore reducedMotion={reducedMotion} compact={compact} /></group>
      {!compact && <RenderedAsset kind="computer" position={[-1.95, .18, -.15]} size={1.48} reducedMotion={reducedMotion} rotation={[0, .14, 0]} />}
      <FloatingGlass position={[1.82, .16, -.1]} accent={cyan} />
      <ContactShadows position={[0, -1.31, 0]} scale={5.4} opacity={.62} blur={2.4} far={4} />
    </group>
  );
}

function KnowledgeStage({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  return (
    <group position={[-3.05, 0, -7]}>
      <ProductPlinth accent={mint} />
      <group position={[-.82, -.58, -.05]} scale={1.06}><DocumentArchive reducedMotion={reducedMotion} compact={compact} /></group>
      <RenderedAsset kind="folder" position={[1.22, .35, .05]} size={compact ? 1.25 : 1.7} reducedMotion={reducedMotion} rotation={[0, -.14, 0]} />
      <FloatingGlass position={[.55, -.42, .62]} accent={mint} />
      <Cable points={[[.05, -.36, .05], [.55, -.06, .2], [1.08, .18, .1]]} color={mint} active />
      <ContactShadows position={[0, -1.31, 0]} scale={5.3} opacity={.62} blur={2.3} far={4} />
    </group>
  );
}

function ConnectionStage({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  return (
    <group position={[3.05, 0, -14]}>
      <ProductPlinth accent={coral} wide />
      <group position={[0, -.34, .05]} scale={1.12}><ConnectorDock compact={compact} /></group>
      <group position={[-1.65, -.62, .45]} scale={.98}><RepoLaptop compact={compact} /></group>
      <group position={[1.7, -.6, .38]} scale={.86}><DatabaseRack compact={compact} /></group>
      {!compact && <RenderedAsset kind="tool" position={[0, .95, -.3]} size={1.45} reducedMotion={reducedMotion} />}
      <Cable points={[[0, -.08, .05], [-.72, -.32, .28], [-1.42, -.58, .43]]} color={cyan} active />
      <Cable points={[[0, -.08, .05], [.8, -.3, .25], [1.5, -.54, .36]]} color={gold} />
      <ContactShadows position={[0, -1.31, 0]} scale={5.8} opacity={.65} blur={2.2} far={4} />
    </group>
  );
}

function AgentStage({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  return (
    <group position={[-3.05, 0, -21]}>
      <ProductPlinth accent={violet} wide />
      <group position={[0, -.2, .02]} scale={.92}><AgentWorkbench compact={compact} /></group>
      {!compact && <RenderedAsset kind="setting" position={[-1.72, .76, .18]} size={1.28} reducedMotion={reducedMotion} rotation={[0, .12, 0]} />}
      <RenderedAsset kind="tool" position={[1.56, .72, .2]} size={compact ? 1.05 : 1.28} reducedMotion={reducedMotion} rotation={[0, -.12, 0]} />
      <Cable points={[[1.18, .48, .16], [.72, .13, .08], [.46, -.12, .02]]} color={mint} active />
      <ContactShadows position={[0, -1.31, 0]} scale={5.8} opacity={.65} blur={2.25} far={4} />
    </group>
  );
}

function GraphStage({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  return (
    <group position={[3.05, 0, -28]}>
      <ProductPlinth accent={cyan} wide />
      <group position={[0, -.42, .02]} scale={.86}><WorkflowConsole compact={compact} /></group>
      {!compact && <RenderedAsset kind="setting" position={[1.72, .68, .12]} size={1.34} reducedMotion={reducedMotion} rotation={[0, -.12, 0]} />}
      <FloatingGlass position={[-1.55, .48, .2]} accent={coral} />
      <Cable points={[[-1.12, .35, .18], [-.65, .1, .05], [-.28, -.2, .02]]} color={coral} active />
      <ContactShadows position={[0, -1.31, 0]} scale={5.8} opacity={.64} blur={2.2} far={4} />
    </group>
  );
}

function World({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  return (
    <>
      <color attach="background" args={[ink]} />
      <fog attach="fog" args={[ink, 9, 34]} />
      <StudioEnvironment compact={compact} />
      <ReflectiveDeck compact={compact} />
      <CoreStage reducedMotion={reducedMotion} compact={compact} />
      <KnowledgeStage reducedMotion={reducedMotion} compact={compact} />
      <ConnectionStage reducedMotion={reducedMotion} compact={compact} />
      <AgentStage reducedMotion={reducedMotion} compact={compact} />
      <GraphStage reducedMotion={reducedMotion} compact={compact} />
    </>
  );
}

const sections = [
  {
    eyebrow: "00 · Enter the Atlas",
    title: "AI architecture you can almost touch.",
    body: "The Atlas now treats every concept like a product visualization: physical materials, recognizable equipment, close-up camera work, and real spatial depth.",
    action: { href: "/paths", label: "Choose a learning path" },
  },
  {
    eyebrow: "01 · Knowledge",
    title: "Retrieval becomes a physical workspace.",
    body: "Documents, search, and retrieved context occupy different layers of the scene so RAG reads as an information pipeline rather than a diagram.",
    action: { href: "/learn/rag", label: "Enter the RAG library" },
  },
  {
    eyebrow: "02 · Connections",
    title: "Interfaces feel like real equipment.",
    body: "The MCP scene uses a workstation, connector dock, and database appliance with material contrast, status lighting, and physical cable paths.",
    action: { href: "/learn/mcp", label: "Explore MCP" },
  },
  {
    eyebrow: "03 · Agents",
    title: "A workstation, not a floating robot.",
    body: "Tools and controls surround the agent workspace so decisions and actions feel grounded in an operational environment.",
    action: { href: "/learn/agents", label: "Enter the agent workshop" },
  },
  {
    eyebrow: "04 · Control flow",
    title: "Inspect the system like a control surface.",
    body: "State and transitions become an instrument panel with physical depth, glass overlays, signal paths, and focused lighting.",
    action: { href: "/learn/langgraph", label: "Follow the graph" },
  },
];

export function ImmersiveAtlasV3() {
  const { dpr, reducedMotion, compact } = useResponsive3D();

  return (
    <div className="immersiveAtlas immersiveAtlasRealistic immersiveAtlasFidelity">
      <div className="immersiveChrome">
        <Link href="/" className="immersiveBrand"><span>AI</span><strong>ATLAS</strong></Link>
        <nav aria-label="Immersive Atlas navigation">
          <Link href="/paths">Paths</Link>
          <Link href="/learn/mcp">MCP</Link>
          <Link href="/learn/rag">RAG</Link>
        </nav>
      </div>

      <Canvas
        shadows={!compact}
        dpr={dpr}
        camera={{ position: [0, 1.35, 8.2], fov: compact ? 51 : 38 }}
        gl={{ antialias: !compact, powerPreference: "high-performance", alpha: false }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = compact ? 1 : 1.08;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <ScrollControls pages={5} damping={reducedMotion ? .01 : .2} distance={1}>
          <CameraRig reducedMotion={reducedMotion} />
          <World reducedMotion={reducedMotion} compact={compact} />
          <Scroll html style={{ width: "100%" }}>
            <div className="immersiveNarrative">
              {sections.map((section, index) => (
                <section className={`immersiveChapter chapter-${index}`} key={section.eyebrow} id={index === sections.length - 1 ? "concepts" : undefined}>
                  <div className="immersiveCopy fidelityCopy">
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
      <div className="assetCredit">Selected rendered icons: 3Dicons · CC0</div>
    </div>
  );
}
