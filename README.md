# TechVariable Assignment

> this repository contains assignment for Programmer Analyst position at
> TechVariable

things I have implemented:

- UI, built using React, Material-UI and StyledComponents (!CRA)
  - state management(using context and hooks)
  - loaders, layouts etc
- API, built using Node, PostgreSQL and Sequelize ORM
  - create new records
  - read data from client side
  - update record(not implemented on client side)

## scripts

there are a few scripts for making development and production seamless.

- client
  - `lint`: lints code using `eslint` and looks for error
  - `dev`: starts `webpack` in development mode with `webpack-dev-server`
  - `build`: generates a prod-grade build
- server
  - `lint`: lints code using `eslint` and looks for error
  - `dev`: starts node API server in development mode using `nodemon` and debug
    flags
  - `build`: generates a prod-grade build

## local development

this project requires `node v12+`, with either `npm` or `yarn` as package
manager.

### setup

clone this repository using git. change dir to `client/` and install packages
using yarn. once done, do the same for `server/`.

then, copy `server/.env.example` to `server/.env` and fill it PostgreSQL
Connection string.

### run

to run `client` and `server` in parallal, open two `terminal`. in first one, go
to `client/` using `cd`. and run `yarn webpack --watch serve`(TODO: make this
available through yarn scripts)

in second terminal, `cd` to `server/` and run `nodemon src/index.js`. you can
optionally ser env variable `DEBUG=app*` if you wish to log debug informations.

- web front-end: `http://localhost:2000`
- api server: `http://localhost:3456`

alternatively, project can be started using the [`build`](./start.sh) script.

## deployment

the client and the server, both will be deployed separately. React codebase can
be deployed to github pages. and the API server requires a server with Node and
npm installed to be deployed.

following steps describes how to deploy this application to production.

- go to `client/` dir. build it using `yarn build` this will generate a new
  directory called `build` inside `client/`. this `build/` dir should be
  deployed to a static host. I deployed it to github
  pages(https://abdus.github.io/techvariable)
- `server/` can be deployed to heroku. it does not require additional
  configurations. my deployment endpoint: (https://techvariable.host.abdus.net/api/v1/)

That's It.
