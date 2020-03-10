# DNA mutations

## Get Set Up With A Development Environment

### Pre-Requisites

- [Node.js version 12.x](https://nodejs.org/en). (See `.nvmrc`)
  - You can also install it with NVM

  ``` bash
  # Change directory to this repository.
  nvm install
  nvm use
  ```
- AWS IAM user (programmatic access) with permissions to:
  - API Gateway
  - S3
  - Lambda
  - DynamoDB
  - SSM
- Java Runtime Engine (JRE) version 6.x or newer (for having DynamoDB locally)

### How To Start

Using the right Node.js version, install all NPM dependencies, after dependencies installation
another command is ran for you by the `postinstall` hook, which basically installs DynamoDB locally.

``` bash
npm install
```

Copy `.env.example` into `.env` to have the required environment variables set for us on
development.

``` bash
cp .env.example .env
```

Run the application, at this point we are using `serverless-offline` to run the Lambdas locally:

``` bash
npm run dev
```

The application is now up and running. Your Lambdas are running at http://localhost:3000/.

## Deployments

This project uses CircleCI for automated deploys, on every new commit that lands on
`develop`/`master` this is what will happen:

- Project gets builded (environment variables are fetched from AWS SSM Parameter)
- Linter and automated tests will run
- An approval is requested (prod only)
- API Gateway endpoints are created, lambdas are deployed
- DynamoDB migrations are run if needed

> You can check all this on [.circleci/config.yml](.circleci/config.yml) and
[serverless.yml](serverless.yml).
