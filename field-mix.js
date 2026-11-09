// Every field reads the same uninterrupted clock. Only its contribution changes.
export const HOLD_SECONDS = 10;
export const MIX_SECONDS = 25;
export const CYCLE_SECONDS = 4 * (HOLD_SECONDS + MIX_SECONDS);
export function weightsAt(seconds) {
  const segment = HOLD_SECONDS + MIX_SECONDS;
  const position = ((seconds % CYCLE_SECONDS) + CYCLE_SECONDS) % CYCLE_SECONDS;
  const index = Math.floor(position / segment);
  const x = Math.max(
    0,
    Math.min(1, ((position % segment) - HOLD_SECONDS) / MIX_SECONDS),
  );
  // Quintic smootherstep: zero first and second derivatives at either end.
  const blend = x * x * x * (x * (x * 6 - 15) + 10);
  const weights = [0, 0, 0, 0];
  weights[index] = 1 - blend;
  weights[(index + 1) % 4] = blend;
  return weights;
}
