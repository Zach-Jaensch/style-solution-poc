const pxToRem = (val: number) => {
  return `${parseFloat((val / 16).toFixed(4))}rem`;
};

export default pxToRem;
