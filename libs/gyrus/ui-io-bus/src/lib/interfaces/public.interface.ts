export type OutputEvent<T> = {
  name: string;
  group?: string;
  created?: string;
  payload: T;
};
