import { ExtendableEnvironment } from '../interfaces/extendable-environment';

// Instantiated by factory
export class ConfigService {
  constructor(public readonly environment: ExtendableEnvironment) {}
}
