export interface DefaultEnvironment {
  production: boolean;
}

export type ExtendableEnvironment<
  T extends DefaultEnvironment = DefaultEnvironment
> = T;
