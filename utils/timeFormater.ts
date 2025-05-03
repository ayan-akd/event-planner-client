export const timeFormatter = (myTime: string) => {
  const dateObj = new Date(myTime);
  const date = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();
  const formattedDate = `${date}/${month}/${year}`;
  return formattedDate;
};
