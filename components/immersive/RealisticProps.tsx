"use client";

import { Float, RoundedBox } from "@react-three/drei";

const dark = "#171b22";
const metal = "#343b45";
const softMetal = "#56616f";
const paper = "#efe9df";
const screen = "#0c1720";
const coral = "#ff6b57";
const cyan = "#72d8ff";
const mint = "#7fe0bd";
const gold = "#f4c96b";
const violet = "#9d8cff";

function Led({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} />
    </mesh>
  );
}

function ScreenLine({ y, width, color = cyan }: { y: number; width: number; color?: string }) {
  return (
    <mesh position={[-0.42 + width / 2, y, 0.021]}>
      <boxGeometry args={[width, 0.028, 0.015]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export function RepoLaptop({ compact = false }: { compact?: boolean }) {
  const scale = compact ? 0.82 : 1;
  return (
    <group scale={scale} rotation={[0, -0.22, 0]}>
      <RoundedBox args={[1.35, 0.08, 0.88]} radius={0.035} smoothness={2} position={[0, -0.42, 0.1]}>
        <meshStandardMaterial color={metal} roughness={0.42} metalness={0.35} />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.8, 0.08]} radius={0.055} smoothness={3} position={[0, 0.02, -0.28]} rotation={[-0.08, 0, 0]}>
        <meshStandardMaterial color="#2b313a" roughness={0.38} metalness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.02, -0.231]} rotation={[-0.08, 0, 0]}>
        <planeGeometry args={[1.02, 0.63]} />
        <meshBasicMaterial color={screen} />
      </mesh>
      <group position={[0, 0.02, -0.208]} rotation={[-0.08, 0, 0]}>
        <ScreenLine y={0.2} width={0.66} color={coral} />
        <ScreenLine y={0.11} width={0.82} />
        <ScreenLine y={0.02} width={0.52} color={mint} />
        <ScreenLine y={-0.07} width={0.74} />
        <ScreenLine y={-0.16} width={0.43} color={violet} />
        <mesh position={[0.37, -0.19, 0.02]}>
          <circleGeometry args={[0.055, 18]} />
          <meshBasicMaterial color={gold} />
        </mesh>
      </group>
      <mesh position={[0, -0.365, 0.25]}>
        <boxGeometry args={[0.46, 0.012, 0.26]} />
        <meshStandardMaterial color="#20262e" roughness={0.5} />
      </mesh>
      {[-0.42, -0.28, -0.14, 0, 0.14, 0.28, 0.42].map((x) => (
        <mesh key={x} position={[x, -0.36, 0.03]}>
          <boxGeometry args={[0.085, 0.012, 0.055]} />
          <meshStandardMaterial color="#151a20" roughness={0.65} />
        </mesh>
      ))}
      <Led position={[0.57, -0.37, 0.36]} color={cyan} />
    </group>
  );
}

