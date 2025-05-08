export const getStringedDate = (createdDate: number) => {
  return new Date(createdDate).toISOString().split("T")[0];
};
