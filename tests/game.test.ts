import assert from "node:assert/strict";
import test from "node:test";
import { SnakeGame } from "../src/game.ts";
test("moves, eats, and scores", () => { const game = new SnakeGame(12, 8, () => 0); const head = game.snake[0]; game.food = { x: head.x + 1, y: head.y }; game.start(); game.tick(); assert.equal(game.score, 1); assert.equal(game.snake.length, 2); });
test("rejects an immediate reverse", () => { const game = new SnakeGame(); assert.equal(game.turn("left"), false); });
test("ends at a wall and restarts", () => { const game = new SnakeGame(4, 4); game.start(); while (game.status === "playing") game.tick(); assert.equal(game.status, "over"); game.restart(); assert.equal(game.status, "ready"); assert.equal(game.score, 0); });
