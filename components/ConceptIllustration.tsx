type IllustrationProps = { slug: string };

const ink = "#45413e";
const coral = "#de5a4e";
const coralSoft = "#f5cbc4";
const teal = "#6c9f98";
const tealSoft = "#cfe2dc";
const gold = "#d5aa52";
const goldSoft = "#f4e2b9";
const paper = "#fffdfa";
const gray = "#ece8e3";
const blue = "#718da6";

function Arrow({ d, dashed = false }: { d: string; dashed?: boolean }) {
  return <path d={d} fill="none" stroke={coral} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed ? "7 8" : undefined} markerEnd="url(#arrow)" />;
}

function Defs() {
  return (
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={coral} />
      </marker>
      <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#d8d2cc" />
      </pattern>
    </defs>
  );
}

function Label({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "middle" | "start" | "end" }) {
  return <text x={x} y={y} fill={ink} fontSize="14" fontWeight="700" fontFamily="Arial, sans-serif" textAnchor={anchor}>{children}</text>;
}

function Person({ x, y, shirt = coral, flip = false }: { x: number; y: number; shirt?: string; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) ${flip ? "scale(-1 1)" : ""}`} stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="0" cy="-52" r="20" fill="#f2c7a5" />
      <path d="M-16 -60q14-18 31-2q-3-18-20-18q-16 1-18 17" fill={ink} stroke="none" />
      <path d="M-18 -28q18-13 36 0v50h-36z" fill={shirt} />
      <path d="M-15 22-27 60M14 22l24 34M-17 -17l-28 27M15 -16l29 13" fill="none" />
      <path d="M-30 60h15M34 56h15" fill="none" />
      <circle cx="-7" cy="-54" r="2.5" fill={ink} stroke="none" />
      <circle cx="8" cy="-54" r="2.5" fill={ink} stroke="none" />
      <path d="M-6 -44q7 5 14 0" fill="none" />
    </g>
  );
}

function Bot({ x, y, scale = 1, accent = coral, facing = 1 }: { x: number; y: number; scale?: number; accent?: string; facing?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * facing} ${scale})`} stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M-28 -25h56q13 0 13 13v44q0 13-13 13h-56q-13 0-13-13v-44q0-13 13-13z" fill="#f8f6f2" />
      <path d="M0 -25v-19" /><circle cx="0" cy="-49" r="5" fill={gold} />
      <circle cx="-15" cy="7" r="4" fill={ink} stroke="none" /><circle cx="15" cy="7" r="4" fill={ink} stroke="none" />
      <path d="M-15 24q15 10 30 0" fill="none" stroke={accent} strokeWidth="4" />
      <path d="M-41 -3h-12M41 -3h12M-19 45v16M19 45v16" />
      <path d="M-29 61h20M9 61h20" />
    </g>
  );
}

function Speech({ x, y, w, text, fill = "#fff" }: { x: number; y: number; w: number; text: string; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="48" rx="8" fill={fill} stroke={ink} strokeWidth="2.5" />
      <path d={`M${x + 20} ${y + 48}l8 14 10-14`} fill={fill} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <text x={x + w / 2} y={y + 29} textAnchor="middle" fill={ink} fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700">{text}</text>
    </g>
  );
}

function Frame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <svg viewBox="0 0 720 420" className="conceptIllustrationSvg" role="img" aria-label={title}>
      <Defs />
      <rect width="720" height="420" rx="4" fill={paper} />
      <rect x="14" y="14" width="692" height="392" rx="4" fill="url(#dots)" opacity=".35" />
      <rect x="26" y="26" width="668" height="368" rx="6" fill={paper} stroke="#d8d2cc" strokeWidth="2" />
      {children}
    </svg>
  );
}

