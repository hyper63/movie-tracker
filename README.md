# movie tracker

movie tracker is a reference application for hyper63, it should showcase an example way
of how you might use hyper63 to build applications.

the movie tracker application is a way to log the movies or tv series you have watched,
and rank them to create your own rating site that others might find useful.

The app needs to support multiple user accounts.
For each account the user can

- list up to 100 movies
- log when they watch the movie
- add movies to watch
- remove movies from their list
- rank the movie on their top 100 list

The application has the following layers:

- app - frontend ux
- api - endpoints to serve app
- core - business logic, movies and accounts
- services - backend services data, storage, cache, search

Also in this repository is a PoC of @hyper63/client located in the
`packages/client` folder. This client creates a wrapper around the
hyper63 REST API.
