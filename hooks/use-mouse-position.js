import { useState, useEffect, useCallback } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const setMousePositionCallback = useCallback(
    (e) => {
      setMousePosition((prevData) => ({
        ...prevData,
        x: e.clientX,
        y: e.clientY,
      }));
    },
    [setMousePosition]
  );

  useEffect(() => {
    document.addEventListener("mousemove", setMousePositionCallback);
    return () => {
      document.removeEventListener("mousemove", setMousePositionCallback);
    };
  }, [setMousePositionCallback]);

  return mousePosition;
};

export default useMousePosition;