function RagIllustration() {
  return (
    <Frame title="RAG illustrated as a research librarian finding evidence before Nova answers">
      <Speech x={40} y={46} w={176} text="What does the policy say?" fill="#fff7ee" />
      <Person x={110} y={264} shirt={blue} />
      <g transform="translate(232 75)" stroke={ink} strokeWidth="3">
        <rect width="166" height="220" rx="4" fill="#f5f1eb" />
        {[0,1,2].map((row)=><g key={row} transform={`translate(18 ${25 + row * 65})`}>
          <line x1="0" y1="38" x2="130" y2="38" />
          {[0,1,2,3].map((book)=><rect key={book} x={book*29} y={book%2?8:0} width="18" height={book%2?30:38} fill={[coralSoft,tealSoft,goldSoft,"#d9e1e8"][book]} />)}
        </g>)}
      </g>
      <Label x={315} y={322}>knowledge library</Label>
      <g transform="translate(422 126) rotate(-5)">
        <rect width="102" height="136" rx="4" fill="#fff" stroke={coral} strokeWidth="4" />
        <circle cx="22" cy="22" r="9" fill={coralSoft} stroke={ink} strokeWidth="2" />
        <line x1="42" y1="20" x2="82" y2="20" stroke={ink} strokeWidth="3" />
        <line x1="18" y1="54" x2="84" y2="54" stroke={ink} strokeWidth="3" />
        <line x1="18" y1="78" x2="72" y2="78" stroke={ink} strokeWidth="3" />
        <line x1="18" y1="102" x2="82" y2="102" stroke={ink} strokeWidth="3" />
      </g>
      <g transform="translate(470 94)"><circle cx="0" cy="0" r="23" fill="none" stroke={ink} strokeWidth="4" /><path d="M16 17l22 22" stroke={ink} strokeWidth="6" strokeLinecap="round" /></g>
      <Label x={475} y={291}>retrieved evidence</Label>
      <Bot x={618} y={226} scale={.95} accent={teal} />
      <Speech x={545} y={55} w={136} text="Answer with this." fill="#eff7f4" />
      <Arrow d="M160 190 C190 164 208 162 229 163" />
      <Arrow d="M400 178 C418 172 423 171 432 169" />
      <Arrow d="M528 185 C557 187 569 191 580 198" />
      <text x="360" y="372" textAnchor="middle" fill={coral} fontFamily="Arial" fontWeight="800" fontSize="13" letterSpacing="2">SEARCH FIRST · ANSWER SECOND</text>
    </Frame>
  );
}

function AgentIllustration() {
  return (
    <Frame title="AI Agent illustrated as Nova working through a task loop with tools">
      <g transform="translate(48 76)">
        <rect width="144" height="92" rx="8" fill="#fff" stroke={ink} strokeWidth="3" />
        <text x="18" y="25" fill={coral} fontFamily="Arial" fontSize="11" fontWeight="800">MISSION</text>
        <text x="18" y="51" fill={ink} fontFamily="Arial" fontSize="14" fontWeight="700">Investigate failed</text>
        <text x="18" y="72" fill={ink} fontFamily="Arial" fontSize="14" fontWeight="700">deployment</text>
      </g>
      <Bot x={328} y={219} scale={1.2} accent={coral} />
      <g transform="translate(501 70)" stroke={ink} strokeWidth="3">
        <rect width="154" height="95" rx="5" fill="#eef4f6" />
        <rect x="18" y="18" width="118" height="14" fill={blue} stroke="none" />
        <line x1="18" y1="52" x2="120" y2="52" /><line x1="18" y1="72" x2="96" y2="72" />
      </g>
      <Label x={578} y={187}>logs</Label>
      <g transform="translate(508 248)" stroke={ink} strokeWidth="3">
        <rect width="132" height="76" rx="5" fill="#f6eee2" />
        <circle cx="34" cy="38" r="15" fill={goldSoft} /><path d="M61 25h52M61 44h43M61 61h34" />
      </g>
      <Label x={574} y={348}>deployment tool</Label>
      <g transform="translate(213 75)">
        <circle cx="0" cy="0" r="31" fill={tealSoft} stroke={ink} strokeWidth="3" />
        <path d="M-12 0l9 10 18-22" fill="none" stroke={teal} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <Label x={0} y={53}>decide</Label>
      </g>
      <Arrow d="M188 119 C224 120 243 130 271 164" />
      <Arrow d="M377 179 C432 141 465 128 496 123" />
      <Arrow d="M381 254 C431 282 463 286 496 286" />
      <Arrow d="M545 334 C495 383 291 379 286 298" dashed />
      <text x="334" y="360" textAnchor="middle" fill={coral} fontFamily="Arial" fontWeight="800" fontSize="13" letterSpacing="2">THINK · ACT · OBSERVE · REPEAT</text>
    </Frame>
  );
}

