export const sliceAddress = (address: string, length: number) => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};
