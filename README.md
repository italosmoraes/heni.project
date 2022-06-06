## Heni coding task - Italo Moraes

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

- Initially API was written con

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


### To run test suite:
--------------------
```
nvm use

yarn

yarn test
```


### Potential improvements and notes

- include an `env` file that reads the configuration vars from the server, for security and management. Left as vars here for easier setup and re-run of this project
- add proper data models for each of the objects one can query from the api
- user https://typegraphql.com/ for integrating graphql with typescript in a smoother way and building the schema from type annotations
- make the resource_types representation be classes to be used for persisting and other logic, instead of interfaces
- include filters for rank, sort, filterQuery as graphql input for the endpoint
(!) the resolving of rank, sort, classification is done using features from the provided harvard api. There could be a case for just querying raw data and then resolving within out this api, independently of what was provided by their api.
- Find a better way to define `outputFields` for each resource type
- Improve how one resolves the types coming from the harvard api

### Notes on the task


(!) the description of 'Prints' does not relate to anything in the harvard lib documentation, unless on searches through the available query fields within the resource types to find which ones have that option.This makes it confusing since one need to start infering if what is meant is some of the categories available, which may be called Print because they have images, or any of the `resource types` available are considered prints

[] Time spent: 2hs setup, 6hs from node express with routes version to the a graphql version, 1.5hs refining graphql endpoint,