function MultiAgentIllustration() {
  const roles = [
    { x: 130, y: 118, accent: gold, label: "Planner" },
    { x: 570, y: 118, accent: blue, label: "Researcher" },
    { x: 130, y: 302, accent: teal, label: "Builder" },
    { x: 570, y: 302, accent: coral, label: "Reviewer" },
  ];
  return (
    <Frame title="Multi-agent system illustrated as a team around a shared mission table">
      <g transform="translate(270 119)">
        <rect width="180" height="172" rx="18" fill="#f5f1eb" stroke={ink} strokeWidth="3" />
        <rect x="26" y="29" width="128" height="92" rx="4" fill="#fff" stroke={ink} strokeWidth="2.5" />
        <text x="90" y="53" textAnchor="middle" fill={coral} fontFamily="Arial" fontSize="11" fontWeight="800">SHARED MISSION</text>
        <line x1="44" y1="72" x2="136" y2="72" stroke={ink} strokeWidth="3" /><line x1="44" y1="92" x2="116" y2="92" stroke={ink} strokeWidth="3" />
        <circle cx="90" cy="145" r="11" fill={coralSoft} stroke={ink} strokeWidth="2.5" />
      </g>
      {roles.map((role)=><g key={role.label}>
        <Bot x={role.x} y={role.y} scale={.72} accent={role.accent} />
        <Label x={role.x} y={role.y+67}>{role.label}</Label>
      </g>)}
      <Arrow d="M180 127 C220 132 242 145 268 160" dashed />
      <Arrow d="M520 127 C489 132 470 144 452 158" dashed />
      <Arrow d="M180 289 C220 284 245 270 269 249" dashed />
      <Arrow d="M520 289 C486 283 467 270 451 249" dashed />
      <g transform="translate(315 315)">
        <rect width="90" height="38" rx="19" fill={coral} />
        <text x="45" y="25" textAnchor="middle" fill="#fff" fontFamily="Arial" fontSize="12" fontWeight="800">ORCHESTRATE</text>
      </g>
      <text x="360" y="382" textAnchor="middle" fill={ink} fontFamily="Arial" fontWeight="700" fontSize="13">Specialists help only when coordination is worth the overhead.</text>
    </Frame>
  );
}

function LangChainIllustration() {
  return (
    <Frame title="LangChain illustrated as a workbench of composable AI application parts">
      <Person x={92} y={274} shirt={teal} />
      <Speech x={34} y={48} w={150} text="Snap the pieces together." fill="#eff7f4" />
      <g transform="translate(224 102)">
        <path d="M0 150h396" stroke={ink} strokeWidth="4" />
        {[{x:0,c:goldSoft,t:"Prompt"},{x:102,c:tealSoft,t:"Retriever"},{x:220,c:coralSoft,t:"Model"},{x:324,c:"#dce5ed",t:"Tool"}].map((b,i)=><g key={b.t} transform={`translate(${b.x} ${i%2?34:0})`}>
          <rect width="86" height="78" rx="8" fill={b.c} stroke={ink} strokeWidth="3" />
          <circle cx="18" cy="18" r="6" fill={paper} stroke={ink} strokeWidth="2" /><circle cx="68" cy="60" r="6" fill={paper} stroke={ink} strokeWidth="2" />
          <text x="43" y="46" textAnchor="middle" fill={ink} fontFamily="Arial" fontSize="12" fontWeight="800">{b.t}</text>
        </g>)}
      </g>
      <g transform="translate(289 292)" stroke={ink} strokeWidth="3" fill="#fff">
        <rect width="276" height="52" rx="6" />
        <path d="M22 18h68M22 32h98M158 18h85M158 32h58" />
      </g>
      <Label x={427} y={369}>application logic holds the pieces together</Label>
      <Arrow d="M182 198 C202 198 210 198 223 198" />
      <text x="423" y="67" textAnchor="middle" fill={coral} fontFamily="Arial" fontWeight="800" fontSize="13" letterSpacing="2">COMPOSABLE BUILDING BLOCKS</text>
    </Frame>
  );
}

