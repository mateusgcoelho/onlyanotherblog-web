export function fakeDelay(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
