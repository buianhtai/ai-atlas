"use client";

import { useEffect, useState } from "react";

type Responsive3DState = {
  compact: boolean;
  tablet: boolean;
  reducedMotion: boolean;
  dpr: [number, number];
};

export function useResponsive3D() {
  const [state, setState] = useState<Responsive3DState>({
    compact: false,
    tablet: false,
    reducedMotion: false,
    dpr: [1, 1.6],
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      const width = window.innerWidth;
      const compact = width <= 767;
      const tablet = width <= 1024;
      const reducedMotion = motionQuery.matches;

      setState({
        compact,
        tablet,
        reducedMotion,
        dpr: compact ? [1, 1.15] : tablet ? [1, 1.35] : [1, 1.6],
      });
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    motionQuery.addEventListener("change", update);

    return () => {
      window.removeEventListener("resize", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return state;
}
