export const CALENDAR_CONFIG = {
  year: new Date().getFullYear(),
  month: 12,
  unlockHour: 9,
  timezone: "Europe/Madrid",
  totalDays: 24,
};

export const COUNTDOWN_CONFIG = {
  enabled: true,
  target: {
    year: 2025,
    month: 11,
    day: 14,
    hour: 19,
    minute: 30,
  },
  timezone: "Europe/Madrid",
};

export const RIDDLE_CONFIG = {
  testingMode: false,
  simulatedDate: {
    year: 2025,
    month: 12,
    day: 2,
    hour: 10,
    minute: 0,
  },
  cooldownMs: 60 * 60 * 1000,
  testingCooldownMs: 5 * 1000,
};