function LangGraphIllustration() {
  return (
    <Frame title="LangGraph illustrated as a railway where state chooses the next route">
      <g transform="translate(43 76)">
        <rect width="120" height="56" rx="7" fill="#fff" stroke={ink} strokeWidth="3" />
        <text x="60" y="34" textAnchor="middle" fill={ink} fontFamily="Arial" fontSize="13" fontWeight="800">START</text>
      </g>
      <g transform="translate(278 52)"><rect width="135" height="66" rx="7" fill={tealSoft} stroke={ink} strokeWidth="3" /><Label x={67} y={39}>Research</Label></g>
      <g transform="translate(278 262)"><rect width="135" height="66" rx="7" fill={goldSoft} stroke={ink} strokeWidth="3" /><Label x={67} y={39}>Review</Label></g>
      <g transform="translate(541 146)"><rect width="125" height="70" rx="7" fill={coralSoft} stroke={ink} strokeWidth="3" /><Label x={62} y={42}>Act</Label></g>
      <path d="M164 104 C210 103 239 83 277 82M164 108 C213 131 236 278 277 290M414 84 C478 88 506 128 540 164M414 294 C477 288 505 224 540 198" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
      <path d="M346 262 C228 235 226 141 345 118" fill="none" stroke={coral} strokeWidth="4" strokeDasharray="8 8" markerEnd="url(#arrow)" />
      <g transform="translate(430 213)">
        <rect width="92" height="50" rx="5" fill="#fff" stroke={ink} strokeWidth="2.5" />
        <text x="46" y="21" textAnchor="middle" fill={coral} fontFamily="Arial" fontSize="10" fontWeight="800">STATE</text>
        <text x="46" y="38" textAnchor="middle" fill={ink} fontFamily="Arial" fontSize="11" fontWeight="700">checkpoint</text>
      </g>
      <Person x={120} y={307} shirt={blue} />
      <Speech x={40} y={184} w={158} text="Which path next?" fill="#fff7ee" />
      <text x="388" y="374" textAnchor="middle" fill={coral} fontFamily="Arial" fontWeight="800" fontSize="13" letterSpacing="2">BRANCH · LOOP · CHECKPOINT · RESUME</text>
    </Frame>
  );
}

function McpIllustration() {
  return (
    <Frame title="MCP illustrated as a universal connection desk between Nova and external systems">
      <Bot x={102} y={224} scale={1.05} accent={coral} />
      <Speech x={36} y={48} w={170} text="I need the latest PR." fill="#fff7ee" />
      <g transform="translate(264 122)">
        <rect width="176" height="150" rx="18" fill={coralSoft} stroke={ink} strokeWidth="4" />
        <circle cx="88" cy="72" r="42" fill="#fff" stroke={coral} strokeWidth="4" />
        <text x="88" y="68" textAnchor="middle" fill={coral} fontFamily="Arial" fontSize="20" fontWeight="900">MCP</text>
        <text x="88" y="91" textAnchor="middle" fill={ink} fontFamily="Arial" fontSize="11" fontWeight="700">COMMON CONNECTION</text>
        <circle cx="20" cy="74" r="7" fill="#fff" stroke={ink} strokeWidth="3" /><circle cx="156" cy="44" r="7" fill="#fff" stroke={ink} strokeWidth="3" /><circle cx="156" cy="102" r="7" fill="#fff" stroke={ink} strokeWidth="3" />
      </g>
      <g transform="translate(520 50)" stroke={ink} strokeWidth="3">
        <rect width="142" height="82" rx="5" fill="#e5ebef" />
        <rect x="15" y="15" width="112" height="16" fill={blue} stroke="none" /><path d="M18 50h47M76 50h44M18 66h87" />
      </g>
      <Label x={591} y={153}>Git / code</Label>
      <g transform="translate(520 176)" stroke={ink} strokeWidth="3">
        <rect width="142" height="72" rx="5" fill="#f7f0dc" /><path d="M20 18h102M20 36h76M20 54h94" />
      </g>
      <Label x={591} y={270}>documents</Label>
      <g transform="translate(520 298)" stroke={ink} strokeWidth="3">
        <ellipse cx="71" cy="13" rx="53" ry="13" fill={tealSoft} /><path d="M18 13v48c0 8 24 14 53 14s53-6 53-14V13" fill={tealSoft} /><ellipse cx="71" cy="61" rx="53" ry="13" fill="none" />
      </g>
      <Label x={591} y={397}>database</Label>
      <Arrow d="M157 210 C196 199 225 197 257 198" />
      <Arrow d="M443 166 C478 133 491 110 515 95" />
      <Arrow d="M443 201 C480 205 493 208 514 211" />
      <Arrow d="M443 233 C483 266 497 310 516 327" />
      <text x="352" y="329" textAnchor="middle" fill={coral} fontFamily="Arial" fontWeight="800" fontSize="13" letterSpacing="2">ONE PROTOCOL · MANY SYSTEMS</text>
    </Frame>
  );
}

export function ConceptIllustration({ slug }: IllustrationProps) {
  if (slug === "rag") return <RagIllustration />;
  if (slug === "agents") return <AgentIllustration />;
  if (slug === "multi-agent") return <MultiAgentIllustration />;
  if (slug === "langchain") return <LangChainIllustration />;
  if (slug === "langgraph") return <LangGraphIllustration />;
  return <McpIllustration />;
}
