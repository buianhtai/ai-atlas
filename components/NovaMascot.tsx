type NovaMascotProps = {
  className?: string;
  pose?: "guide" | "think" | "celebrate";
  title?: string;
};

export function NovaMascot({ className = "", pose = "guide", title = "Nova, your AI Atlas guide" }: NovaMascotProps) {
  const leftArm = pose === "celebrate" ? "M31 48 C17 31 10 22 8 12" : pose === "think" ? "M31 49 C18 51 12 62 17 72" : "M31 49 C16 46 9 38 7 29";
  const rightArm = pose === "celebrate" ? "M89 48 C103 31 110 22 112 12" : pose === "think" ? "M89 50 C104 48 110 39 108 28" : "M89 49 C104 46 111 38 113 29";
  const mouth = pose === "think" ? "M47 72 q13 -4 26 0" : "M44 70 q16 14 32 0";

  return (
    <svg viewBox="0 0 120 128" className={`novaMascot ${className}`.trim()} role="img" aria-label={title}>
      <ellipse cx="60" cy="118" rx="29" ry="6" fill="rgba(83,45,41,.16)" />
      <path d={leftArm} fill="none" stroke="#5f302d" strokeWidth="5" strokeLinecap="round" />
      <path d={rightArm} fill="none" stroke="#5f302d" strokeWidth="5" strokeLinecap="round" />
      <circle cx={pose === "celebrate" ? 8 : 7} cy={pose === "celebrate" ? 12 : 29} r="6" fill="#ffd66b" stroke="#5f302d" strokeWidth="4" />
      <circle cx={pose === "celebrate" ? 112 : 113} cy={pose === "celebrate" ? 12 : 29} r="6" fill="#8bc4bb" stroke="#5f302d" strokeWidth="4" />

      <path d="M33 89 C35 106 44 113 60 113 C76 113 85 106 87 89" fill="#f7d6d0" stroke="#5f302d" strokeWidth="5" strokeLinejoin="round" />
      <rect x="24" y="27" width="72" height="65" rx="21" fill="#fffdf8" stroke="#5f302d" strokeWidth="5" />
      <path d="M60 27V14" stroke="#5f302d" strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="9" r="6" fill="#ffd66b" stroke="#5f302d" strokeWidth="4" />
      <path d="M31 43 q-9-8-16-1" fill="none" stroke="#5f302d" strokeWidth="4" strokeLinecap="round" />
      <path d="M89 43 q9-8 16-1" fill="none" stroke="#5f302d" strokeWidth="4" strokeLinecap="round" />
      <circle cx="45" cy="56" r="5" fill="#5f302d" />
      <circle cx="75" cy="56" r="5" fill="#5f302d" />
      {pose === "think" && <circle cx="92" cy="18" r="3" fill="#8bc4bb" />}
      {pose === "think" && <circle cx="103" cy="10" r="5" fill="#8bc4bb" />}
      <path d={mouth} fill="none" stroke="#df6558" strokeWidth="5" strokeLinecap="round" />
      <circle cx="34" cy="67" r="4" fill="#f4b9b0" opacity=".75" />
      <circle cx="86" cy="67" r="4" fill="#f4b9b0" opacity=".75" />
      <path d="M45 92v12 M75 92v12" stroke="#5f302d" strokeWidth="5" strokeLinecap="round" />
      <path d="M37 108h14 M69 108h14" stroke="#5f302d" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
