export function formatTimestamp(timestamp: number): { days: number; hours: number; minutes: number } {
  const totalMinutes = Math.floor(timestamp / (1000 * 60));
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  return {
    days,
    hours,
    minutes,
  };
}
