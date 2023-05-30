import React, { FC } from 'react';

interface EyeIconProps {
  open?: boolean;
}

export const EyeIcon: FC<EyeIconProps> = ({ open }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {open ? (
        <>
          <circle cx="12" cy="12" r="5" stroke="#FF4261" strokeWidth="2" />
          <path
            d="M1 12C1 12 4.66667 7 12 7C19.3333 7 23 12 23 12"
            stroke="#FF4261"
            strokeWidth="2"
          />
        </>
      ) : (
        <path
          d="M22.1538 12C22.1538 12 21.5633 12.6979 20.3822 13.5107M12 16V20M12 16C10.3618 16 8.92186 15.7657 7.68013 15.4106M12 16C13.6382 16 15.0781 15.7657 16.3199 15.4106M1.84615 12C1.84615 12 2.43314 12.6937 3.6071 13.5033M6.07692 19.2L7.68013 15.4106M17.9231 19.2L16.3199 15.4106M3.6071 13.5033L1 16.8M3.6071 13.5033C4.56994 14.1674 5.92762 14.9094 7.68013 15.4106M20.3822 13.5107L23 16.8M20.3822 13.5107C19.42 14.1728 18.0659 14.9112 16.3199 15.4106"
          stroke="#FF4261"
          strokeWidth="2"
        />
      )}
    </svg>
  );
};
