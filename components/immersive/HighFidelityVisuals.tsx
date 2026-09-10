"use client";

import { Environment, Float, MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import * as THREE from "three";

const ASSETS = {
  computer: "https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/computer-dynamic-premium.png",
  folder: "https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/folder-dynamic-premium.png",
  tool: "https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/tool-dynamic-premium.png",
  setting: "https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/setting-dynamic-premium.png",
} as const;

export type RenderedAssetKind = keyof typeof ASSETS;

function AssetPlane({ kind, size = 1.45 }: { kind: RenderedAssetKind; size?: number }) {
  const texture = useTexture(ASSETS[kind]);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <mesh>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.04} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

export function RenderedAsset({
  kind,
  position,
  size = 1.45,
  reducedMotion = false,
  rotation = [0, 0, 0],
}: {
  kind: RenderedAssetKind;
  position: [number, number, number];
  size?: number;
  reducedMotion?: boolean;
  rotation?: [number, number, number];
}) {
  return (
    <Float speed={reducedMotion ? 0 : 1.05} floatIntensity={reducedMotion ? 0 : 0.08} rotationIntensity={reducedMotion ? 0 : 0.012}>
      <group position={position} rotation={rotation}>
        <Suspense fallback={null}>
          <AssetPlane kind={kind} size={size} />
        </Suspense>
        <mesh position={[0, -size * 0.43, -0.12]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.15, 0.5, 1]}>
          <circleGeometry args={[size * 0.28, 48]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.2} depthWrite={false} />
        </mesh>
      </group>
    </Float>
  );
}

export function StudioEnvironment({ compact = false }: { compact?: boolean }) {
  return (
    <>
      {!compact && <Environment preset="studio" background={false} environmentIntensity={0.7} />}
      <hemisphereLight args={["#dce7f3", "#080a0f", compact ? 0.72 : 0.9]} />
      <spotLight position={[5, 8, 6]} angle={0.48} penumbra={0.85} intensity={compact ? 42 : 58} color="#fff7ed" castShadow={!compact} />
      <spotLight position={[-6, 4, 2]} angle={0.58} penumbra={0.95} intensity={compact ? 20 : 30} color="#8ccfff" />
      <spotLight position={[4, 3, -12]} angle={0.62} penumbra={1} intensity={compact ? 18 : 28} color="#ff8a76" />
    </>
  );
}

export function ReflectiveDeck({ compact = false }: { compact?: boolean }) {
  return (
    <mesh position={[0, -1.63, -14]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[26, 44]} />
      {compact ? (
        <meshStandardMaterial color="#090c11" roughness={0.78} metalness={0.12} />
      ) : (
        <MeshReflectorMaterial
          color="#0a0d12"
          roughness={0.48}
          metalness={0.28}
          blur={[220, 80]}
          resolution={512}
          mixBlur={0.72}
          mixStrength={0.24}
          depthScale={0.18}
          minDepthThreshold={0.78}
          maxDepthThreshold={1.35}
        />
      )}
    </mesh>
  );
}
