const ink = "#45413e";
const coral = "#de5a4e";
const coralSoft = "#f4c9c2";
const teal = "#6c9f98";
const tealSoft = "#cee0da";
const gold = "#d4aa55";
const goldSoft = "#f3e0b7";
const blue = "#748da3";
const paper = "#fffdfa";

function Bot({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="-34" y="-32" width="68" height="66" rx="17" fill="#faf7f2" />
      <path d="M0-32v-18" /><circle cx="0" cy="-55" r="5" fill={gold} />
      <circle cx="-13" cy="0" r="4" fill={ink} stroke="none" /><circle cx="13" cy="0" r="4" fill={ink} stroke="none" />
      <path d="M-13 17q13 9 26 0" fill="none" stroke={coral} strokeWidth="4" />
      <path d="M-34-3h-12M34-3h12M-18 34v16M18 34v16M-27 50h18M9 50h18" />
    </g>
  );
}

function Person({ x, y, shirt }: { x: number; y: number; shirt: string }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={ink} strokeWidth="2.6" strokeLinecap="round">
      <circle cx="0" cy="-31" r="14" fill="#f2c6a3" />
      <path d="M-12-37q10-13 24-2q-1-13-13-14q-12 0-15 12" fill={ink} stroke="none" />
      <path d="M-14-11q14-9 28 0v34h-28z" fill={shirt} />
      <path d="M-11 23-20 52M10 23l20 26M-12-3l-19 17M12-2l20 8" fill="none" />
    </g>
  );
}

function Sign({ x, y, label, accent }: { x: number; y: number; label: string; accent: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-52" y="-21" width="104" height="42" rx="5" fill="#fff" stroke={ink} strokeWidth="2.5" />
      <rect x="-52" y="-21" width="8" height="42" fill={accent} stroke="none" />
      <text x="6" y="5" textAnchor="middle" fill={ink} fontFamily="Arial" fontSize="12" fontWeight="800">{label}</text>
    </g>
  );
}

