import { DateTime } from 'luxon';

/**
 * CONFIGURACIÓN DE LA PANTALLA DE CUENTA ATRÁS
 * 
 * Activa/desactiva la pantalla de countdown que aparece antes del calendario
 */
export const COUNTDOWN_CONFIG = {
  // Activar o desactivar la pantalla de countdown (true = activada, false = desactivada)
  ENABLED: true,
  
  // Fecha y hora de finalización del countdown (formato: año, mes, día, hora, minuto)
  // Mes: 1 = Enero, 11 = Noviembre, 12 = Diciembre
  // Hora en formato 24h (España = Europe/Madrid timezone)
  TARGET_DATE: {
    year: 2025,
    month: 11,  
    day: 14,
    hour: 19,   
    minute: 30,
  },
  
  // Zona horaria (no modificar a menos que sea necesario)
  TIMEZONE: 'Europe/Madrid',
};

/**
 * Obtiene la fecha objetivo del countdown como DateTime
 */
export function getCountdownTarget(): DateTime {
  return DateTime.fromObject(
    {
      year: COUNTDOWN_CONFIG.TARGET_DATE.year,
      month: COUNTDOWN_CONFIG.TARGET_DATE.month,
      day: COUNTDOWN_CONFIG.TARGET_DATE.day,
      hour: COUNTDOWN_CONFIG.TARGET_DATE.hour,
      minute: COUNTDOWN_CONFIG.TARGET_DATE.minute,
      second: 0,
    },
    { zone: COUNTDOWN_CONFIG.TIMEZONE }
  );
}

/**
 * Verifica si el countdown ya ha terminado
 */
export function isCountdownFinished(): boolean {
  const now = DateTime.now().setZone(COUNTDOWN_CONFIG.TIMEZONE);
  const target = getCountdownTarget();
  return now >= target;
}

/**
 * Verifica si se debe mostrar la pantalla de countdown
 */
export function shouldShowCountdown(): boolean {
  if (!COUNTDOWN_CONFIG.ENABLED) return false;
  
  const hasFinished = localStorage.getItem('countdown-finished');
  if (hasFinished === 'true') return false;
  
  return !isCountdownFinished();
}

/**
 * Obtiene la clase CSS para el efecto de desenfoque del fondo
 */
export function getCountdownBlurClass(): string {
  return shouldShowCountdown() ? 'blur-[50px]' : 'blur-0'; // Increased blur to 50px
}
