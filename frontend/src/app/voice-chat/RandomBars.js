import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rows = 10;
const cols = 10;

const Grid = ({ start }) => {
  const heights = useMemo(
    () => Array.from({ length: cols }, () => 3 + Math.floor(Math.random() * 4)),
    [start]
  );

  const [step, setStep] = useState(0);
  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(false))
  );

  useEffect(() => {
    if (!start) return;
    setStep(0);
    setGrid(Array.from({ length: rows }, () => Array(cols).fill(false)));
    const maxHeight = Math.max(...heights);
    const id = setInterval(() => {
      setStep((s) => {
        const next = s + 1;
        setGrid((prev) => {
          const g = prev.map((r) => [...r]);
          heights.forEach((h, c) => {
            for (let r = 0; r < Math.min(next, h); r++) {
              g[rows - 1 - r][c] = true;
            }
          });
          return g;
        });
        if (next >= maxHeight) clearInterval(id);
        return next;
      });
    }, 10);
    return () => clearInterval(id);
  }, [start, heights]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 20px)`,
        gridTemplateRows: `repeat(${rows}, 20px)`,
        gap: "2px",
      }}
    >
      {grid.flatMap((filled, idx) => (
        <motion.div
          key={idx}
          layout
          style={{
            width: 20,
            height: 20,
            backgroundColor: filled ? "white" : "transparent",
            border: "1px solid #444",
          }}
          transition={{ layout: { duration: 0.1 } }}
        />
      ))}
    </div>
  );
};

export default Grid;