export function AtlasOverviewIllustration() {
  return (
    <svg viewBox="0 0 820 520" className="atlasOverviewSvg" role="img" aria-label="Original illustrated AI Atlas workshop with Nova, knowledge, tools, agents, and workflows">
      <defs>
        <pattern id="overviewDots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#dad5cf" /></pattern>
      </defs>
      <rect width="820" height="520" fill={paper} />
      <rect x="10" y="10" width="800" height="500" rx="8" fill="url(#overviewDots)" opacity=".42" />

      {/* skyline / workshop roof */}
      <path d="M60 434V116h700v318" fill="#fbf8f3" stroke={ink} strokeWidth="4" />
      <path d="M60 116 214 48l143 63 128-75 275 80" fill="#f0e9e1" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M357 111v323M542 112v322" stroke="#d7d1cb" strokeWidth="3" />
      <path d="M60 434h700" stroke={ink} strokeWidth="4" />

      {/* Knowledge room */}
      <Sign x={181} y={134} label="KNOWLEDGE" accent={gold} />
      <g transform="translate(102 170)" stroke={ink} strokeWidth="2.7">
        <rect width="164" height="154" rx="4" fill="#fff" />
        {[0,1,2].map(row => <g key={row} transform={`translate(16 ${23+row*45})`}>
          <line x1="0" y1="29" x2="132" y2="29" />
          {[0,1,2,3].map(i => <rect key={i} x={i*28} y={i%2?7:0} width="17" height={i%2?22:29} fill={[goldSoft,coralSoft,tealSoft,"#dce4ea"][i]} />)}
        </g>)}
      </g>
      <Person x={133} y={390} shirt={blue} />
      <path d="M154 357c33-26 52-32 84-27" fill="none" stroke={coral} strokeWidth="3.5" strokeDasharray="7 7" />
      <text x="184" y="344" textAnchor="middle" fill={coral} fontFamily="Arial" fontSize="11" fontWeight="800">RAG FINDS EVIDENCE</text>

      {/* Nova center */}
      <Sign x={450} y={134} label="MODEL + AGENT" accent={coral} />
      <Bot x={450} y={255} scale={1.35} />
      <g transform="translate(376 350)">
        <rect width="148" height="48" rx="6" fill="#fff" stroke={ink} strokeWidth="2.8" />
        <text x="74" y="20" textAnchor="middle" fill={coral} fontFamily="Arial" fontSize="10" fontWeight="900">NOVA'S WORKBENCH</text>
        <text x="74" y="36" textAnchor="middle" fill={ink} fontFamily="Arial" fontSize="11" fontWeight="700">reason · choose · act</text>
      </g>
      <path d="M300 257c50-28 76-29 97-18" fill="none" stroke={coral} strokeWidth="4" markerEnd="url(#none)" />

      {/* Tools room */}
      <Sign x={648} y={134} label="TOOLS + DATA" accent={teal} />
      <g transform="translate(580 173)" stroke={ink} strokeWidth="2.7">
        <rect width="138" height="72" rx="5" fill="#e5ebef" /><rect x="15" y="14" width="108" height="13" fill={blue} stroke="none" /><path d="M16 44h49M76 44h43M16 59h91" />
        <rect y="94" width="138" height="64" rx="5" fill="#f6edd8" /><path d="M16 112h106M16 130h78M16 147h96" />
        <ellipse cx="69" cy="190" rx="49" ry="12" fill={tealSoft} /><path d="M20 190v38c0 8 22 13 49 13s49-5 49-13v-38" fill={tealSoft} /><ellipse cx="69" cy="228" rx="49" ry="12" fill="none" />
      </g>
      <Person x={700} y={392} shirt={teal} />
      <path d="M542 257c33-25 53-32 79-31" fill="none" stroke={coral} strokeWidth="3.5" strokeDasharray="7 7" />
      <text x="648" y="335" textAnchor="middle" fill={coral} fontFamily="Arial" fontSize="11" fontWeight="800">MCP CONNECTS SYSTEMS</text>

      {/* lower orchestration strip */}
      <g transform="translate(276 432)">
        <circle cx="0" cy="0" r="18" fill={goldSoft} stroke={ink} strokeWidth="2.5" /><circle cx="55" cy="0" r="18" fill={tealSoft} stroke={ink} strokeWidth="2.5" /><circle cx="110" cy="0" r="18" fill={coralSoft} stroke={ink} strokeWidth="2.5" />
        <path d="M18 0h19M73 0h19" stroke={ink} strokeWidth="3" />
        <text x="55" y="39" textAnchor="middle" fill={ink} fontFamily="Arial" fontSize="11" fontWeight="700">multi-agent team</text>
      </g>
      <g transform="translate(510 426)" stroke={ink} strokeWidth="2.6" fill="#fff">
        <circle cx="0" cy="5" r="10" /><circle cx="52" cy="-10" r="10" /><circle cx="52" cy="25" r="10" /><circle cx="105" cy="5" r="10" />
        <path d="M10 3 42-7M10 8 42 22M62-8 95 2M62 23 95 8" fill="none" />
        <path d="M52 15C24 15 25-4 42-7" fill="none" stroke={coral} strokeDasharray="5 5" />
        <text x="53" y="55" textAnchor="middle" fill={ink} fontFamily="Arial" fontSize="11" fontWeight="700" stroke="none">stateful workflow</text>
      </g>

      {/* visual callouts */}
      <g transform="translate(315 74)"><rect width="178" height="44" rx="22" fill={coral} /><text x="89" y="28" textAnchor="middle" fill="#fff" fontFamily="Arial" fontSize="12" fontWeight="900" letterSpacing="1.5">THE AI SYSTEMS WORKSHOP</text></g>
      <text x="410" y="494" textAnchor="middle" fill="#817b76" fontFamily="Arial" fontSize="12">Knowledge supplies context · models reason · tools act · workflows coordinate.</text>
    </svg>
  );
}
