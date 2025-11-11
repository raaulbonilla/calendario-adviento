# Configuración del Calendario de Adviento

## ⏱️ Pantalla de Cuenta Atrás (Pre-Calendario)

Esta funcionalidad te permite mostrar una pantalla minimalista con un temporizador antes de que el calendario sea accesible. Es ideal para crear expectación.

### Activar/Desactivar la Pantalla de Countdown

Edita el archivo `src/lib/countdown-config.ts`:

**Línea 11** - Activa o desactiva la pantalla:
```typescript
ENABLED: false,  // false = desactivada, true = activada
```

### Configurar Fecha y Hora de Finalización

En el mismo archivo `src/lib/countdown-config.ts`:

**Líneas 14-20** - Define cuándo termina el countdown:
```typescript
TARGET_DATE: {
  year: 2025,     // Año
  month: 11,      // Mes (1=Enero, 11=Noviembre, 12=Diciembre)
  day: 15,        // Día del mes
  hour: 19,       // Hora en formato 24h (19 = 7 PM)
  minute: 30,     // Minutos
},
```

**Importante:**
- La hora está en **zona horaria española** (Europe/Madrid)
- Una vez que el countdown termina, no vuelve a aparecer
- La pantalla se muestra automáticamente sin header ni footer

## 📅 Cambiar el Mes y Días del Calendario

Para cambiar el calendario a otro mes o período, edita el archivo `src/lib/unlock-logic.ts`:

**Líneas a modificar:**
- **Línea 24**: Cambia `month: 11` (noviembre es el mes 11, diciembre es 12, etc.)
- **Línea 32**: Cambia `month: 11` 
- **Línea 40**: Cambia `month: 11`

**Nota:** Los meses en JavaScript van de 1-12, donde:
- 1 = Enero
- 11 = Noviembre
- 12 = Diciembre

El calendario siempre va del día 1 al 24 del mes seleccionado.

## 📏 Tamaños de Cuadritos Disponibles

Puedes editar los tamaños de los cuadritos en `src/components/CalendarGrid.tsx` (línea 12-38).

**Tamaños disponibles:**
1. **`small`** - 90x90px (móvil), 110x110px (escritorio)
2. **`small-medium`** - 100x100px (móvil), 120x120px (escritorio)
3. **`medium`** - 110x110px (móvil), 135x135px (escritorio)
4. **`medium-large`** - 120x120px (móvil), 150x150px (escritorio)
5. **`large`** - 130x130px (móvil), 165x165px (escritorio)
6. **`large-xl`** - 140x140px (móvil), 180x180px (escritorio)
7. **`xlarge`** - 150x150px (móvil), 195x195px (escritorio)
8. **`xxlarge`** - 165x165px (móvil), 215x215px (escritorio)
9. **`xxxlarge`** - 180x180px (móvil), 240x240px (escritorio)
10. **`mega`** - 195x195px (móvil), 260x260px (escritorio)

Para cambiar el tamaño de un día específico, modifica el array `gridLayout` en el archivo mencionado.

## 📝 Sistema de Registro de Respuestas

Todas las respuestas enviadas (correctas e incorrectas) se registran automáticamente con:
- Día del acertijo
- Respuesta enviada
- Dispositivo (Android, iOS, Windows, Mac, Linux)
- Fecha y hora
- Si fue correcta o no

### Exportar el Registro de Respuestas

Para descargar todos los logs como archivo de texto:

1. Abre la **Consola del Navegador** (F12 o Ctrl+Shift+I / Cmd+Option+I)
2. Pega este código y presiona Enter:

```javascript
// Ver todos los logs en la consola
import { getAnswerLogs, exportAnswerLogsAsText } from './src/lib/riddles';
console.table(getAnswerLogs());

// Descargar logs como archivo .txt
const text = exportAnswerLogsAsText();
const blob = new Blob([text], { type: 'text/plain' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `calendario-respuestas-${new Date().toISOString().split('T')[0]}.txt`;
a.click();
URL.revokeObjectURL(url);
```

O copia y pega esta versión simplificada en la consola:

```javascript
const logs = JSON.parse(localStorage.getItem('advent-riddle-answers-log') || '[]');
let text = '=== REGISTRO DE RESPUESTAS ===\n\n';
logs.forEach(log => {
  text += `Día: ${log.day}\nRespuesta: ${log.answer}\nDispositivo: ${log.device}\nFecha: ${new Date(log.timestamp).toLocaleString('es-ES')}\nCorrecta: ${log.isCorrect ? 'SÍ' : 'NO'}\n---\n\n`;
});
const blob = new Blob([text], { type: 'text/plain' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `respuestas-calendario-${new Date().toISOString().split('T')[0]}.txt`;
a.click();
URL.revokeObjectURL(url);
console.log('✅ Archivo descargado!');
```

### Ver Logs en la Consola

Para ver los logs directamente en la consola del navegador:

```javascript
const logs = JSON.parse(localStorage.getItem('advent-riddle-answers-log') || '[]');
console.table(logs);
```

## 🎨 Emoticonos de los Días

Los emoticonos disponibles son:
- ❤️ Corazón (Heart)
- 🎁 Regalo (Gift)
- ⭐ Estrella (Star)

Se reparten automáticamente entre todos los días del calendario.

Para cambiar los emoticonos, edita el archivo `src/components/DayCard.tsx` (línea 12).

## 🧪 Modo de Prueba

En `src/lib/riddles.ts`:
- **TESTING_MODE** (línea 12): `true` para pruebas, `false` para producción
- **SIMULATED_DATE** (línea 13): Fecha simulada para testing
- **COOLDOWN_DURATION** (línea 16): 30 segundos en testing, 1 hora en producción
