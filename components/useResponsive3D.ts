"use client";

import { useEffect, useState } from "react";

export function useResponsive3D() {
  const [state, setState] = useState({
    compact: false,
    tablet: false,
    dpr: [1, 1.6] as [number, number],
  });

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const compact = width <= 767;
      const tablet = width <= 1024;

      setState({
        compact,
        tablet,
        dpr: compact ? [1, 1.15] : tablet ? [1, 1.35] : [1, 1.6],
      });
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return state;
}
