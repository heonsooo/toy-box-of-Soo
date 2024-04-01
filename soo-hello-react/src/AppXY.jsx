import React, { useState } from "react";
import "./AppXY.css";
export default function AppXY() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    console.log("x : ", e.clientX, e.clientY);
  };
  return (
    <div className="container" onPointerMove={handleMouseMove}>
      <div
        className="pointer"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      ></div>
    </div>
  );
}