export function DocumentArchive({ reducedMotion = false, compact = false }: { reducedMotion?: boolean; compact?: boolean }) {
  const scale = compact ? 0.82 : 1;
  return (
    <group scale={scale}>
      <RoundedBox args={[1.35, 1.38, 0.72]} radius={0.06} smoothness={3} position={[0, -0.02, 0]}>
        <meshStandardMaterial color="#3a4049" roughness={0.74} metalness={0.08} />
      </RoundedBox>
      {[-0.42, 0, 0.42].map((y, row) => (
        <group key={y} position={[0, y, 0.39]}>
          <RoundedBox args={[1.16, 0.32, 0.055]} radius={0.025} smoothness={2}>
            <meshStandardMaterial color="#20262d" roughness={0.65} />
          </RoundedBox>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[-0.42 + i * 0.28, 0, 0.04]}>
              <boxGeometry args={[0.19, 0.22, 0.035]} />
              <meshStandardMaterial color={["#a85c55", "#5f7f77", "#9a8351", "#697d91"][(i + row) % 4]} roughness={0.86} />
            </mesh>
          ))}
          <mesh position={[0.48, 0, 0.055]}>
            <boxGeometry args={[0.08, 0.06, 0.02]} />
            <meshBasicMaterial color={row === 1 ? mint : "#7d8793"} />
          </mesh>
        </group>
      ))}
      <Float speed={reducedMotion ? 0 : 1.25} floatIntensity={reducedMotion ? 0 : 0.16} rotationIntensity={reducedMotion ? 0 : 0.025}>
        <group position={[0.78, 0.42, 0.24]} rotation={[0.05, -0.32, 0.1]}>
          <RoundedBox args={[0.66, 0.82, 0.035]} radius={0.025} smoothness={2}>
            <meshStandardMaterial color={paper} roughness={0.95} />
          </RoundedBox>
          {[0.22, 0.07, -0.08, -0.23].map((y, i) => (
            <mesh key={y} position={[0, y, 0.022]}>
              <boxGeometry args={[0.42 - i * 0.04, 0.022, 0.01]} />
              <meshBasicMaterial color={i === 0 ? coral : "#77736e"} />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}

export function DatabaseRack({ compact = false }: { compact?: boolean }) {
  const scale = compact ? 0.82 : 1;
  return (
    <group scale={scale}>
      <RoundedBox args={[1.24, 1.48, 0.78]} radius={0.06} smoothness={3}>
        <meshStandardMaterial color="#2b3139" roughness={0.5} metalness={0.28} />
      </RoundedBox>
      {[-0.48, -0.15, 0.18, 0.51].map((y, row) => (
        <group key={y} position={[0, y, 0.42]}>
          <RoundedBox args={[1.05, 0.24, 0.07]} radius={0.025} smoothness={2}>
            <meshStandardMaterial color={row % 2 ? "#3c444f" : "#353c46"} roughness={0.38} metalness={0.34} />
          </RoundedBox>
          <Led position={[-0.4, 0, 0.055]} color={row === 1 ? coral : mint} />
          <Led position={[-0.28, 0, 0.055]} color={cyan} />
          {[0.08, 0.22, 0.36].map((x) => (
            <mesh key={x} position={[x, 0, 0.052]}>
              <boxGeometry args={[0.08, 0.045, 0.015]} />
              <meshStandardMaterial color="#151a20" />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.16, 36]} />
        <meshStandardMaterial color="#4d5661" roughness={0.38} metalness={0.25} />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <torusGeometry args={[0.28, 0.025, 10, 36]} />
        <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

export function ConnectorDock({ active = true, compact = false }: { active?: boolean; compact?: boolean }) {
  const scale = compact ? 0.85 : 1;
  return (
    <group scale={scale}>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.86, 1.0, 0.32, 48]} />
        <meshStandardMaterial color="#303743" roughness={0.42} metalness={0.28} />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.47, 0.58, 48]} />
        <meshStandardMaterial color={active ? coral : softMetal} emissive={active ? coral : dark} emissiveIntensity={active ? 0.7 : 0.1} />
      </mesh>
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 48]} />
        <meshStandardMaterial color="#151b22" roughness={0.35} metalness={0.15} />
      </mesh>
      {[0, Math.PI * 2 / 3, Math.PI * 4 / 3].map((angle, i) => (
        <group key={angle} rotation={[0, angle, 0]}>
          <RoundedBox args={[0.28, 0.16, 0.22]} radius={0.035} smoothness={2} position={[0, 0, 0.78]}>
            <meshStandardMaterial color="#4b5562" roughness={0.48} metalness={0.2} />
          </RoundedBox>
          <Led position={[0, 0.07, 0.91]} color={[cyan, mint, gold][i]} />
        </group>
      ))}
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.48, 18]} />
        <meshStandardMaterial color="#697684" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.13, 18, 18]} />
        <meshStandardMaterial color={coral} emissive={coral} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

export function AgentWorkbench({ accent = violet, compact = false }: { accent?: string; compact?: boolean }) {
  const scale = compact ? 0.82 : 1;
  return (
    <group scale={scale}>
      <RoundedBox args={[2.15, 0.18, 1.18]} radius={0.07} smoothness={3} position={[0, -0.42, 0]}>
        <meshStandardMaterial color="#4b3d34" roughness={0.82} />
      </RoundedBox>
      {[-0.82, 0.82].map((x) => (
        <mesh key={x} position={[x, -0.92, 0]}>
          <boxGeometry args={[0.11, 0.92, 0.92]} />
          <meshStandardMaterial color="#313841" roughness={0.58} metalness={0.2} />
        </mesh>
      ))}
      {[-0.55, 0.55].map((x, i) => (
        <group key={x} position={[x, 0.15, -0.28]} rotation={[0, i === 0 ? 0.16 : -0.16, 0]}>
          <RoundedBox args={[0.92, 0.62, 0.07]} radius={0.045} smoothness={2}>
            <meshStandardMaterial color="#2b3139" roughness={0.38} metalness={0.24} />
          </RoundedBox>
          <mesh position={[0, 0, 0.041]}>
            <planeGeometry args={[0.78, 0.48]} />
            <meshBasicMaterial color={screen} />
          </mesh>
          <mesh position={[0, 0.16, 0.052]}>
            <boxGeometry args={[0.58, 0.025, 0.01]} />
            <meshBasicMaterial color={i === 0 ? cyan : accent} />
          </mesh>
          <mesh position={[-0.12, -0.02, 0.052]}>
            <boxGeometry args={[0.34, 0.022, 0.01]} />
            <meshBasicMaterial color={mint} />
          </mesh>
          <mesh position={[0.08, -0.12, 0.052]}>
            <boxGeometry args={[0.54, 0.022, 0.01]} />
            <meshBasicMaterial color="#7a8794" />
          </mesh>
        </group>
      ))}
      <RoundedBox args={[0.78, 0.04, 0.32]} radius={0.025} smoothness={2} position={[0, -0.27, 0.28]}>
        <meshStandardMaterial color="#252b32" roughness={0.62} />
      </RoundedBox>
      <mesh position={[0.7, -0.22, 0.3]}>
        <cylinderGeometry args={[0.1, 0.12, 0.22, 24]} />
        <meshStandardMaterial color={coral} roughness={0.55} />
      </mesh>
      <Led position={[0.7, -0.08, 0.3]} color={gold} />
    </group>
  );
}

