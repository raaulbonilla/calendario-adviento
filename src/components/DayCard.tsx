import { Lock, Check, Clock } from 'lucide-react';
import { DayStatus } from '@/lib/unlock-logic';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface DayCardProps {
  status: DayStatus;
  onClick: () => void;
  isFlashing?: boolean;
}

export function DayCard({ status, onClick, isFlashing = false }: DayCardProps) {
  const { day, isUnlocked, isToday, isSolved, cooldownEnd } = status;

  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (cooldownEnd) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, Math.floor((cooldownEnd - Date.now()) / 1000));
        setCooldownSeconds(remaining);
        if (remaining === 0) {
          clearInterval(interval);
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 800);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cooldownEnd]);

  const isLocked = !isUnlocked;
  const isInCooldown = cooldownEnd && cooldownEnd > Date.now();
  const canClick = isUnlocked && !isInCooldown && !isAnimating;

  // State colors
  let bgColor = 'bg-muted/50'; // locked (gray)
  let textColor = 'text-locked';
  let borderColor = 'border-border';

  if (isSolved) {
    bgColor = 'bg-success/20';
    textColor = 'text-success';
    borderColor = 'border-success/50';
  } else if (isInCooldown || isAnimating) {
    bgColor = 'bg-error/20 animate-pulse-red';
    textColor = 'text-error';
    borderColor = 'border-error/50';
  } else if (isToday && isUnlocked) {
    bgColor = 'bg-available/30';
    textColor = 'text-available';
    borderColor = 'border-available ring-2 ring-available';
  } else if (isUnlocked) {
    bgColor = 'bg-available/20';
    textColor = 'text-available';
    borderColor = 'border-available/50';
  }

  return (
    <button
      onClick={canClick ? onClick : undefined}
      disabled={!canClick}
      className={cn(
        'group relative rounded-2xl border-2 transition-all duration-300',
        'calendar-card-shadow hover:calendar-card-shadow-hover',
        'flex flex-col items-center justify-center p-4',
        'w-full h-full',
        bgColor,
        borderColor,
        isLocked && 'opacity-60 grayscale cursor-not-allowed',
        isInCooldown && 'cursor-not-allowed',
        canClick && !isSolved && 'hover:scale-[1.02]',
        isFlashing && 'animate-flash-green'
      )}
      aria-label={`Día ${day}${isLocked ? ' - bloqueado' : ''}${isSolved ? ' - desbloqueado' : ''}`}
      aria-pressed={isSolved}
      aria-disabled={isLocked || !!isInCooldown}
    >
      {/* Day number - centered and animated */}
      <span
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'text-3xl md:text-4xl font-bold transition-all duration-800',
          textColor,
          (isInCooldown && cooldownSeconds > 1) ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
          cooldownSeconds === 1 && 'animate-fade-in-smooth'
        )}
      >
        {day}
      </span>

      {/* Status indicator */}
      <div className="absolute top-3 right-3">
        {isLocked && <Lock className="w-4 h-4 text-locked" />}
        {isSolved && <Check className="w-4 h-4 text-success" />}
      </div>

      {/* Cooldown timer - centered and animated */}
      {isInCooldown && cooldownSeconds > 1 && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          "animate-fade-in-center"
        )}>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-background/80 backdrop-blur-sm">
            <Clock className="w-3 h-3 text-error" />
            <span className="text-xs md:text-sm font-semibold text-error">
              {Math.floor(cooldownSeconds / 60)}:{(cooldownSeconds % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

      {/* Today badge */}
      {isToday && isUnlocked && !isSolved && !isInCooldown && (
        <div className="absolute -top-2 -right-2 bg-available text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
          ¡Hoy!
        </div>
      )}
    </button>
  );
}
