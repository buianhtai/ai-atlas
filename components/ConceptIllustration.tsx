type IllustrationProps = { slug: string };

const ink = "#4e4943";
const coral = "#d95d4f";
const paper = "#fffaf2";
const soft = "#eee6dc";

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g stroke={coral} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${x1} ${y1} L ${x2} ${y2}`} />
      <path d={`M ${x2 - 8} ${y2 - 5} L ${x2} ${y2} L ${x2 - 8} ${y2 + 5}`} />
    </g>
  );
}

function Caption({ x, y, children }: { x: number; y: number; children: string }) {
  return <text x={x} y={y} fill={ink} fontSize="15" fontFamily="Arial, sans-serif" textAnchor="middle">{children}</text>;
}

function RagIllustration() {
  return (
    <svg viewBox="0 0 640 360" className="conceptIllustrationSvg" aria-hidden="true">
      <rect x="1" y="1" width="638" height="358" rx="2" fill={paper} />
      <circle cx="86" cy="173" r="34" fill={soft} stroke={ink} strokeWidth="3" />
      <path d="M72 168 q14 -18 28 0" fill="none" stroke={ink} strokeWidth="3" />
      <circle cx="76" cy="159" r="3" fill={ink} /><circle cx="96" cy="159" r="3" fill={ink} />
      <Caption x={86} y={226}>question</Caption>

      <g transform="translate(180 92)" stroke={ink} strokeWidth="3" fill="none">
        <rect x="0" y="0" width="122" height="164" fill="#f5eee4" />
        <line x1="18" y1="28" x2="104" y2="28" /><line x1="18" y1="58" x2="88" y2="58" />
        <line x1="18" y1="88" x2="98" y2="88" /><line x1="18" y1="118" x2="76" y2="118" />
      </g>
      <Caption x={241} y={282}>knowledge library</Caption>

      <g transform="translate(356 117)">
        <rect x="0" y="0" width="104" height="116" rx="6" fill="#fff" stroke={coral} strokeWidth="3" />
        <line x1="18" y1="28" x2="86" y2="28" stroke={ink} strokeWidth="3" />
        <line x1="18" y1="53" x2="76" y2="53" stroke={ink} strokeWidth="3" />
        <line x1="18" y1="78" x2="84" y2="78" stroke={ink} strokeWidth="3" />
      </g>
      <Caption x={408} y={258}>retrieved evidence</Caption>

      <g transform="translate(506 125)" stroke={ink} strokeWidth="3">
        <rect x="0" y="0" width="86" height="96" rx="14" fill={soft} />
        <circle cx="28" cy="38" r="5" fill={ink} /><circle cx="58" cy="38" r="5" fill={ink} />
        <path d="M27 67 q16 12 32 0" fill="none" />
      </g>
      <Caption x={549} y={247}>grounded answer</Caption>
      <Arrow x1={121} y1={173} x2={173} y2={173} />
      <Arrow x1={307} y1={173} x2={348} y2={173} />
      <Arrow x1={465} y1={173} x2={498} y2={173} />
    </svg>
  );
}

function AgentIllustration() {
  return (
    <svg viewBox="0 0 640 360" className="conceptIllustrationSvg" aria-hidden="true">
      <rect x="1" y="1" width="638" height="358" fill={paper} />
      <g transform="translate(60 118)">
        <circle cx="52" cy="52" r="42" fill="#f4ede3" stroke={ink} strokeWidth="3" />
        <circle cx="40" cy="47" r="4" fill={ink} /><circle cx="64" cy="47" r="4" fill={ink} />
        <path d="M39 68 q13 10 26 0" fill="none" stroke={ink} strokeWidth="3" />
      </g>
      <Caption x={112} y={229}>goal</Caption>

      <g transform="translate(236 91)">
        <rect x="0" y="0" width="156" height="174" rx="16" fill="#f3ebe1" stroke={ink} strokeWidth="3" />
        <circle cx="78" cy="53" r="29" fill="#fffaf2" stroke={ink} strokeWidth="3" />
        <path d="M63 53 l12 12 23 -29" fill="none" stroke={coral} strokeWidth="4" />
        <text x="78" y="118" textAnchor="middle" fill={ink} fontSize="17" fontWeight="700" fontFamily="Arial">decide</text>
        <text x="78" y="144" textAnchor="middle" fill={ink} fontSize="15" fontFamily="Arial">act · observe</text>
      </g>

      <g transform="translate(472 104)" stroke={ink} strokeWidth="3" fill="#fffaf2">
        <rect x="0" y="0" width="86" height="48" /><rect x="16" y="74" width="86" height="48" />
        <circle cx="43" cy="24" r="7" fill={coral} stroke="none" /><circle cx="59" cy="98" r="7" fill={coral} stroke="none" />
      </g>
      <Caption x={520} y={250}>tools & world</Caption>
      <Arrow x1={158} y1={170} x2={228} y2={170} />
      <Arrow x1={399} y1={155} x2={463} y2={145} />
      <path d="M511 233 C480 300 330 316 300 273" fill="none" stroke={coral} strokeWidth="3" strokeDasharray="7 8" />
      <path d="M298 273 l-4 13 -9 -9" fill="none" stroke={coral} strokeWidth="3" />
    </svg>
  );
}

function MultiAgentIllustration() {
  const roles = [
    { x: 130, y: 92, label: "Planner" },
    { x: 390, y: 80, label: "Researcher" },
    { x: 442, y: 232, label: "Reviewer" },
    { x: 158, y: 242, label: "Builder" },
  ];
  return (
    <svg viewBox="0 0 640 360" className="conceptIllustrationSvg" aria-hidden="true">
      <rect x="1" y="1" width="638" height="358" fill={paper} />
      <circle cx="320" cy="180" r="58" fill="#f2e9df" stroke={coral} strokeWidth="3" />
      <Caption x={320} y={175}>shared</Caption><Caption x={320} y={196}>task state</Caption>
      {roles.map((role) => (
        <g key={role.label}>
          <circle cx={role.x} cy={role.y} r="38" fill="#fffdf8" stroke={ink} strokeWidth="3" />
          <circle cx={role.x - 10} cy={role.y - 5} r="3.5" fill={ink} />
          <circle cx={role.x + 10} cy={role.y - 5} r="3.5" fill={ink} />
          <path d={`M ${role.x - 10} ${role.y + 11} q 10 8 20 0`} fill="none" stroke={ink} strokeWidth="2.5" />
          <Caption x={role.x} y={role.y + 62}>{role.label}</Caption>
          <line x1={role.x} y1={role.y} x2="320" y2="180" stroke={coral} strokeWidth="2.5" strokeDasharray="6 6" />
        </g>
      ))}
    </svg>
  );
}

function LangChainIllustration() {
  const blocks = [
    { x: 52, label: "Prompt" }, { x: 174, label: "Retriever" }, { x: 316, label: "Model" }, { x: 438, label: "Tool" },
  ];
  return (
    <svg viewBox="0 0 640 360" className="conceptIllustrationSvg" aria-hidden="true">
      <rect x="1" y="1" width="638" height="358" fill={paper} />
      <path d="M42 240 C120 90 490 74 590 226" fill="none" stroke="#d8cec2" strokeWidth="3" />
      {blocks.map((block, index) => (
        <g key={block.label} transform={`translate(${block.x} ${125 + (index % 2) * 35})`}>
          <rect width="112" height="78" rx="8" fill={index === 2 ? "#f7e2df" : "#fffdf8"} stroke={index === 2 ? coral : ink} strokeWidth="3" />
          <text x="56" y="45" textAnchor="middle" fill={ink} fontSize="15" fontWeight="700" fontFamily="Arial">{block.label}</text>
        </g>
      ))}
      <Arrow x1={164} y1={165} x2={170} y2={165} />
      <Arrow x1={286} y1={199} x2={310} y2={199} />
      <Arrow x1={428} y1={165} x2={434} y2={165} />
      <rect x="206" y="276" width="228" height="36" rx="18" fill={soft} stroke={ink} strokeWidth="2" />
      <text x="320" y="299" textAnchor="middle" fill={ink} fontSize="14" fontFamily="Arial">composable application building blocks</text>
    </svg>
  );
}

function LangGraphIllustration() {
  return (
    <svg viewBox="0 0 640 360" className="conceptIllustrationSvg" aria-hidden="true">
      <rect x="1" y="1" width="638" height="358" fill={paper} />
      <g fill="#fffdf8" stroke={ink} strokeWidth="3">
        <rect x="58" y="146" width="98" height="62" rx="8" />
        <rect x="224" y="76" width="112" height="62" rx="8" />
        <rect x="224" y="222" width="112" height="62" rx="8" />
        <rect x="416" y="146" width="126" height="62" rx="8" />
      </g>
      <Caption x={107} y={182}>Start</Caption><Caption x={280} y={112}>Research</Caption><Caption x={280} y={258}>Review</Caption><Caption x={479} y={182}>Finish / act</Caption>
      <Arrow x1={160} y1={171} x2={216} y2={119} />
      <Arrow x1={160} y1={185} x2={216} y2={241} />
      <Arrow x1={341} y1={107} x2={408} y2={162} />
      <Arrow x1={341} y1={253} x2={408} y2={193} />
      <path d="M280 218 C205 200 197 154 276 143" fill="none" stroke={coral} strokeWidth="3" strokeDasharray="7 7" />
      <path d="M274 143 l12 0 -5 11" fill="none" stroke={coral} strokeWidth="3" />
      <rect x="417" y="246" width="124" height="46" rx="6" fill="#f3ebe1" stroke={ink} strokeWidth="2.5" />
      <Caption x={479} y={275}>checkpointed state</Caption>
    </svg>
  );
}

function McpIllustration() {
  return (
    <svg viewBox="0 0 640 360" className="conceptIllustrationSvg" aria-hidden="true">
      <rect x="1" y="1" width="638" height="358" fill={paper} />
      <g transform="translate(62 130)" stroke={ink} strokeWidth="3" fill="#fffdf8">
        <rect width="106" height="88" rx="14" /><circle cx="35" cy="38" r="5" fill={ink} /><circle cx="71" cy="38" r="5" fill={ink} /><path d="M35 62 q18 12 36 0" fill="none" />
      </g>
      <Caption x={115} y={246}>AI application</Caption>
      <g transform="translate(254 126)"><rect width="128" height="96" rx="8" fill="#f7e2df" stroke={coral} strokeWidth="3" /><Caption x={64} y={46}>MCP</Caption><Caption x={64} y={67}>connection</Caption></g>
      <g transform="translate(488 78)" fill="#fffdf8" stroke={ink} strokeWidth="3"><rect width="92" height="54" /><rect y="74" width="92" height="54" /><rect y="148" width="92" height="54" /></g>
      <Caption x={534} y={103}>Code</Caption><Caption x={534} y={177}>Docs</Caption><Caption x={534} y={251}>Data</Caption>
      <Arrow x1={173} y1={174} x2={246} y2={174} /><Arrow x1={390} y1={174} x2={478} y2={174} />
    </svg>
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
