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

Here are some basic usage examples for the exported classes and functions:

#### Creating an AWS Secret Client

```javascript
import { AWSSecretClient } from 'secret-manager-loader-2-env';
const awsSecretClient = new AWSSecretClient();
```

#### Loading Secrets

```javascript
import { SecretLoader } from "secret-manager-loader-2-env";
// Example configuration
import { ConfigManager } from "secret-manager-loader-2-env";

// Example usage
const myConfigManager: ConfigManager = {
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

// if(process.env.NODE_ENV === "local-development")
SecretLoader.loadKeys(config).then((keys) => {
  // Here you can run your local server, make sure to minimize hot reload using webpcak to reduce secret manager cost
  // You can run this function in the imports of the webpack.config.js
});
```

## Webpack example
```javascript
/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
require('ts-node').register();

//This file is running the function to load all the secrets using the environment config
require('./src/config/secrets-loader.ts');

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
      new CopyPlugin({
        patterns: [
          { from: 'src/templates', to: 'templates' }, // adjust 'src/templates' if your path is different
        ],
      }),
    ],
    devtool: 'source-map',
  };
};
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please open a PR.

## License

[License Name] - [License Description]
