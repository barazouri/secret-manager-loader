import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { StringDictionary } from '..';
import { AbstractSecretClient } from './abstract-secret-client';

export class AwsSecretClient extends AbstractSecretClient {
  client: SecretsManagerClient;

  constructor() {
    super();
    this.client = new SecretsManagerClient();
  }

  async getSecretValue(secretName: string): Promise<string> {
    const response = await this.client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
      }),
    );
    if (!response.SecretString) {
      throw new Error('SecretString is not defined');
    }
    return response.SecretString;
  }

  async getSecretValueAsObject(secretName: string): Promise<StringDictionary> {
    const key = await this.getSecretValue(secretName);
    const secretObject = JSON.parse(key);
    return secretObject;
  }
}
