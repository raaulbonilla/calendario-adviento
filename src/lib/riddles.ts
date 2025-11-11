import { RIDDLE_CONFIG } from "../config";

export type RiddleType = "text" | "multiple-choice";

export interface Riddle {
  type: RiddleType;
  question: string;
  answer?: string;
  options?: string[];
  correctOption?: number;
}

export const TESTING_MODE = RIDDLE_CONFIG.testingMode;

export const SIMULATED_DATE = new Date(
  RIDDLE_CONFIG.simulatedDate.year,
  RIDDLE_CONFIG.simulatedDate.month - 1,
  RIDDLE_CONFIG.simulatedDate.day,
  RIDDLE_CONFIG.simulatedDate.hour,
  RIDDLE_CONFIG.simulatedDate.minute,
  0,
);

export const COOLDOWN_DURATION = TESTING_MODE
  ? RIDDLE_CONFIG.testingCooldownMs
  : RIDDLE_CONFIG.cooldownMs;

export const riddles: Record<number, Riddle> = {
  1: {
    type: "text",
    question:
      "tengo agujas pero no pincho y si me miras te doy la hora. ¿qué soy?",
    answer: "el reloj",
  },
  2: {
    type: "multiple-choice",
    question: "¿qué tiene cuello pero no cabeza?",
    options: ["una botella", "un abrigo", "una lámpara", "un río"],
    correctOption: 0,
  },
  3: {
    type: "text",
    question: "vuela sin alas, llora sin ojos. ¿qué es?",
    answer: "la nube",
  },
  4: {
    type: "multiple-choice",
    question: "¿cuál es el mes que tiene 28 días?",
    options: ["solo febrero", "febrero y marzo", "todos los meses", "ninguno"],
    correctOption: 2,
  },
  5: {
    type: "text",
    question: "se moja mientras seca. ¿qué es?",
    answer: "la toalla",
  },
  6: {
    type: "multiple-choice",
    question: "¿qué se rompe si lo nombras?",
    options: ["un globo", "el silencio", "la promesa", "el cristal"],
    correctOption: 1,
  },
  7: {
    type: "text",
    question: "en la mesa me ponen, pero nunca como. ¿quién soy?",
    answer: "el mantel",
  },
  8: {
    type: "multiple-choice",
    question: "¿qué sube y baja pero nunca se mueve?",
    options: ["el ascensor", "las escaleras", "la montaña", "la noria"],
    correctOption: 1,
  },
  9: {
    type: "text",
    question: "tiene dientes pero no muerde. ¿qué es?",
    answer: "el peine",
  },
  10: {
    type: "multiple-choice",
    question: "¿quién es hijo de tus padres y no es tu hermano?",
    options: ["mi primo", "mi tío", "yo", "mi vecino"],
    correctOption: 2,
  },
  11: {
    type: "text",
    question:
      "blanca por dentro, verde por fuera. si quieres que te lo diga, espera. ¿qué es?",
    answer: "la pera",
  },
  12: {
    type: "multiple-choice",
    question: "¿qué cosa cuanto más grande es, menos se ve?",
    options: ["la luz", "la niebla", "el bosque", "la ciudad"],
    correctOption: 1,
  },
  13: {
    type: "text",
    question:
      "tengo ciudades pero no casas, tengo montañas pero no árboles. ¿qué soy?",
    answer: "el mapa",
  },
  14: {
    type: "multiple-choice",
    question: "¿qué puedes atrapar pero no lanzar?",
    options: ["un resfriado", "una pelota", "un suspiro", "una sonrisa"],
    correctOption: 0,
  },
  15: {
    type: "text",
    question: "tiene un ojo pero no puede ver. ¿qué es?",
    answer: "la aguja",
  },
  16: {
    type: "multiple-choice",
    question: "¿qué palabra se escribe incorrectamente en el diccionario?",
    options: ["ortografía", "incorrectamente", "error", "diccionario"],
    correctOption: 1,
  },
  17: {
    type: "text",
    question: "cae al río y no se moja. ¿qué es?",
    answer: "la sombra",
  },
  18: {
    type: "multiple-choice",
    question: "¿qué tiene muchas llaves pero no puede abrir puertas?",
    options: ["un piano", "una caja fuerte", "un guardián", "un llavero"],
    correctOption: 0,
  },
  19: {
    type: "text",
    question: "cuanto más me quitas, más grande soy. ¿qué soy?",
    answer: "un agujero",
  },
  20: {
    type: "multiple-choice",
    question: "¿qué siempre viene pero nunca llega?",
    options: ["el ayer", "el amanecer", "el mañana", "el tren"],
    correctOption: 2,
  },
  21: {
    type: "text",
    question: "corre sin piernas y susurra sin boca. ¿qué es?",
    answer: "el viento",
  },
  22: {
    type: "multiple-choice",
    question:
      "¿qué número multiplicado por cualquier otro siempre da el mismo resultado?",
    options: ["uno", "cero", "dos", "diez"],
    correctOption: 1,
  },
  23: {
    type: "text",
    question: "tiene orejas pero no puede oír. ¿qué es?",
    answer: "la mazorca",
  },
  24: {
    type: "multiple-choice",
    question: "¿qué palabra empieza con e, termina con e y solo contiene una letra?",
    options: ["eje", "sobre", "estrella", "ele"],
    correctOption: 1,
  },
};

