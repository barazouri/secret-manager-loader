import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { StringDictionary } from "../types";

export abstract class AbstractSecretClient {
  abstract client: SecretsManagerClient;
  abstract getSecretValue(secretName: string): Promise<string>;
  abstract getSecretValueAsObject(
    secretName: string
  ): Promise<StringDictionary>;
}
