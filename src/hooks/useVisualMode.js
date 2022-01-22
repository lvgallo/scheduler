import React, { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (mode, replace = false) => {
    setHistory(prev => {
      if (!replace) {
        history.push(mode);
      }
      setMode(mode);
      return prev;
    })
  };

  function back() {
    setHistory(prev => {
      if (prev.length >= 2) {
        prev.pop();
        setMode(prev[prev.length - 1]);
      }
      return prev;
    })
  };

  return { mode, transition, back };
}