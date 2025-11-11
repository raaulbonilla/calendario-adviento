export type RiddleType = 'text' | 'multiple-choice';

export interface Riddle {
  type: RiddleType;
  question: string;
  answer?: string; // For text type
  options?: string[]; // For multiple-choice
  correctOption?: number; // Index of correct option (0-3)
}

// Testing: Simulate current date as December 12, 2025
export const TESTING_MODE = false;
export const SIMULATED_DATE = new Date(2025, 11, 2, 10, 0, 0); // Nov 12, 2025, 10:00 AM

// Cooldown duration in milliseconds (30 seconds for testing, 1 hour for production)
export const COOLDOWN_DURATION = TESTING_MODE ? 5 * 1000 : 60 * 60 * 1000;

export const riddles: Record<number, Riddle> = {
  1: {
    type: 'text',
    question: 'acertijoDia1',
    answer: 'test'
  },
  2: {
    type: 'multiple-choice',
    question: 'acertijoDia2',
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctOption: 0
  },
  3: {
    type: 'text',
    question: 'acertijoDia3',
    answer: 'test'
  },
  4: {
    type: 'multiple-choice',
    question: 'acertijoDia4',
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctOption: 0
  },
  5: {
    type: 'text',
    question: 'acertijoDia5',
    answer: 'test'
  },
  6: {
    type: 'multiple-choice',
    question: 'acertijoDia6',
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctOption: 0
  },
  7: {
    type: 'text',
    question: 'acertijoDia7',
    answer: 'test'
  },
  8: {
    type: 'multiple-choice',
    question: 'acertijoDia8',
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctOption: 0
  },
  9: {
    type: 'text',
    question: 'acertijoDia9',
    answer: 'test'
  },
  10: {
    type: 'multiple-choice',
    question: 'acertijoDia10',
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctOption: 0
  },
  11: {
    type: 'text',
    question: 'acertijoDia11',
    answer: 'test'
  },
  12: {
    type: 'multiple-choice',
    question: 'De qué color es el caballo blanco de Santiago?',
    options: ['Negro', 'No tiene caballo', 'Blanco', 'Fuxia'],
    correctOption: 2
  },
  13: {
    type: 'text',
    question: 'acertijoDia13',
    answer: 'test'
  },
  14: {
    type: 'multiple-choice',
    question: 'acertijoDia14',
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctOption: 0
  },
  15: {
    type: 'text',
    question: 'acertijoDia15',
    answer: 'test'
  },
  16: {
    type: 'multiple-choice',
    question: 'acertijoDia16',
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctOption: 0
  },
  17: {
    type: 'text',
    question: 'acertijoDia17',
    answer: 'test'
  },
  18: {
    type: 'multiple-choice',
    question: 'acertijoDia18',
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctOption: 0
  },
  19: {
    type: 'text',
    question: 'acertijoDia19',
    answer: 'test'
  },
  20: {
    type: 'multiple-choice',
    question: 'acertijoDia20',
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctOption: 0
  },
  21: {
    type: 'text',
    question: 'acertijoDia21',
    answer: 'test'
  },
  22: {
    type: 'multiple-choice',
    question: 'acertijoDia22',
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctOption: 0
  },
  23: {
    type: 'text',
    question: 'acertijoDia23',
    answer: 'test'
  },
  24: {
    type: 'multiple-choice',
    question: 'acertijoDia24',
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctOption: 0
  }
};

// Riddle attempts tracking
const RIDDLE_ATTEMPTS_KEY = 'advent-riddle-attempts';
const SOLVED_RIDDLES_KEY = 'advent-solved-riddles';
const RIDDLE_ANSWERS_LOG_KEY = 'advent-riddle-answers-log';

