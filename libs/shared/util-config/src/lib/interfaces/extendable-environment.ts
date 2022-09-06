export interface DefaultEnvironment {
  production: boolean;
}

export type ExtendableEnvironment<
  T extends DefaultEnvironment = DefaultEnvironment
> = T;

export interface SharedBooksEnvironment extends DefaultEnvironment {
  flow: {
    returnToListAfterUpsert: boolean;
  };
}
