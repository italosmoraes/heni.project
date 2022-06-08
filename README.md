## Heni coding task - Italo Moraes

### The task
Using the api available at https://github.com/harvardartmuseums/api-docs,
create a basic api and front end app which does the following:

Delivers an API that is callable from a React built client and returns the following
unauthenticated information:
1. A feed of all public items classified as “Prints”, paged in pages of 10, ordered by rank,
descending, that have images and have been verified to the ‘Best’ standard.
2. Provide a basic react driven front end for the feed that displays the image.
3. Provide information on the detail of print you feel may be relevant (title etc).
4. Commit your code for the server and the client to GitHub and provide us with the url to the
repository.
5. Add any tests you feel are required, where necessary.

Notes:
- Design is not important here, we are more interested in coding style and practices.
- You may use Express, Bootstrap, Redux, Apollo Client, Create-React-App or other 3rd party
libraries / npm modules etc
- Please show the use of GraphQL.

This is your api key: `c28e4be0-4c0e-11ea-90d6-25d9a9fe80fc`


### Notes on the solution

- A nodejs express server exposing a graphql endpoint
- The server only resolves the items classified as Prints from the harvardartmuseums api
- A few notes on TODOs and improvements are written across the codebase
- As seen from the commits, development was done from the ground up starting with express and building up to test the harvard api and then introduce graphql. With this focus on the e2e, the mindset was it was to see a minimal e2e solution working - while also learning about the harvard api usage/features - and then improve on it, including tests.

- The web app is a simple Feed app, including pagination capabilities and using graphql
- No FE components tests are included

### Environment
---------------

This project was built using:
- yarn
- nvm
- Node v16.15.0
- Jest
- Typescript
- VSCode

### To build locally
--------------------

1. Install npm
2. Install npx

On the command line:
```
# compile typescript
npx tsc
```

While on the main folder
```
yarn
```

#### API:
----
...while in the api folder

```
nvm use
```

```
yarn
```

```
yarn dev
```

Suggestion on testing the api directly:
1. download https://insomnia.rest/
2. Create new request, copy and past curl from 'graphql-query-curl.txt' file 

#### Web-App:
----
...with the API running locally
and
...while in the web-app folder


```
nvm use
```

```
yarn
```

```
yarn start
```

### To run test suite:
--------------------

API:
```
nvm use

yarn

yarn test
```


### Potential improvements and notes

On the API:
- include an `env` file that reads the configuration vars from the server, for security and management. Left as vars here for easier setup and re-run of this project
- add proper data models for each of the objects one can query from the api
- user https://typegraphql.com/ for integrating graphql with typescript in a smoother way and building the schema from type annotations
- make the resource_types representation be classes to be used for persisting and other logic, instead of interfaces
- include filters for rank, sort, filterQuery as graphql input for the endpoint
(!) the resolving of rank, sort, classification is done using features from the provided harvard api. There could be a case for just querying raw data and then resolving within out this api, independently of what was provided by their api.
- Find a better way to define `outputFields` for each resource type
- Improve how one resolves the types coming from the harvard api
- better handle incorrect FE input. At the moment the api just injects defaults
- Resolve correlated items like `people`, which is a field for `Object`, and make that available to the FE
- Further look at errors that could happen in fetching the harvard api, and properly handling them

Tests:
- they are currently hitting an external API, which is not ideal. But kept like this due to the nature of the task.
- the above means that we are also bound to changes in the external API, which could break the tests. So this is a blessing and a curse.
- mocking the response from axios to return the expected records would be anothe way to go
- add tests to verify data models returned from external api and to validate the hydration of records before responding to the request.

On the web-app:
- better align the types with the api one. maybe making a shared types library
- better handling of the FeedItem size as per screen sizes and image sizes
- improve visual design of components
- pull to load more feature
- better clean up create-react-app files
- standardise styles to be re-used across components
- create a store using mobx or some other patterns which is not redux, to keep the feeds data

### Notes on the task

(!) the description of 'Prints' does not relate to anything in the harvard lib documentation, unless on searches through the available query fields within the resource types to find which ones have that option.This makes it confusing since one need to start infering if what is meant is some of the categories available, which may be called Print because they have images, or any of the `resource types` available are considered prints

(!) Time spent:
I really took my time to setup everything from scratch, including TS and node (express) and building up the features one by one.
2hs setup, 6hs from node express with routes version to the a graphql version, 1.5hs refining graphql endpoint, about 4hs on building the Feed, 1.5hs on adding tests and wrapping up the project