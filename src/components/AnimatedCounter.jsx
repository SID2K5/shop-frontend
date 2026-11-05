import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ value, duration = 1200, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  const numericValue = typeof value === "string"
    ? parseFloat(value.replace(/[^0-9.-]/g, "")) || 0
    : value;

  const isFormatted = typeof value === "string" && value.includes(",");
  const hasRupee = typeof value === "string" && value.includes("₹");

  useEffect(() => {
    if (startedRef.current && numericValue === 0) return;
    startedRef.current = true;

    let start = 0;
    const startTime = performance.now();
    const end = numericValue;

    if (end === 0) {
      setDisplay(0);
      return;
    }

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      setDisplay(current);

      if (progress < 1) {
        ref.current = requestAnimationFrame(step);
      } else {
        setDisplay(end);
      }
    };

    ref.current = requestAnimationFrame(step);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [numericValue, duration]);

  const formatted = isFormatted ? display.toLocaleString() : display;
  return <>{hasRupee ? "₹" : prefix}{formatted}{suffix}</>;
}
