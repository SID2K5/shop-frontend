import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const timerRef = useRef(null);
  const completeRef = useRef(null);

  useEffect(() => {
    setVisible(true);
    setProgress(0);

    let p = 0;
    timerRef.current = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p > 90) p = 90;
      setProgress(p);
    }, 150);

    completeRef.current = setTimeout(() => {
      clearInterval(timerRef.current);
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }, 600);

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(completeRef.current);
    };
  }, [location.pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, var(--primary), var(--steel-blue))",
          borderRadius: "0 2px 2px 0",
          transition: progress === 0 ? "none" : "width 0.3s ease",
          boxShadow: "0 0 8px var(--primary), 0 0 4px var(--primary)",
        }}
      />
    </div>
  );
}
