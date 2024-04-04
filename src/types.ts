export interface StringDictionary {
  [key: string]: string;
}

export interface SecretManager {
  secret_name: string;
  values: { envName: string; secretKey: string }[];
}
export interface ConfigManager {
  secretManagers: SecretManager[];
  environmentVariables: { envName: string; envValue: string }[];
}
