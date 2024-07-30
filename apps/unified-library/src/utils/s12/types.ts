type DataPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types -- use of Function is intended
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type DataPropertiesOnly<T> = {
  [P in DataPropertyNames<T>]: T[P] extends object ? DTO<T[P]> : T[P];
};

export type DTO<T> = Omit<DataPropertiesOnly<T>, "id" | "key">;
