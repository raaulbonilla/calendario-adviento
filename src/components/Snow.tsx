import { type CSSProperties, useEffect, useState } from 'react';

interface SnowProps {
  enabled?: boolean;
  count?: number;
}

type Snowflake = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
};

type SnowflakeStyle = CSSProperties & {
  '--snow-drift'?: string;
};

export function Snow({ enabled = true, count = 150 }: SnowProps) {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    if (!enabled) {
      setSnowflakes([]);
      return;
    }

    const flakes: Snowflake[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 120 - 10,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 30,
      size: 3 + Math.random() * 5,
      drift: (Math.random() - 0.5) * 200
    }));

    setSnowflakes(flakes);
  }, [enabled, count]);

  if (!enabled || snowflakes.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white/40"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
            top: '-10px',
            '--snow-drift': `${flake.drift}px`
          } as SnowflakeStyle}
        />
      ))}
    </div>
  );
}
