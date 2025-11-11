import { DateTime } from 'luxon';
import { YEAR, TIMEZONE, UNLOCK_HOUR } from './surprises';
import { TESTING_MODE, SIMULATED_DATE, getCooldownEndTime, isSolved } from './riddles';

export interface DayStatus {
  day: number;
  isUnlocked: boolean;
  isToday: boolean;
  isOpened: boolean;
  unlockTime: DateTime;
  isSolved: boolean;
  cooldownEnd: number | null;
}

function getNow(): DateTime {
  if (TESTING_MODE) {
    return DateTime.fromJSDate(SIMULATED_DATE).setZone(TIMEZONE);
  }
  return DateTime.now().setZone(TIMEZONE);
}

export function isUnlocked(day: number, now = getNow()): boolean {
  const target = DateTime.fromObject(
    { year: YEAR, month: 12, day, hour: UNLOCK_HOUR, minute: 0, second: 0 },
    { zone: TIMEZONE }
  );
  // Verifica que el mes actual sea diciembre y que la fecha actual sea mayor o igual a la fecha objetivo
  return now.month === 12 && now >= target;
}

export function isToday(day: number, now = getNow()): boolean {
  const target = DateTime.fromObject(
    { year: YEAR, month: 12, day },
    { zone: TIMEZONE }
  );
  return now.day === target.day && now.month === target.month && now.year === target.year;
}

export function getUnlockTime(day: number): DateTime {
  return DateTime.fromObject(
    { year: YEAR, month: 12, day, hour: UNLOCK_HOUR, minute: 0, second: 0 },
    { zone: TIMEZONE }
  );
}

export function nextUnlock(now = getNow()): DateTime | null {
  for (let d = 1; d <= 24; d++) {
    const target = getUnlockTime(d);
    if (now < target) {
      return target;
    }
  }
  return null; // All days unlocked
}

export function getDayStatus(day: number): DayStatus {
  const now = getNow();
  const unlockTime = getUnlockTime(day);
  
  return {
    day,
    isUnlocked: isUnlocked(day, now),
    isToday: isToday(day, now),
    isOpened: isOpened(day),
    unlockTime,
    isSolved: isSolved(day),
    cooldownEnd: getCooldownEndTime(day)
  };
}

// Persistence
const OPENED_DAYS_KEY = 'advent-calendar-opened';

export function isOpened(day: number): boolean {
  try {
    const opened = localStorage.getItem(OPENED_DAYS_KEY);
    if (opened) {
      const openedDays: number[] = JSON.parse(opened);
      return openedDays.includes(day);
    }
  } catch (e) {
    console.error('Error checking opened status:', e);
  }
  return false;
}

export function markAsOpened(day: number): void {
  try {
    const opened = localStorage.getItem(OPENED_DAYS_KEY);
    let openedDays: number[] = opened ? JSON.parse(opened) : [];
    if (!openedDays.includes(day)) {
      openedDays.push(day);
      localStorage.setItem(OPENED_DAYS_KEY, JSON.stringify(openedDays));
    }
  } catch (e) {
    console.error('Error marking day as opened:', e);
  }
}

export function resetProgress(): void {
  localStorage.removeItem(OPENED_DAYS_KEY);
}

export function getTimeUntilUnlock(target: DateTime): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const now = getNow();
  const diff = target.diff(now, ['days', 'hours', 'minutes', 'seconds']);
  
  return {
    days: Math.floor(diff.days),
    hours: Math.floor(diff.hours % 24),
    minutes: Math.floor(diff.minutes % 60),
    seconds: Math.floor(diff.seconds % 60),
    total: target.toMillis() - now.toMillis()
  };
}
