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

#### Production access

A Heroku app has been deployed so that you can just use Postman to make GraphQL queries. It's available here:

https://mighty-tor-06298.herokuapp.com/graphql

#### Queries

##### Find by uid

```graphql
query {
  getEventByUid(uid: "17237693-4a2b-4a18-8344-27a807895ed9") {
    _id
    type
  }
}
```

##### Find by pagination

```graphql
query {
  getEvents(page: 0) {
    _id
    type
  }
}
```

##### Find relative to date

```graphql
query {
  getEventsOnDate(date: "2017-09-25") {
    _id
    type
  }
}
```
