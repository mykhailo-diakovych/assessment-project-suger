export const isTimeInRange = (time: string | undefined, date: string[]) => {
  const startTime = new Date(time as string);
  const start = new Date(date[0]);
  const end = new Date(date[1]);
  return startTime >= start && startTime <= end;
};
