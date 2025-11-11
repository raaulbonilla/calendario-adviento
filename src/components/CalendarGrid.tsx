import { useState, useEffect, useCallback, useRef } from 'react';
import { DayCard } from './DayCard';
import { SurpriseModal } from './SurpriseModal';
import { RiddleModal } from './RiddleModal';
import { Confetti } from './Confetti';
import { getDayStatus, markAsOpened } from '@/lib/unlock-logic';
import { getStoredSurprises } from '@/lib/surprises';
import { isSolved, getCooldownEndTime } from '@/lib/riddles';
import { useToast } from '@/hooks/use-toast';

// Randomized layout with day 24 centered and largest
// Tamaños disponibles: small, small-medium,
// medium, medium-large, large, large-xl,
// xlarge, xxlarge, xxxlarge, mega
const gridLayout = [
  { order: 15, size: 'medium' },       // Day 1
  { order: 3, size: 'large' },         // Day 2
  { order: 18, size: 'xlarge' },       // Day 3
  { order: 7, size: 'medium' },        // Day 4
  { order: 22, size: 'large' },        // Day 5
  { order: 1, size: 'xlarge' },        // Day 6
  { order: 11, size: 'medium' },       // Day 7
  { order: 20, size: 'large' },        // Day 8
  { order: 5, size: 'xlarge' },        // Day 9
  { order: 14, size: 'medium' },       // Day 10
  { order: 9, size: 'large' },         // Day 11
  { order: 23, size: 'xlarge' },       // Day 12
  { order: 2, size: 'medium' },        // Day 13
  { order: 17, size: 'large' },        // Day 14
  { order: 6, size: 'xlarge' },        // Day 15
  { order: 21, size: 'medium' },       // Day 16
  { order: 10, size: 'large' },        // Day 17
  { order: 4, size: 'xlarge' },        // Day 18
  { order: 19, size: 'medium' },       // Day 19
  { order: 8, size: 'large' },         // Day 20
  { order: 24, size: 'xlarge' },       // Day 21
  { order: 13, size: 'medium' },       // Day 22
  { order: 16, size: 'large' },        // Day 23
  { order: 12, size: 'xxxlarge' },     // Day 24 (centered, largest)
];

