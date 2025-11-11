# Calendario de Adviento

Calendario web sencillo para abrir sorpresas día a día, con acertijos y un contador opcional antes de empezar. Todo está en español y pensado para personalizarlo rápido.

## Configuración

1. Abre `src/config.ts`.
2. Cambia año, mes, hora de desbloqueo, cantidad de días, zona horaria, fecha del contador o tiempos de espera de los acertijos.
3. Guarda y reinicia el servidor si ya estaba corriendo.

## Instalación

```bash
pnpm install
pnpm run dev
```

La web queda accesible en `http://localhost:5173` por defecto.

## Mantenimiento

- Edita las sorpresas en `src/lib/surprises.ts`.
- Los acertijos viven en `src/lib/riddles.ts`.
- Usa `pnpm run build` para generar la versión lista para subir.
