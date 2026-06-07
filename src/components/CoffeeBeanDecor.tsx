import React, { useMemo } from 'react';

interface Bean {
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
}

interface Props {
  count?: number;
}

export default function CoffeeBeanDecor({ count = 8 }: Props) {
  const beans = useMemo<Bean[]>(() => {
    const arr: Bean[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 40,
        rotation: Math.random() * 360,
        opacity: 0.04 + Math.random() * 0.08,
      });
    }
    return arr;
  }, [count]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {beans.map((bean, i) => (
          <g
            key={i}
            transform={`translate(${bean.x}%, ${bean.y}%) rotate(${bean.rotation})`}
          >
            {/* Coffee bean outer ellipse */}
            <ellipse
              cx="0"
              cy="0"
              rx={bean.size / 2}
              ry={bean.size * 0.7}
              fill="#C9A227"
              opacity={bean.opacity}
            />
            {/* Center crease line */}
            <line
              x1="0"
              y1={-bean.size * 0.6}
              x2="0"
              y2={bean.size * 0.6}
              stroke="#0A0A0A"
              strokeWidth={bean.size * 0.06}
              opacity={bean.opacity * 2}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
