import { DateTime } from "luxon";
import { CALENDAR_CONFIG } from "../config";
import {
  TESTING_MODE,
  SIMULATED_DATE,
  getCooldownEndTime,
  isSolved,
} from "./riddles";

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
    return DateTime.fromJSDate(SIMULATED_DATE).setZone(
      CALENDAR_CONFIG.timezone,
    );
  }
  return DateTime.now().setZone(CALENDAR_CONFIG.timezone);
}

export function isUnlocked(day: number, now = getNow()): boolean {
  const target = DateTime.fromObject(
    {
      year: CALENDAR_CONFIG.year,
      month: CALENDAR_CONFIG.month,
      day,
      hour: CALENDAR_CONFIG.unlockHour,
      minute: 0,
      second: 0,
    },
    { zone: CALENDAR_CONFIG.timezone },
  );
  return now.month === CALENDAR_CONFIG.month && now >= target;
}

export function isToday(day: number, now = getNow()): boolean {
  const target = DateTime.fromObject(
    { year: CALENDAR_CONFIG.year, month: CALENDAR_CONFIG.month, day },
    { zone: CALENDAR_CONFIG.timezone },
  );
  return (
    now.day === target.day &&
    now.month === target.month &&
    now.year === target.year
  );
}

export function getUnlockTime(day: number): DateTime {
  return DateTime.fromObject(
    {
      year: CALENDAR_CONFIG.year,
      month: CALENDAR_CONFIG.month,
      day,
      hour: CALENDAR_CONFIG.unlockHour,
      minute: 0,
      second: 0,
    },
    { zone: CALENDAR_CONFIG.timezone },
  );
}

export function nextUnlock(now = getNow()): DateTime | null {
  for (let d = 1; d <= CALENDAR_CONFIG.totalDays; d++) {
    const target = getUnlockTime(d);
    if (now < target) {
      return target;
    }
  }
  return null;
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
    cooldownEnd: getCooldownEndTime(day),
  };
}

const OPENED_DAYS_KEY = "advent-calendar-opened";

export function isOpened(day: number): boolean {
  try {
    const opened = localStorage.getItem(OPENED_DAYS_KEY);
    if (opened) {
      const openedDays: number[] = JSON.parse(opened);
      return openedDays.includes(day);
    }
  } catch (e) {
    console.error("error al comprobar si el día estaba abierto:", e);
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
    console.error("error al marcar el día como abierto:", e);
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
  const diff = target.diff(now, ["days", "hours", "minutes", "seconds"]);

  return {
    days: Math.floor(diff.days),
    hours: Math.floor(diff.hours % 24),
    minutes: Math.floor(diff.minutes % 60),
    seconds: Math.floor(diff.seconds % 60),
    total: target.toMillis() - now.toMillis(),
  };
}
