import React, { FC } from 'react';

interface PrinterIconProps {
  className?: string;
}

export const PrinterIcon: FC<PrinterIconProps> = ({ className }) => (
  <svg width="24" height="24" x="0.5" y="0.5" className={className}>
    <rect x="0" y="0" width="30" height="30" fill="transparent" />
    <g
      fill="rgb(255, 67, 97)"
      strokeWidth="0"
      stroke="none"
      strokeDasharray="none"
    >
      <svg
        preserveAspectRatio="none"
        width="100%"
        viewBox="0 0 24 24"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 8H5c-1.66 0-3 1.34-3 3v4c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2v-4c0-1.66-1.34-3-3-3zm-4 11H9c-.55 0-1-.45-1-1v-4h8v4c0 .55-.45 1-1 1zm4-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2-9H7c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z" />
      </svg>
    </g>
  </svg>
);