export function WorkflowConsole({ compact = false }: { compact?: boolean }) {
  const scale = compact ? 0.82 : 1;
  return (
    <group scale={scale}>
      <RoundedBox args={[2.2, 0.92, 0.94]} radius={0.11} smoothness={3} rotation={[-0.18, 0, 0]}>
        <meshStandardMaterial color="#303741" roughness={0.46} metalness={0.22} />
      </RoundedBox>
      <mesh position={[0, 0.1, 0.49]} rotation={[-0.18, 0, 0]}>
        <planeGeometry args={[1.86, 0.58]} />
        <meshBasicMaterial color="#10171f" />
      </mesh>
      {[
        [-0.68, 0.18, coral], [-0.25, -0.08, cyan], [0.14, 0.2, mint], [0.56, -0.12, violet], [0.72, 0.22, gold]
      ].map(([x, y, color], i) => (
        <mesh key={i} position={[x as number, y as number, 0.505]}>
          <circleGeometry args={[0.075 + (i % 2) * 0.02, 22]} />
          <meshBasicMaterial color={color as string} />
        </mesh>
      ))}
      {[
        [-0.6, 0.12, -0.25, -0.04], [-0.18, -0.02, 0.08, 0.14], [0.22, 0.15, 0.52, -0.08], [0.58, -0.08, 0.7, 0.18]
      ].map(([x1, y1, x2, y2], i) => {
        const dx = x2 - x1; const dy = y2 - y1; const len = Math.hypot(dx, dy); const angle = Math.atan2(dy, dx);
        return (
          <mesh key={i} position={[(x1 + x2) / 2, (y1 + y2) / 2, 0.502]} rotation={[0, 0, angle]}>
            <planeGeometry args={[len, 0.018]} />
            <meshBasicMaterial color={i === 3 ? coral : "#566574"} />
          </mesh>
        );
      })}
      {[-0.72, -0.38, -0.04, 0.3, 0.64].map((x, i) => (
        <group key={x} position={[x, -0.58, 0.27]}>
          <mesh>
            <cylinderGeometry args={[0.055, 0.055, 0.11, 18]} />
            <meshStandardMaterial color="#1d232a" roughness={0.46} />
          </mesh>
          <Led position={[0, 0.08, 0]} color={[cyan, mint, gold, coral, violet][i]} />
        </group>
      ))}
    </group>
  );
}

export function ModelCore({ reducedMotion = false, compact = false }: { reducedMotion?: boolean; compact?: boolean }) {
  const scale = compact ? 0.85 : 1;
  return (
    <Float speed={reducedMotion ? 0 : 1.05} floatIntensity={reducedMotion ? 0 : 0.12} rotationIntensity={reducedMotion ? 0 : 0.025}>
      <group scale={scale}>
        <mesh>
          <icosahedronGeometry args={[1.1, 3]} />
          <meshPhysicalMaterial color="#1b2530" roughness={0.26} metalness={0.16} clearcoat={0.25} clearcoatRoughness={0.34} />
        </mesh>
        <mesh scale={1.018}>
          <icosahedronGeometry args={[1.1, 2]} />
          <meshBasicMaterial color={cyan} wireframe transparent opacity={0.28} />
        </mesh>
        {[1.38, 1.62].map((r, i) => (
          <mesh key={r} rotation={[Math.PI / 2 + i * 0.58, i * 0.7, 0]}>
            <torusGeometry args={[r, 0.018, 10, 72]} />
            <meshStandardMaterial color={i === 0 ? coral : violet} emissive={i === 0 ? coral : violet} emissiveIntensity={0.45} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}