// Device info helper
function getDeviceInfo(): string {
  const userAgent = navigator.userAgent;
  let deviceName = 'Desconocido';
  
  if (/Android/i.test(userAgent)) {
    deviceName = 'Android';
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    deviceName = 'iOS';
  } else if (/Windows/i.test(userAgent)) {
    deviceName = 'Windows';
  } else if (/Mac/i.test(userAgent)) {
    deviceName = 'Mac';
  } else if (/Linux/i.test(userAgent)) {
    deviceName = 'Linux';
  }
  
  return deviceName;
}

// Log answer attempts
export interface AnswerLog {
  day: number;
  answer: string;
  device: string;
  timestamp: number;
  isCorrect: boolean;
}

export function logAnswer(day: number, answer: string, isCorrect: boolean): void {
  try {
    const logs = getAnswerLogs();
    const newLog: AnswerLog = {
      day,
      answer,
      device: getDeviceInfo(),
      timestamp: Date.now(),
      isCorrect
    };
    logs.push(newLog);
    localStorage.setItem(RIDDLE_ANSWERS_LOG_KEY, JSON.stringify(logs));
  } catch (e) {
    console.error('Error logging answer:', e);
  }
}

export function getAnswerLogs(): AnswerLog[] {
  try {
    const data = localStorage.getItem(RIDDLE_ANSWERS_LOG_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function exportAnswerLogsAsText(): string {
  const logs = getAnswerLogs();
  let text = '=== REGISTRO DE RESPUESTAS DEL CALENDARIO DE ADVIENTO ===\n\n';
  
  logs.forEach(log => {
    const date = new Date(log.timestamp);
    text += `Día: ${log.day}\n`;
    text += `Respuesta: ${log.answer}\n`;
    text += `Dispositivo: ${log.device}\n`;
    text += `Fecha: ${date.toLocaleString('es-ES')}\n`;
    text += `Correcta: ${log.isCorrect ? 'SÍ' : 'NO'}\n`;
    text += '---\n\n';
  });
  
  return text;
}

export interface RiddleAttempt {
  day: number;
  failedAt: number;
}

export function getFailedAttempts(): RiddleAttempt[] {
  try {
    const data = localStorage.getItem(RIDDLE_ATTEMPTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addFailedAttempt(day: number): void {
  const attempts = getFailedAttempts();
  attempts.push({ day, failedAt: Date.now() });
  localStorage.setItem(RIDDLE_ATTEMPTS_KEY, JSON.stringify(attempts));
}

export function getCooldownEndTime(day: number): number | null {
  const attempts = getFailedAttempts();
  const lastAttempt = attempts.filter(a => a.day === day).sort((a, b) => b.failedAt - a.failedAt)[0];
  
  if (!lastAttempt) return null;
  
  const cooldownEnd = lastAttempt.failedAt + COOLDOWN_DURATION;
  return Date.now() < cooldownEnd ? cooldownEnd : null;
}

export function isSolved(day: number): boolean {
  try {
    const data = localStorage.getItem(SOLVED_RIDDLES_KEY);
    const solved: number[] = data ? JSON.parse(data) : [];
    return solved.includes(day);
  } catch {
    return false;
  }
}

export function markAsSolved(day: number): void {
  try {
    const data = localStorage.getItem(SOLVED_RIDDLES_KEY);
    let solved: number[] = data ? JSON.parse(data) : [];
    if (!solved.includes(day)) {
      solved.push(day);
      localStorage.setItem(SOLVED_RIDDLES_KEY, JSON.stringify(solved));
    }
  } catch (e) {
    console.error('Error marking riddle as solved:', e);
  }
}

/**
 * Detects if the user is on a mobile device
 */
export function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod|Windows Phone|webOS|BlackBerry/i.test(navigator.userAgent);
}

/**
 * Enables or disables scrolling based on the device type
 */
export function configureScrolling(): void {
  const overflowValue = isMobileDevice() ? 'auto' : 'hidden';
  document.body.style.overflow = overflowValue;
  document.documentElement.style.overflow = overflowValue;
}

// Call this function during initialization
configureScrolling();
