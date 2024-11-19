export function getRandomInt(start: number = 0, end: number): number {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
