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

### Environment

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


### Potential improvements

[ ] include an `env` file that reads the configuration vars from the server, for security and management
[ ] add proper data models for each of the objects one can query from the api