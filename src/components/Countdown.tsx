import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { getTimeUntilUnlock } from '@/lib/unlock-logic';

interface CountdownProps {
  target: DateTime;
}

export function Countdown({ target }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilUnlock(target));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = getTimeUntilUnlock(target);
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  if (timeLeft.total <= 0) {
    return <span className="text-sm text-unlocked font-medium">¡Disponible ahora!</span>;
  }

  const totalHours = timeLeft.days * 24 + timeLeft.hours;
  const displayText = `${totalHours}h ${timeLeft.minutes}min ${timeLeft.seconds}s`;

  return (
    <span className="text-sm text-muted-foreground font-mono">
      {displayText}
    </span>
  );
}
