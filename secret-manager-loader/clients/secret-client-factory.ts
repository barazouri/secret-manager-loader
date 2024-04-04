import { AbstractSecretClient } from "./abstract-secret-client";
import { AwsSecretClient } from "./aws-secret-client";

export class SecretClientFactory {
  static createSecretClient(type: string): AbstractSecretClient {
    switch (type) {
      case "aws":
        return new AwsSecretClient();
      default:
        throw new Error("Invalid secret client type");
    }
  }
}
