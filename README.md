# Secret Manager Loader 2 Environment Variables

Secret Manager Loader

## Description

This project provides a set of utilities for loading secrets from a secret manager to the environment variable in local environment.

## Installation

This package is designed to be used in your development environment.
You can install this package as a development dependency in your project by running the following command in your terminal:

```bash
npm i --save-dev secret-manager-loader-2-env
```

test

## Usage


### 1. Secret Clients

This package exports several types and classes related to secret management:

- AbstractSecretClient: An abstract class representing a generic secret client, you can extend it to implement your own client.
- AWSSecretClient: A class for interacting with AWS Secrets Manager, you need to use aws sso login with default to use it.
- SecretClientFactory: A factory class for creating instances of secret clients based on configuration.
- SecretLoader: A utility function for loading secrets using a secret client.

### 2. Importing the Package

You can import the necessary classes and functions from the package as follows:

```javascript
import {
  AbstractSecretClient,
  AWSSecretClient,
  SecretClientFactory,
  SecretLoader,
} from 'secret-manager-loader-2-env';
```

### 3. Usage Examples

#### Create src/config directory with 3 files inside
src/config/local-development.ts

```javascript
import { ConfigManager } from 'secret-manager-loader-2-env';

export const Config: ConfigManager = {
  secretManagers: [
    {
      secretName: "mySecret1",
      values: [
        { envName: "ENV_1", secretKey: "secretKey1" },
        { envName: "ENV_2", secretKey: "secretKey2" },
      ],
    },
    {
      secretName: "mySecret2",
      values: [
        { envName: "ENV_3", secretKey: "secretKey3" },
        { envName: "ENV_4", secretKey: "secretKey4" },
      ],
    },
  ],
  environmentVariables: [
    { envName: "ENV_1", envValue: "value1" },
    { envName: "ENV_2", envValue: "value2" },
  ],
};

```
src/config/staging.ts
```javascript
import { ConfigManager } from 'secret-manager-loader-2-env';

export const Config: ConfigManager = {
  secretManagers: [
    {
      secretName: "mySecret1",
      values: [
        { envName: "ENV_1", secretKey: "secretKey1" },
        { envName: "ENV_2", secretKey: "secretKey2" },
      ],
    },
    {
      secretName: "mySecret2",
      values: [
        { envName: "ENV_3", secretKey: "secretKey3" },
        { envName: "ENV_4", secretKey: "secretKey4" },
      ],
    },
  ],
  environmentVariables: [
    { envName: "ENV_1", envValue: "value1" },
    { envName: "ENV_2", envValue: "value2" },
  ],
};
```
src/config/secrets-loader.ts
```javascript
import { Config as LocalConfig } from './local-development';
import { Config as StagingConfig } from './staging';
import { loadSecretsAWS } from 'secret-manager-loader-2-env';

const loadSecrets = async () => {
  if (
    process.env.NODE_ENV === 'local-development' ||
    process.env.NODE_ENV === 'local-staging'
  ) {
    const config = getConfigByEnv();

    console.log(`Loading keys for ${process.env.NODE_ENV}`);
    await loadSecretsAWS(config);
  }
};

const getConfigByEnv = () => {
  let Config;
  if (process.env.NODE_ENV === 'local-development') {
    Config = LocalConfig;
  } else if (process.env.NODE_ENV === 'local-staging') {
    Config = StagingConfig;
  } else {
    throw new Error('NODE_ENV is not set');
  }
  return Config;
};
loadSecrets();

```

#### Create webpack file in the root dir
webpack.config.js
```javascript
/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
require('ts-node').register();
//Load all secrets to env variables
require('./src/config/secrets-loader.ts');  //This line loading all the secrets from the secret manager

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: [options.entry],
    externals: [nodeExternals()],
    plugins: [
      ...options.plugins,
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: options.output.filename,
      }),
    ],
    devtool: 'source-map',
  };
};

```

#### Use this command to run the service in package.json
```
These are example for commands to nest services, but you can changes your conmmands to adjust you service if you are not using nestjs.


"dev": "NODE_ENV=local-development nest build --webpack --webpackPath webpack.config.js --watch",
"dev-stg": "NODE_ENV=local-staging nest build --webpack --webpackPath webpack.config.js --watch",

```


## Contributing

Contributions are welcome! If you'd like to contribute to this project, please open a PR.

## License

[License Name] - [License Description]
