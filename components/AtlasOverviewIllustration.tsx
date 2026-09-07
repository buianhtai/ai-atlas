const ink = "#4e4943";
const coral = "#d95d4f";
const paper = "#fffaf2";
const soft = "#eee6dc";

function Label({ x, y, children }: { x: number; y: number; children: string }) {
  return <text x={x} y={y} textAnchor="middle" fill={ink} fontFamily="Arial, sans-serif" fontSize="13">{children}</text>;
}

export function AtlasOverviewIllustration() {
  return (
    <svg viewBox="0 0 760 500" className="atlasOverviewSvg" role="img" aria-label="Illustrated map of AI models, knowledge, tools, agents, and workflows">
      <rect x="1" y="1" width="758" height="498" fill={paper} />
      <path d="M70 417 H690" stroke={ink} strokeWidth="3" />
      <path d="M120 417 V114 H640 V417" stroke={ink} strokeWidth="3" fill="none" />
      <path d="M120 114 L380 42 L640 114" stroke={ink} strokeWidth="3" fill="none" />

      {/* central Nova / model */}
      <g transform="translate(314 182)">
        <rect x="0" y="0" width="132" height="112" rx="18" fill={soft} stroke={ink} strokeWidth="3" />
        <circle cx="43" cy="48" r="5" fill={ink} /><circle cx="89" cy="48" r="5" fill={ink} />
        <path d="M43 75 q23 18 46 0" fill="none" stroke={coral} strokeWidth="4" />
        <path d="M66 0 V-22" stroke={ink} strokeWidth="3" /><circle cx="66" cy="-28" r="6" fill={coral} />
        <Label x={66} y={138}>model / Nova</Label>
      </g>

      {/* knowledge library */}
      <g transform="translate(146 162)" stroke={ink} strokeWidth="3">
        <rect x="0" y="0" width="112" height="136" fill="#fffdf8" />
        <line x1="18" y1="34" x2="94" y2="34" /><line x1="18" y1="68" x2="94" y2="68" /><line x1="18" y1="102" x2="94" y2="102" />
        <rect x="23" y="14" width="14" height="20" fill="#f7e3df" /><rect x="49" y="13" width="16" height="21" fill="#fffaf2" />
        <rect x="28" y="48" width="18" height="20" fill="#fffaf2" /><rect x="60" y="47" width="13" height="21" fill="#f7e3df" />
        <rect x="20" y="82" width="16" height="20" fill="#fffaf2" /><rect x="50" y="82" width="22" height="20" fill="#f7e3df" />
      </g>
      <Label x={202} y={322}>knowledge / RAG</Label>

      {/* tool bench */}
      <g transform="translate(501 165)" stroke={ink} strokeWidth="3" fill="#fffdf8">
        <rect x="0" y="0" width="110" height="64" />
        <rect x="15" y="82" width="80" height="54" />
        <circle cx="32" cy="32" r="10" fill="#f7e3df" /><path d="M57 20 h34 v24 H57z" fill="#fffaf2" />
        <path d="M31 93 v28 M24 100 h14 M67 94 h17 v17 H67z" fill="none" />
      </g>
      <Label x={556} y={325}>tools / MCP</Label>

      {/* agent team */}
      <g transform="translate(158 350)" stroke={ink} strokeWidth="3" fill="#fffdf8">
        <circle cx="18" cy="20" r="16" /><circle cx="62" cy="20" r="16" /><circle cx="106" cy="20" r="16" />
        <path d="M0 60 q18 -28 36 0 M44 60 q18 -28 36 0 M88 60 q18 -28 36 0" fill="none" />
      </g>
      <Label x={220} y={442}>agent team</Label>

      {/* graph workflow */}
      <g transform="translate(470 345)" fill="#fffdf8" stroke={ink} strokeWidth="3">
        <circle cx="10" cy="24" r="10" /><circle cx="72" cy="0" r="10" /><circle cx="72" cy="52" r="10" /><circle cx="138" cy="26" r="10" />
        <path d="M20 20 L62 4 M20 28 L62 48 M82 4 L128 22 M82 48 L128 30" fill="none" />
        <path d="M72 42 C38 42 38 9 62 7" fill="none" stroke={coral} strokeDasharray="6 5" />
      </g>
      <Label x={549} y={442}>stateful workflow</Label>

      {/* relationships */}
      <path d="M258 230 C280 220 292 220 314 226" fill="none" stroke={coral} strokeWidth="3" />
      <path d="M446 226 C470 218 484 217 501 220" fill="none" stroke={coral} strokeWidth="3" />
      <path d="M346 295 C319 327 286 345 267 358" fill="none" stroke={coral} strokeWidth="3" strokeDasharray="7 7" />
      <path d="M411 295 C440 324 470 344 493 356" fill="none" stroke={coral} strokeWidth="3" strokeDasharray="7 7" />

      {/* small explanatory characters */}
      <g transform="translate(83 330)" stroke={ink} strokeWidth="2.5" fill="none">
        <circle cx="18" cy="18" r="12" fill="#fffdf8" /><path d="M18 30 v37 M18 44 l-15 17 M18 44 l17 10 M18 67 l-12 22 M18 67 l15 22" />
        <path d="M42 9 h58 v34 H42z" fill="#fffdf8" /><path d="M50 20 h42 M50 29 h30" />
      </g>
      <g transform="translate(625 330)" stroke={ink} strokeWidth="2.5" fill="none">
        <circle cx="18" cy="18" r="12" fill="#fffdf8" /><path d="M18 30 v37 M18 44 l-15 17 M18 44 l17 10 M18 67 l-12 22 M18 67 l15 22" />
        <circle cx="50" cy="53" r="18" fill="#f7e3df" /><path d="M50 39 v28 M36 53 h28" />
      </g>

      <text x="380" y="88" textAnchor="middle" fill={coral} fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" letterSpacing="2">THE AI SYSTEMS WORKSHOP</text>
    </svg>
  );
}
