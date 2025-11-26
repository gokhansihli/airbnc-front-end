import React from "react";

export default function LogoIcon() {
  return (
    <div>
      <svg
        className="logo"
        width="300"
        height="100"
        viewBox="0 0 300 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M45 15 L55 15 L82 75 L82 85 L70 85 L50 40 L30 85 L18 85 L18 75 L45 15 Z"
          fill="#c1111f"
        />

        <text
          x="95"
          y="85"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="bold"
          fontSize="65"
          fill="#c1111f"
        >
          irbnc
        </text>
      </svg>
    </div>
  );
}
