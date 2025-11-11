import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { getCountdownTarget } from '@/lib/countdown-config';
import { getTimeUntilUnlock } from '@/lib/unlock-logic';

interface CountdownScreenProps {
  onComplete: () => void;
}

export function CountdownScreen({ onComplete }: CountdownScreenProps) {
  const target = getCountdownTarget();
  const [timeLeft, setTimeLeft] = useState(getTimeUntilUnlock(target));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = getTimeUntilUnlock(target);
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.total <= 0) {
        clearInterval(interval);
        localStorage.setItem('countdown-finished', 'true');
        onComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [target, onComplete]);

  const totalHours = timeLeft.days * 24 + timeLeft.hours;
  const days = timeLeft.days;
  const hours = timeLeft.hours;
  const minutes = timeLeft.minutes;
  const seconds = timeLeft.seconds;

  return (
    <div className="fixed inset-0 z-50 gradient-romantic flex items-center justify-center overflow-hidden">
      <div className="text-center space-y-8 px-4 animate-fade-in">
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
            {/* Días */}
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg min-w-[70px] sm:min-w-[100px]">
                <div className="text-4xl sm:text-6xl font-bold text-primary font-mono">
                  {String(days).padStart(2, '0')}
                </div>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                Días
              </span>
            </div>

            {/* Horas */}
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg min-w-[70px] sm:min-w-[100px]">
                <div className="text-4xl sm:text-6xl font-bold text-primary font-mono">
                  {String(hours).padStart(2, '0')}
                </div>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                Horas
              </span>
            </div>

            {/* Minutos */}
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg min-w-[70px] sm:min-w-[100px]">
                <div className="text-4xl sm:text-6xl font-bold text-primary font-mono">
                  {String(minutes).padStart(2, '0')}
                </div>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                Min
              </span>
            </div>

            {/* Segundos */}
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg min-w-[70px] sm:min-w-[100px]">
                <div className="text-4xl sm:text-6xl font-bold text-primary font-mono">
                  {String(seconds).padStart(2, '0')}
                </div>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                Seg
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
