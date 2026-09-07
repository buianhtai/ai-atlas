"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useResponsive3D } from "@/components/useResponsive3D";

type StationId = "github" | "drive" | "database";
type Phase = "briefing" | "choose" | "request" | "result";

const stations = [
  { id:"github" as const, name:"GitHub", subtitle:"Code & pull requests", x:-3.1, color:"#b8c8d8" },
  { id:"drive" as const, name:"Drive", subtitle:"Documents & knowledge", x:0, color:"#a9c9ba" },
  { id:"database" as const, name:"Database", subtitle:"Structured data", x:3.1, color:"#e1bf74" }
];

function CameraDirector({ phase, selected, compact, tablet }: { phase: Phase; selected: StationId | null; compact: boolean; tablet: boolean }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const selectedStation = stations.find((item) => item.id === selected);
    const selectedX = selectedStation ? (compact ? (selectedStation.id === "github" ? -2.25 : selectedStation.id === "database" ? 2.25 : 0) : selectedStation.x) : 0;

    if (phase === "briefing") {
      desired.set(0, compact ? 1.15 : 1.35, compact ? 7.1 : tablet ? 7.5 : 7.2);
      target.set(0, compact ? .7 : .85, 0);
    } else if (phase === "choose") {
      desired.set(selectedX * .42, compact ? .35 : .45, compact ? 7.7 : 7.35);
      target.set(selectedX * .5, -.3, 0);
    } else if (phase === "request") {
      desired.set(selectedX * .18, .1, compact ? 8.15 : 7.8);
      target.set(selectedX * .3, -.35, 0);
    } else {
      desired.set(0, compact ? .25 : .3, compact ? 8.7 : 8.2);
      target.set(0, 0, 0);
    }

    camera.position.lerp(desired, .045);
    const currentLook = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    currentLook.lerp(target, .06);
    camera.lookAt(currentLook);
  });

  return null;
}

function Packet({from,to,reverse=false}:{from:[number,number,number];to:[number,number,number];reverse?:boolean}) {
  const ref=useRef<THREE.Mesh>(null);
  const start=useMemo(()=>new THREE.Vector3(...from),[from]);
  const end=useMemo(()=>new THREE.Vector3(...to),[to]);
  useFrame((state)=>{
    if(!ref.current) return;
    const t=(state.clock.elapsedTime*.42)%1;
    const p=reverse?1-t:t;
    ref.current.position.lerpVectors(start,end,p);
    ref.current.position.y+=Math.sin(p*Math.PI)*.48;
  });
  const color=reverse?"#6d9f98":"#de5a4e";
  return <mesh ref={ref}><sphereGeometry args={[.105,20,20]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={.65}/></mesh>;
}

function Rail({from,to,active}:{from:[number,number,number];to:[number,number,number];active:boolean}) {
  const curve=useMemo(()=>{
    const a=new THREE.Vector3(...from);
    const b=new THREE.Vector3(...to);
    const mid=a.clone().lerp(b,.5); mid.y+=.16;
    return new THREE.CatmullRomCurve3([a,mid,b]);
  },[from,to]);
  return <mesh><tubeGeometry args={[curve,32,.026,8,false]}/><meshStandardMaterial color={active?"#de5a4e":"#b9afa5"} roughness={.72}/></mesh>;
}

function Nova({ compact }: { compact: boolean }) {
  const scale = compact ? .88 : 1;
  return <Float speed={1.45} floatIntensity={.18} rotationIntensity={.035}><group position={[0,compact ? 1.28 : 1.45,0]} scale={scale}>
    <RoundedBox args={[1.35,1,.8]} radius={.24} smoothness={4}><meshPhysicalMaterial color="#fffaf2" roughness={.58} metalness={0}/></RoundedBox>
    {[-.31,.31].map(x=><mesh key={x} position={[x,.12,.42]}><sphereGeometry args={[.095,20,20]}/><meshStandardMaterial color="#4b4540"/></mesh>)}
    <mesh position={[0,-.22,.43]} rotation={[0,0,Math.PI/2]}><torusGeometry args={[.16,.03,12,28,Math.PI]}/><meshStandardMaterial color="#de5a4e"/></mesh>
    <mesh position={[0,.72,0]}><cylinderGeometry args={[.025,.025,.25,12]}/><meshStandardMaterial color="#6f665f"/></mesh>
    <mesh position={[0,.88,0]}><sphereGeometry args={[.075,18,18]}/><meshStandardMaterial color="#d5aa52"/></mesh>
    <mesh position={[0,-.58,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.58,36]}/><meshBasicMaterial color="#b9afa5" transparent opacity={.16}/></mesh>
  </group></Float>;
}

function Station({station,selected,onSelect,compact}:{station:(typeof stations)[number];selected:boolean;onSelect:()=>void;compact:boolean}) {
  const compactX = station.id === "github" ? -2.25 : station.id === "database" ? 2.25 : 0;
  const x = compact ? compactX : station.x;
  const scale = compact ? .84 : 1;
  return <group position={[x,compact ? -1.22 : -1.35,0]} scale={scale} onClick={onSelect}>
    <mesh position={[0,-.5,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.02,40]}/><meshStandardMaterial color={selected?"#ead1ca":"#ddd3c8"} roughness={.92}/></mesh>
    <RoundedBox args={[1.78,.96,.9]} radius={.18} smoothness={4} position={[0,-.03,-.035]}><meshStandardMaterial color="#4b4540" roughness={.88}/></RoundedBox>
    <RoundedBox args={[1.66,.84,.82]} radius={.16} smoothness={4}>
      <meshPhysicalMaterial color={station.color} roughness={.72} metalness={0}/>
    </RoundedBox>
    <mesh position={[0,.44,.05]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.24,.025,10,36]}/><meshStandardMaterial color={selected?"#de5a4e":"#8e867e"}/></mesh>
    <Html center position={[0,.03,.47]} transform distanceFactor={7}><button className={`novaStation ${selected?"active":""}`} onClick={onSelect}><strong>{station.name}</strong><span>{station.subtitle}</span></button></Html>
  </group>;
}

