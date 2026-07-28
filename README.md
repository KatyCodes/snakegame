# Snake

A browser-based Snake game rebuilt from my original C# Windows Forms prototype. This version keeps the original difficulty choices while adding responsive controls, accessibility, local high scores, and a testable TypeScript game engine.

## Play

```bash
npm install
npm run dev
```

Use the arrow keys or WASD to steer. On touch devices, use the on-screen direction controls. Press Space to pause or resume.

## Features

- Easy, medium, and hard speeds
- Keyboard and touch-friendly controls
- Pause, restart, score, and persistent local high score
- Responsive, static browser build
- Framework-free TypeScript game engine with unit tests
- Reduced-motion-friendly interface and accessible status updates

## Development

```bash
npm test
npm run typecheck
npm run build
```

The original .NET Framework/Windows Forms source remains in [`snakegame/`](snakegame/) as project history. The modern version is also integrated into [KatyCodes v2](https://katycodes.com) through the `snake` terminal command.
