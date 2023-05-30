import React, { FC } from 'react';

interface BinIconProps {
  className?: string;
}

export const BinIcon: FC<BinIconProps> = ({ className }) => (
  <svg width="24" height="24" x="0.5" y="0.5">
    <rect x="0" y="0" width="24" height="24" fill="transparent" />
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
        className={className}
      >
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" />
      </svg>
    </g>
  </svg>
);
