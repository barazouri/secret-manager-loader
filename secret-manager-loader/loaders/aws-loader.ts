import { ConfigManager, SecretClientFactory, SecretLoader } from "..";

export async function loadSecretsAWS(Config: ConfigManager): Promise<void> {
  try {
    const secretClient = SecretClientFactory.createSecretClient("aws");
    const SecretLoaderInstance = new SecretLoader(secretClient);
    await SecretLoaderInstance.loadSecretsToEnv(Config);
  } catch (err) {
    throw err;
  }
}
