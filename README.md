<h1>2DAW FIRST PROJECT</h1>

This web page works with 2 backends (GraphQL and Rest) and the fronten (AngularJS 1.5).  
Poject developed by *Marc Torres Martínez*.
Imagine a community of people who likes sharing his cooking recipes. This page is about it, it was the first idea I had and I kept doing this project with that idea. You can share your foods, favorite recipes, follow users, etc.

---

## Getting started

If you want to run this repository locally:

- Clone this repository to a folder
- Install MongoDB and run it
- Install the packages with 'npm install' inside the folders: frontend, backend/graphql and backend/rest
- Now you can execute the backends and frontends with: **frontend: gulp**, **backends: npm start**.



---

## Features

| Page | Features |
| - | - |
| Home | The home shows a carousel and the categories |
| Recipes/Foods | (rest backend) Lists all the user's recipes paginated, and the users' recipes that you follor (your feed) |
| Products | (graphQL backend) Lists all the user's recipes paginated, and the users' recipes that you follow (your feed) |
| Products Editor | (graphQL backend) You can create a product, only if logged in |
| Recipes Editor | (rest backend) You can create a recipe, only if logged id |
| Profile | Lists your profile, your recipes and your favorited recipes |


<br>

| Services | Features |
| - | - |
| Register | You can register manualy or register with Google or GitHub |
| Login | You can login manually or login with GitHub or Google |
| Favorites | You can favorite recipes |
| Follow | You can follow users |

<br>

| Technical Features |  |
| - | - |
| Authentication | You need to be signed in (authenticated) to be allowed to do some actions |
| Backend Communication | You can use Fetch or Axios to connect a backend with the other |
| Relational data | All the data uses or is used in another |
| Test | You can implement your own tests to try them |
| Seed | Random data generated with Faker.js |

---

### Technologies used in this project

* Node.js
* AngularJS 1.5
* GraphQL
* Docker
* MongoDB

### Other technologies used

* Conduit - starting template
* Express.js
* Apollo-server
* Apollo-client
* JWT 
* Toaster
* Faker.js
* Gulp
* Swagger
* Passport.js
* Mongoose
* Axios
* Fetch

---

## Backend Application Structure

- `rest` - The REST backend works on Node.js and Express, mostly based in Thinkster's Conduit Node.JS example.
- `graphql` - The GraphQL backend works on Express with Apollo Server on /api and /api/graphqlauth (for authorization headers).

- `[rest]/app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models used in the application.
- `[graphql]/index.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the models, the schemas and the resolvers used in the application.

- `[rest and graphql]/config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `[rest an graphql]/models/` - This folder contains the Mongoose models definitions.
- `[rest]/routes/` - This folder contains the route definitions for our API.
- `graphql/src/graphql` - This folder contains the resolvers and schemas definitions for the GraphQL server.

## Frontend Application Structure

- `src` - Main frontend code in AngularJS 1.5.

- `src/js/components` - This folder contains the components helpers, for all the application.
- `src/js/services` - This folder contains the services for each module.
- `src/js/app.js` - The entry point to the application.

---
