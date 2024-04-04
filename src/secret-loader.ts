import { AbstractSecretClient } from './clients/abstract-secret-client';
import { ConfigManager } from './types';

export class SecretLoader {
  private secretClient: AbstractSecretClient;
  constructor(secretClient: AbstractSecretClient) {
    this.secretClient = secretClient;
  }
  async loadSecretsToEnv(config: ConfigManager): Promise<void> {
    try {
      for (const secret of config.secretManagers) {
        const secrets = await this.secretClient.getSecretValueAsObject(
          secret.secret_name,
        );
        for (const value of secret.values) {
          process.env[value.envName] = secrets[value.secretKey];
        }
      }
      for (const env of config.environmentVariables) {
        process.env[env.envName] = env.envValue;
      }
    } catch (error) {
      throw error;
    }
  }
}
