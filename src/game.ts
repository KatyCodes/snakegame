export type Direction = "up" | "down" | "left" | "right";
export type Status = "ready" | "playing" | "paused" | "over";
export type Cell = { x: number; y: number };
const vectors: Record<Direction, Cell> = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
const opposite: Record<Direction, Direction> = { up: "down", down: "up", left: "right", right: "left" };

export class SnakeGame {
  snake: Cell[] = [];
  food = { x: 0, y: 0 };
  score = 0;
  status: Status = "ready";
  direction: Direction = "right";
  readonly width: number;
  readonly height: number;
  private queued: Direction = "right";
  private readonly random: () => number;

  constructor(width = 24, height = 16, random = Math.random) {
    this.width = width; this.height = height; this.random = random; this.restart();
  }
  start() { if (this.status === "ready" || this.status === "paused") this.status = "playing"; }
  pause() { if (this.status === "playing") this.status = "paused"; }
  turn(direction: Direction) { if (direction === opposite[this.direction]) return false; this.queued = direction; return true; }
  tick() {
    if (this.status !== "playing") return;
    this.direction = this.queued;
    const head = this.snake[0], vector = vectors[this.direction];
    const next = { x: head.x + vector.x, y: head.y + vector.y };
    const ate = next.x === this.food.x && next.y === this.food.y;
    const body = ate ? this.snake : this.snake.slice(0, -1);
    if (next.x < 0 || next.y < 0 || next.x >= this.width || next.y >= this.height || body.some((cell) => cell.x === next.x && cell.y === next.y)) { this.status = "over"; return; }
    this.snake.unshift(next);
    if (ate) { this.score += 1; this.placeFood(); } else this.snake.pop();
  }
  restart() { this.snake = [{ x: Math.floor(this.width / 3), y: Math.floor(this.height / 2) }]; this.score = 0; this.status = "ready"; this.direction = "right"; this.queued = "right"; this.placeFood(); }
  private placeFood() {
    const open: Cell[] = [];
    for (let y = 0; y < this.height; y++) for (let x = 0; x < this.width; x++) if (!this.snake.some((cell) => cell.x === x && cell.y === y)) open.push({ x, y });
    if (!open.length) { this.status = "over"; return; }
    this.food = open[Math.floor(this.random() * open.length)];
  }
}
