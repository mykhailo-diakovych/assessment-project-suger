export const removeDuplicatesFromArrOfObj = (
  arr: any[],
  key1: string,
  key2: string
) => {
  return arr.filter((obj: any, index: number) => {
    return (
      index ===
      arr.findIndex((o: any) => obj[key1] === o[key1] && obj[key2] === o[key2])
    );
  });
};
