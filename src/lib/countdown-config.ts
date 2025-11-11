import { DateTime } from "luxon";
import { COUNTDOWN_CONFIG } from "../config";

export function getCountdownTarget(): DateTime {
  return DateTime.fromObject(
    {
      year: COUNTDOWN_CONFIG.target.year,
      month: COUNTDOWN_CONFIG.target.month,
      day: COUNTDOWN_CONFIG.target.day,
      hour: COUNTDOWN_CONFIG.target.hour,
      minute: COUNTDOWN_CONFIG.target.minute,
      second: 0,
    },
    { zone: COUNTDOWN_CONFIG.timezone },
  );
}

export function isCountdownFinished(): boolean {
  const now = DateTime.now().setZone(COUNTDOWN_CONFIG.timezone);
  const target = getCountdownTarget();
  return now >= target;
}

export function shouldShowCountdown(): boolean {
  if (!COUNTDOWN_CONFIG.enabled) return false;

  const hasFinished = localStorage.getItem("countdown-finished");
  if (hasFinished === "true") return false;

  return !isCountdownFinished();
}

export function getCountdownBlurClass(): string {
  return shouldShowCountdown() ? "blur-[50px]" : "blur-0";
}