function Hub({selected,compact}:{selected:boolean;compact:boolean}) {
  return <group position={[0,compact ? -.02 : 0,0]} scale={compact ? .9 : 1}>
    <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.72,.88,.38,40]}/><meshPhysicalMaterial color="#d8cbbd" roughness={.82} metalness={0}/></mesh>
    <mesh position={[0,.22,0]}><torusGeometry args={[.5,.06,16,48]}/><meshStandardMaterial color={selected?"#de5a4e":"#8f857c"}/></mesh>
    <mesh position={[0,.2,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.37,40]}/><meshStandardMaterial color="#fffaf2" roughness={.85}/></mesh>
    <Html center position={[0,.57,0]} transform distanceFactor={7}><div className="novaHubLabel"><small>COMMON CONNECTION</small><strong>MCP</strong></div></Html>
  </group>;
}

function Scene({selected,phase,onSelect,compact}:{selected:StationId|null;phase:Phase;onSelect:(id:StationId)=>void;compact:boolean}) {
  const station=stations.find(s=>s.id===selected);
  const stationX=(id:StationId)=>compact?(id==="github"?-2.25:id==="database"?2.25:0):(stations.find(s=>s.id===id)?.x??0);
  const selectedX = station ? stationX(station.id) : 0;
  const target=station?[selectedX,compact ? -.86 : -.95,0] as [number,number,number]:null;
  const hubPoint:[number,number,number]=[0,.12,0];
  return <>
    <fog attach="fog" args={["#efe7dc",9,15]}/>
    <ambientLight intensity={2.2}/><directionalLight position={[4,7,5]} intensity={2.4} color="#fff7e8"/><pointLight position={[-4,3,3]} intensity={4.5} color="#efc986"/>
    <Nova compact={compact}/><Hub selected={!!selected} compact={compact}/>
    {stations.map(s=>{
      const x=stationX(s.id);
      const endpoint:[number,number,number]=[x,compact?-.86:-.95,0];
      return <Rail key={`rail-${s.id}`} from={hubPoint} to={endpoint} active={s.id===selected}/>;
    })}
    {stations.map(s=><Station key={s.id} station={s} compact={compact} selected={s.id===selected} onSelect={()=>onSelect(s.id)}/>)}
    {target && (phase==="request"||phase==="result") && <Packet from={hubPoint} to={target}/>}
    {target && phase==="result" && <Packet from={hubPoint} to={target} reverse/>}
    <mesh position={[0,-1.83,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[5.35,64]}/><meshStandardMaterial color="#e5d9cc" roughness={1}/></mesh>
    <mesh position={[0,-1.81,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[3.8,3.86,64]}/><meshBasicMaterial color="#c9bdb1" transparent opacity={.6}/></mesh>
  </>;
}

export function MCPNovaMission() {
  const [phase,setPhase]=useState<Phase>("briefing");
  const [selected,setSelected]=useState<StationId|null>(null);
  const station=useMemo(()=>stations.find(s=>s.id===selected),[selected]);
  const { compact, tablet, dpr } = useResponsive3D();

  function choose(id:StationId){setSelected(id);setPhase("choose");}
  function run(){if(!selected)return;setPhase("request");}

  useEffect(()=>{
    if(phase!=="request") return;
    const timer=window.setTimeout(()=>setPhase("result"),1700);
    return ()=>window.clearTimeout(timer);
  },[phase]);

  const cameraZ = compact ? 8.9 : tablet ? 9.1 : 8.7;

  return <section className="novaMission">
    <div className="novaTopbar"><span className="novaStatus"><i/> VISUAL METAPHOR · NOVA TRAINING</span><span>MISSION 01 · MCP</span></div>
    <div className="novaScene"><Canvas camera={{position:[0,.25,cameraZ],fov:compact ? 48 : 42}} dpr={dpr}><CameraDirector phase={phase} selected={selected} compact={compact} tablet={tablet}/><Scene compact={compact} selected={selected} phase={phase} onSelect={choose}/></Canvas></div>
    <div className="novaPanel">
      <div>
        <span className="novaStep">{phase==="result"?"MISSION COMPLETE":"YOUR MISSION"}</span>
        <h2>{phase==="briefing"?"Nova needs information from the outside world.":phase==="choose"?`Connect Nova to ${station?.name}.`:phase==="request"?"Watch the request travel through the common connection…":"Nova received the result."}</h2>
        <p>{phase==="briefing"?"Choose a system below. The connection station is a metaphor; the real MCP architecture is revealed after the mission.":phase==="choose"?`Instead of inventing a one-off ${station?.name} integration shape, the AI application can use MCP to communicate through a standard protocol.`:phase==="request"?"The application sends a structured request through its MCP connection toward the capability it needs.":"The result travels back and becomes context the AI application can use."}</p>
      </div>
      <div className="novaActions">
        {phase==="briefing" && <span className="novaInstruction">{compact ? "Tap GitHub, Drive, or Database in the scene" : "Select GitHub, Drive, or Database in the scene"}</span>}
        {phase==="choose" && <button className="novaPrimary" onClick={run}>Send request →</button>}
        {phase==="request" && <span className="novaLoading"><i/> Contacting {station?.name}…</span>}
        {phase==="result" && <button className="novaPrimary" onClick={()=>{setSelected(null);setPhase("briefing")}}>Try another system ↻</button>}
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
  </section>;
}
