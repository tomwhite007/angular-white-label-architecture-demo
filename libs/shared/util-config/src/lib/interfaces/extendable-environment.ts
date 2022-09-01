export interface DefaultEnvironment {
  production: boolean;
}

export type ExtendableEnvironment<T = DefaultEnvironment> = T;