export function CalendarGrid() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [riddleDay, setRiddleDay] = useState<number | null>(null);
  const [flashingDay, setFlashingDay] = useState<number | null>(null);
  const [dayStatuses, setDayStatuses] = useState(() =>
    Array.from({ length: 24 }, (_, i) => getDayStatus(i + 1))
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });
  const { toast } = useToast();

  const surprises = getStoredSurprises();

  const updateScale = useCallback(() => {
    if (!wrapperRef.current || !gridRef.current) return;

    const availableWidth = wrapperRef.current.clientWidth;
    const availableHeight = wrapperRef.current.clientHeight;
    if (!availableWidth || !availableHeight) return;

    const contentWidth = gridRef.current.scrollWidth;
    const contentHeight = gridRef.current.scrollHeight;
    if (!contentWidth || !contentHeight) return;

    const nextScale = Math.min(availableWidth / contentWidth, availableHeight / contentHeight, 1);

    setScale((prev: number) => (Math.abs(prev - nextScale) < 0.01 ? prev : nextScale));
    setGridSize((prev) =>
      prev.width === contentWidth && prev.height === contentHeight
        ? prev
        : { width: contentWidth, height: contentHeight }
    );
  }, []);

  // Update statuses every second to handle cooldowns
  useEffect(() => {
    const interval = setInterval(() => {
      setDayStatuses(Array.from({ length: 24 }, (_, i) => getDayStatus(i + 1)));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDayClick = (day: number) => {
    const status = dayStatuses[day - 1];

    if (!status.isUnlocked) {
      toast({
        title: '🔒 Aún no disponible',
        description: `Este día se desbloqueará el ${status.unlockTime.toFormat('dd/MM')} a las ${status.unlockTime.toFormat("HH:mm")}`,
        variant: 'destructive',
      });
      return;
    }

    const cooldownEnd = getCooldownEndTime(day);
    if (cooldownEnd && cooldownEnd > Date.now()) {
      const remainingMinutes = Math.ceil((cooldownEnd - Date.now()) / 60000);
      toast({
        title: '⏳ En espera',
        description: `Debes esperar ${remainingMinutes} minuto(s) antes de volver a intentarlo`,
        variant: 'destructive',
      });
      return;
    }

    if (isSolved(day)) {
      setSelectedDay(day);
    } else {
      setRiddleDay(day);
    }
  };

  const handleRiddleSolved = () => {
    if (riddleDay !== null) {
      markAsOpened(riddleDay);
      setDayStatuses((prev) =>
        prev.map((status, index) =>
          index + 1 === riddleDay ? getDayStatus(riddleDay) : status
        )
      );

      setRiddleDay(null);

      setFlashingDay(riddleDay);

      setTimeout(() => {
        setFlashingDay(null);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3500);
      }, 1200);
    }
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
  };

  const handleCloseRiddle = () => {
    setRiddleDay(null);
  };

  useEffect(() => {
    updateScale();
  }, [updateScale]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => updateScale();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateScale]);

  useEffect(() => {
    if (typeof ResizeObserver === 'undefined' || !gridRef.current) return;

    const observer = new ResizeObserver(() => updateScale());
    observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, [updateScale]);

  // Create sorted array for rendering
  const sortedDays = dayStatuses.map((status, index) => ({
    status,
    layout: gridLayout[index],
  })).sort((a, b) => a.layout.order - b.layout.order);

  const scaledWidth = gridSize.width ? gridSize.width * scale : undefined;
  const scaledHeight = gridSize.height ? gridSize.height * scale : undefined;

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
      >
        <div
          className="flex items-start justify-center"
          style={{
            width: scaledWidth ? `${scaledWidth}px` : undefined,
            height: scaledHeight ? `${scaledHeight}px` : undefined,
          }}
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              transition: 'transform 150ms ease-out',
            }}
          >
            <div ref={gridRef} className="container mx-auto px-2 sm:px-4 py-2">
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 w-full max-w-7xl">
                {sortedDays.map(({ status, layout }) => {
                  let sizeClass = '';
                  switch (layout.size) {
                    case 'small':
                      sizeClass = 'w-[90px] h-[90px] md:w-[110px] md:h-[110px]';
                      break;
                    case 'small-medium':
                      sizeClass = 'w-[100px] h-[100px] md:w-[120px] md:h-[120px]';
                      break;
                    case 'medium':
                      sizeClass = 'w-[110px] h-[110px] md:w-[135px] md:h-[135px]';
                      break;
                    case 'medium-large':
                      sizeClass = 'w-[120px] h-[120px] md:w-[150px] md:h-[150px]';
                      break;
                    case 'large':
                      sizeClass = 'w-[130px] h-[130px] md:w-[165px] md:h-[165px]';
                      break;
                    case 'large-xl':
                      sizeClass = 'w-[140px] h-[140px] md:w-[180px] md:h-[180px]';
                      break;
                    case 'xlarge':
                      sizeClass = 'w-[150px] h-[150px] md:w-[195px] md:h-[195px]';
                      break;
                    case 'xxlarge':
                      sizeClass = 'w-[165px] h-[165px] md:w-[215px] md:h-[215px]';
                      break;
                    case 'xxxlarge':
                      sizeClass = 'w-[180px] h-[180px] md:w-[240px] md:h-[240px]';
                      break;
                    case 'mega':
                      sizeClass = 'w-[195px] h-[195px] md:w-[260px] md:h-[260px]';
                      break;
                  }

                  return (
                    <div
                      key={status.day}
                      className={`${sizeClass} flex-shrink-0`}
                    >
                      <DayCard
                        status={status}
                        onClick={() => handleDayClick(status.day)}
                        isFlashing={flashingDay === status.day}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {riddleDay && (
        <RiddleModal
          day={riddleDay}
          isOpen={!!riddleDay}
          onClose={handleCloseRiddle}
          onSolved={handleRiddleSolved}
        />
      )}

      {selectedDay && surprises[selectedDay] && (
        <SurpriseModal
          open={!!selectedDay}
          onClose={handleCloseModal}
          surprise={surprises[selectedDay]}
          day={selectedDay}
        />
      )}

      <Confetti trigger={showConfetti} />
    </>
  );
}