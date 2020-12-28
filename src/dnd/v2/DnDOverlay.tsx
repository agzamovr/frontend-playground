import React from "react";

export const DnDOverlay = () => (
  <div
    style={{
      position: "fixed",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "0px",
      zIndex: 9999,
      pointerEvents: "none",
      overflow: "hidden",
    }}
  >
    <div
      id="global-overlay"
      style={{
        position: "relative",
        zIndex: 0,
        pointerEvents: "auto",
      }}
    ></div>
  </div>
);
