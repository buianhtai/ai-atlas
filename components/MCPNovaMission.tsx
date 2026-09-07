"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, RoundedBox } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useResponsive3D } from "@/components/useResponsive3D";

type StationId = "github" | "drive" | "database";
type Phase = "briefing" | "choose" | "request" | "result";

const stations = [
  { id:"github" as const, name:"GitHub", subtitle:"Code & pull requests", x:-3.1, color:"#8fa8ff" },
  { id:"drive" as const, name:"Drive", subtitle:"Documents & knowledge", x:0, color:"#74ddb0" },
  { id:"database" as const, name:"Database", subtitle:"Structured data", x:3.1, color:"#f1c866" }
];

function Packet({from,to,reverse=false}:{from:[number,number,number];to:[number,number,number];reverse?:boolean}) {
  const ref=useRef<THREE.Mesh>(null);
  useFrame((state)=>{
    if(!ref.current) return;
    const t=(state.clock.elapsedTime*.42)%1;
    const p=reverse?1-t:t;
    ref.current.position.lerpVectors(new THREE.Vector3(...from),new THREE.Vector3(...to),p);
    ref.current.position.y+=Math.sin(p*Math.PI)*.5;
  });
  return <mesh ref={ref}><sphereGeometry args={[.11,20,20]}/><meshStandardMaterial color={reverse?"#9dffcf":"#77e9ff"} emissive={reverse?"#9dffcf":"#77e9ff"} emissiveIntensity={2.5}/></mesh>;
}

function Nova({ compact }: { compact: boolean }) {
  const scale = compact ? .88 : 1;
  return <Float speed={1.7} floatIntensity={.25} rotationIntensity={.06}><group position={[0,compact ? 1.28 : 1.45,0]} scale={scale}>
    <RoundedBox args={[1.35,1,.8]} radius={.24} smoothness={4}><meshPhysicalMaterial color="#eef6ff" roughness={.22} metalness={.08}/></RoundedBox>
    {[-.31,.31].map(x=><mesh key={x} position={[x,.12,.42]}><sphereGeometry args={[.095,20,20]}/><meshStandardMaterial color="#12243c" emissive="#67e9ff" emissiveIntensity={.3}/></mesh>)}
    <mesh position={[0,-.22,.43]} rotation={[0,0,Math.PI/2]}><torusGeometry args={[.16,.03,12,28,Math.PI]}/><meshStandardMaterial color="#5ce7f7"/></mesh>
    <mesh position={[0,.72,0]}><cylinderGeometry args={[.025,.025,.25,12]}/><meshStandardMaterial color="#b9c9db"/></mesh>
    <mesh position={[0,.88,0]}><sphereGeometry args={[.075,18,18]}/><meshStandardMaterial color="#ffd86e" emissive="#ffd86e" emissiveIntensity={1.5}/></mesh>
  </group></Float>;
}

function Station({station,selected,onSelect,compact}:{station:(typeof stations)[number];selected:boolean;onSelect:()=>void;compact:boolean}) {
  const compactX = station.id === "github" ? -2.25 : station.id === "database" ? 2.25 : 0;
  const x = compact ? compactX : station.x;
  const scale = compact ? .84 : 1;
  return <group position={[x,compact ? -1.22 : -1.35,0]} scale={scale} onClick={onSelect}>
    <RoundedBox args={[1.7,.88,.85]} radius={.18} smoothness={4}>
      <meshPhysicalMaterial color={station.color} roughness={.3} metalness={.08} emissive={station.color} emissiveIntensity={selected?.2:.03}/>
    </RoundedBox>
    <Html center position={[0,.03,.47]} transform distanceFactor={7}><button className={`novaStation ${selected?"active":""}`} onClick={onSelect}><strong>{station.name}</strong><span>{station.subtitle}</span></button></Html>
  </group>;
}

function Hub({selected,compact}:{selected:boolean;compact:boolean}) {
  return <group position={[0,compact ? -.02 : 0,0]} scale={compact ? .9 : 1}>
    <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.68,.85,.42,40]}/><meshPhysicalMaterial color="#182e4a" roughness={.24} metalness={.35}/></mesh>
    <mesh position={[0,.23,0]}><torusGeometry args={[.5,.055,16,48]}/><meshStandardMaterial color={selected?"#73efff":"#42647d"} emissive={selected?"#73efff":"#20384a"} emissiveIntensity={selected?2:.3}/></mesh>
    <Html center position={[0,.55,0]} transform distanceFactor={7}><div className="novaHubLabel"><small>PROTOCOL LAYER</small><strong>MCP</strong></div></Html>
  </group>;
}

