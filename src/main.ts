import { SnakeGame, type Direction } from "./game";
const game = new SnakeGame();
const root = document.querySelector<HTMLElement>("#game")!, canvas = document.querySelector<HTMLCanvasElement>("#board")!, context = canvas.getContext("2d")!;
const score = document.querySelector("#score")!, bestLabel = document.querySelector("#best")!, status = document.querySelector("#status")!, speed = document.querySelector<HTMLSelectElement>("#speed")!, action = document.querySelector<HTMLButtonElement>("#action")!;
let timer = 0, best = Number(localStorage.getItem("snake-best")) || 0;
function draw() {
  const w = canvas.width / game.width, h = canvas.height / game.height;
  context.fillStyle = "#0b1027"; context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "rgba(201,246,90,.08)";
  for (let x = 1; x < game.width; x++) { context.beginPath(); context.moveTo(x * w, 0); context.lineTo(x * w, canvas.height); context.stroke(); }
  for (let y = 1; y < game.height; y++) { context.beginPath(); context.moveTo(0, y * h); context.lineTo(canvas.width, y * h); context.stroke(); }
  game.snake.forEach((cell, i) => { context.fillStyle = i ? "#7fbf4d" : "#c9f65a"; context.fillRect(cell.x * w + 2, cell.y * h + 2, w - 4, h - 4); });
  context.fillStyle = "#ff7657"; context.fillRect(game.food.x * w + 3, game.food.y * h + 3, w - 6, h - 6);
  score.textContent = `score: ${game.score}`; bestLabel.textContent = `best: ${best}`; status.textContent = game.status;
  action.textContent = game.status === "playing" ? "pause" : game.status === "paused" ? "resume" : game.status === "over" ? "play again" : "start"; speed.disabled = game.status === "playing";
}
function stop() { clearInterval(timer); timer = 0; }
function begin() {
  if (game.status === "over") game.restart();
  if (game.status === "playing") { game.pause(); stop(); }
  else { game.start(); stop(); timer = window.setInterval(() => { game.tick(); if (game.score > best) { best = game.score; localStorage.setItem("snake-best", String(best)); } if (game.status === "over") stop(); draw(); }, Number(speed.value)); }
  draw(); root.focus();
}
function steer(direction: Direction) { game.turn(direction); if (game.status === "ready") begin(); }
const directions: Record<string, Direction> = { ArrowUp: "up", w: "up", W: "up", ArrowDown: "down", s: "down", S: "down", ArrowLeft: "left", a: "left", A: "left", ArrowRight: "right", d: "right", D: "right" };
root.addEventListener("keydown", (event) => { const direction = directions[event.key]; if (direction) { event.preventDefault(); steer(direction); } else if (event.key === " ") { event.preventDefault(); begin(); } });
document.querySelectorAll<HTMLButtonElement>("[data-direction]").forEach((button) => button.addEventListener("click", () => steer(button.dataset.direction as Direction)));
action.addEventListener("click", begin);
document.querySelector("#restart")!.addEventListener("click", () => { stop(); game.restart(); draw(); root.focus(); });
draw();
