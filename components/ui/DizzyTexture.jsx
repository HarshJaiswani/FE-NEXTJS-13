import React from "react";

const DizzyTexture = () => (
  <svg
    id="texture"
    style={{ filter: "contrast(30%) brightness(40%)" }}
    className="absolute left-0 top-0 h-full w-full opacity-20"
  >
    <filter id="noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency=".8"
        numOctaves="4"
        stitchTiles="stitch"
      ></feTurbulence>
      <feColorMatrix type="saturate" values="0"></feColorMatrix>
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)"></rect>
  </svg>
);

export default DizzyTexture;
