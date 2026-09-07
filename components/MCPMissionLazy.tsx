"use client";

import dynamic from "next/dynamic";

const MCPNovaMission = dynamic(
  () => import("@/components/MCPNovaMission").then((mod) => mod.MCPNovaMission),
  {
    ssr: false,
    loading: () => (
      <div className="missionLoading" role="status" aria-live="polite">
        <div className="missionLoadingScene" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div>
          <strong>Preparing Nova’s interactive mission…</strong>
          <small>The illustrated lesson remains available while the 3D scene loads.</small>
        </div>
      </div>
    ),
  },
);

export function MCPMissionLazy() {
  return <MCPNovaMission />;
}
