import React, { FC, useEffect, useRef } from 'react';
import { draw } from './utils';

export interface PieChartProps {
  size: number;
  lineWidth: number;
  colors: Array<string>;
  data: Array<number>;
}

export const PieChart: FC<PieChartProps> = ({
  size,
  lineWidth,
  colors,
  data,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        draw(ctx, size, data, colors, lineWidth);
      }
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, size, size);
        draw(ctx, size, data, colors, lineWidth);
      }
    }
  }, [data]);

  return (
    <div>
      <canvas height={size} ref={canvasRef} width={size} />
    </div>
  );
};
