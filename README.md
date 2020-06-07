### Sentiance Challenge

#### Quick start

A `.env.example` file is provided which just needs a value for the environment.
Create a `.env` file in the root directory with the following for local development:

```dotenv
MONGODB_URI=mongodb://localhost:27017/sentiance-api
```

Make sure you have nvm 12.x.x installed locally as per the .nvmrc file spec.

```shell script
$ yarn install
$ yarn seed
$ yarn start:dev
```

Locally, a GraphQL playground will be available on `localhost:3001/graphql`

To run tests:

```shell script
yarn test
yarn test:spec
yarn test:integration
```