function Scene({selected,phase,onSelect,compact}:{selected:StationId|null;phase:Phase;onSelect:(id:StationId)=>void;compact:boolean}) {
  const station=stations.find(s=>s.id===selected);
  const selectedX = station ? (compact ? (station.id === "github" ? -2.25 : station.id === "database" ? 2.25 : 0) : station.x) : 0;
  const target=station?[selectedX,compact ? -.86 : -.95,0] as [number,number,number]:null;
  return <>
    <fog attach="fog" args={["#081322",8,15]}/>
    <ambientLight intensity={1.2}/><directionalLight position={[4,6,5]} intensity={2.7}/><pointLight position={[0,2,2]} intensity={18} color="#58e6ff"/>
    <Nova compact={compact}/><Hub selected={!!selected} compact={compact}/>
    {stations.map(s=><Station key={s.id} station={s} compact={compact} selected={s.id===selected} onSelect={()=>onSelect(s.id)}/>)}
    {target && (phase==="request"||phase==="result") && <Packet from={[0,.15,0]} to={target}/>}
    {target && phase==="result" && <Packet from={[0,.15,0]} to={target} reverse/>}
    <mesh position={[0,-1.82,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[5.2,64]}/><meshStandardMaterial color="#0d1d30" roughness={.9}/></mesh>
  </>;
}

export function MCPNovaMission() {
  const [phase,setPhase]=useState<Phase>("briefing");
  const [selected,setSelected]=useState<StationId|null>(null);
  const station=useMemo(()=>stations.find(s=>s.id===selected),[selected]);
  const { compact, tablet, dpr } = useResponsive3D();

  function choose(id:StationId){setSelected(id);setPhase("choose");}
  function run(){if(!selected)return;setPhase("request");window.setTimeout(()=>setPhase("result"),1700);}

  const cameraZ = compact ? 8.9 : tablet ? 9.1 : 8.7;

  return <section className="novaMission">
    <div className="novaTopbar"><span className="novaStatus"><i/> NOVA TRAINING SIMULATION</span><span>MISSION 01 · MCP</span></div>
    <div className="novaScene"><Canvas camera={{position:[0,.25,cameraZ],fov:compact ? 48 : 42}} dpr={dpr}><Scene compact={compact} selected={selected} phase={phase} onSelect={choose}/></Canvas></div>
    <div className="novaPanel">
      <div>
        <span className="novaStep">{phase==="result"?"MISSION COMPLETE":"YOUR MISSION"}</span>
        <h2>{phase==="briefing"?"Nova needs information from the outside world.":phase==="choose"?`Connect Nova to ${station?.name}.`:phase==="request"?"Watch the request travel through MCP…":"Nova received the result."}</h2>
        <p>{phase==="briefing"?"Choose a system below. You’ll see why MCP exists before learning the terminology.":phase==="choose"?`Instead of teaching Nova a custom ${station?.name} integration, MCP gives the AI application a common way to discover and use it.`:phase==="request"?"The AI application sends a structured tool request through the MCP connection.":"The tool result returns through the same connection and becomes context Nova can use."}</p>
      </div>
      <div className="novaActions">
        {phase==="briefing" && <span className="novaInstruction">{compact ? "Tap GitHub, Drive, or Database in the scene" : "Select GitHub, Drive, or Database in the scene"}</span>}
        {phase==="choose" && <button className="novaPrimary" onClick={run}>Send request →</button>}
        {phase==="request" && <span className="novaLoading"><i/> Contacting {station?.name}…</span>}
        {phase==="result" && <button className="novaPrimary" onClick={()=>{setSelected(null);setPhase("briefing")}}>Try another system ↻</button>}
      </div>
    </div>
    <div className="novaReveal"><span>What just happened?</span><strong>Nova didn’t learn GitHub, Drive, or databases individually. MCP gave the AI app a standard connection layer.</strong></div>
    <div className="novaArchitecture">
      <div className="novaArchitectureHead">
        <span>Architecture reveal</span>
        <strong>The cartoon metaphor maps to a real MCP system.</strong>
      </div>
      <div className="novaArchitectureFlow">
        <div><small>AI application</small><strong>Nova</strong></div>
        <i>→</i>
        <div><small>Connection</small><strong>MCP Client</strong></div>
        <i>→</i>
        <div className="accent"><small>Protocol boundary</small><strong>MCP Server</strong></div>
        <i>→</i>
        <div><small>Capability</small><strong>Tool / Resource</strong></div>
      </div>
    </div>
  </section>;
}