const RIDDLE_ATTEMPTS_KEY = "advent-riddle-attempts";
const SOLVED_RIDDLES_KEY = "advent-solved-riddles";
const RIDDLE_ANSWERS_LOG_KEY = "advent-riddle-answers-log";

function getDeviceInfo(): string {
  const userAgent = navigator.userAgent;
  let deviceName = "Desconocido";

  if (/Android/i.test(userAgent)) {
    deviceName = "Android";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    deviceName = "iOS";
  } else if (/Windows/i.test(userAgent)) {
    deviceName = "Windows";
  } else if (/Mac/i.test(userAgent)) {
    deviceName = "Mac";
  } else if (/Linux/i.test(userAgent)) {
    deviceName = "Linux";
  }

  return deviceName;
}

export interface AnswerLog {
  day: number;
  answer: string;
  device: string;
  timestamp: number;
  isCorrect: boolean;
}

export function logAnswer(
  day: number,
  answer: string,
  isCorrect: boolean,
): void {
  try {
    const logs = getAnswerLogs();
    const newLog: AnswerLog = {
      day,
      answer,
      device: getDeviceInfo(),
      timestamp: Date.now(),
      isCorrect,
    };
    logs.push(newLog);
    localStorage.setItem(RIDDLE_ANSWERS_LOG_KEY, JSON.stringify(logs));
  } catch (e) {
    console.error("error al guardar la respuesta:", e);
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
  let text = "=== REGISTRO DE RESPUESTAS DEL CALENDARIO DE ADVIENTO ===\n\n";

  logs.forEach((log) => {
    const date = new Date(log.timestamp);
    text += `Día: ${log.day}\n`;
    text += `Respuesta: ${log.answer}\n`;
    text += `Dispositivo: ${log.device}\n`;
    text += `Fecha: ${date.toLocaleString("es-ES")}\n`;
    text += `Correcta: ${log.isCorrect ? "SÍ" : "NO"}\n`;
    text += "---\n\n";
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
  const lastAttempt = attempts
    .filter((a) => a.day === day)
    .sort((a, b) => b.failedAt - a.failedAt)[0];

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
    console.error("error al marcar el acertijo como resuelto:", e);
  }
}

export function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod|Windows Phone|webOS|BlackBerry/i.test(
    navigator.userAgent,
  );
}

export function configureScrolling(): void {
  const overflowValue = isMobileDevice() ? "auto" : "hidden";
  document.body.style.overflow = overflowValue;
  document.documentElement.style.overflow = overflowValue;
}

configureScrolling();
