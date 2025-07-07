export function evaluateScore({
  isCorrect,
  timeUsed,
  timeLimit,
}: {
  isCorrect: any;
  timeUsed: any;
  timeLimit?: any;
}): number {
  const timeUsedPercentage = timeUsed / timeLimit;

  return isCorrect ? 10 - Math.round(10 * timeUsedPercentage) : 5 - Math.round(5 * timeUsedPercentage);
}
