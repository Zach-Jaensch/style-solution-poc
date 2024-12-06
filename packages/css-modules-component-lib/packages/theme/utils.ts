const createRGBAString = ([r, g, b, a]: [number, number, number, number]) =>
  `rgba(${r}, ${g}, ${b}, ${a})`;

export const toRGBA = (hex: string, opacity: number = 1) => {
  const color: [number, number, number, number] = [0, 0, 0, opacity];
  if (!hex.startsWith("#") || (hex.length !== 7 && hex.length !== 4)) {
    return createRGBAString(color);
  }

  let index = 0;
  const step = hex.length === 4 ? 1 : 2;
  for (let i = 1; i < hex.length; i += step) {
    color[index++] = parseInt(hex.substring(i, i + step), 16);
  }
  return createRGBAString(color);
};
