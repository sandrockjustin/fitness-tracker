# Project "Vitality" 
##### (pending; formerly fitness-tracker)
**Track workouts, plan meals, live healthy.**

# Project Description
**Vitality is an application designed to help end-users track workouts and nutrition plans so that they can meet their health goals. It has two primary features, workouts and nutritional data, which allow for a user to search for and track this type of information within their account.** 

# Installation

1. Perform an `npm install` to download dependencies for this project.

2. Acquire API keys for the following resources and store in your `env` file:
    - FOOD_API_KEY: https://spoonacular.com/food-api/console#Dashboard
    - API_NINJA_KEY: https://www.api-ninjas.com/api/exercises
  
3. Acquire a Google Client ID, Google Client Secret, and setup Google OAuth within Google Cloud Console. If you aren't familiar with this process, here is relevant [documentation](https://developers.google.com/identity/protocols/oauth2). Ensure that you store this information in your `env` file.
    - GOOGLE_CLIENT_ID: From Google Cloud Console.
    - Google_CLIENT_SECRET: From Google Cloud Console.
    - SERVER_SESSION_SECRET: Whatever secret you would like Express to use.

4. Under the `OAuth Consent Screen` register your email, as well as other team member emails, as test users. If this isn't done, then you will be refused at the entry point to the application.

5. Once you have registered an `OAuth Consent Screen`, ensure that the `OAuth 2.0 Client IDs` is setup correctly. Ensure that the website is declared as an Authorized Javascript Origin and that you specify Authorized Redirect URIs as necessary.

6. If necessary, update the `auth.js` Passport strategy as necessary. You shouldn't need to update many parts of this if your `env` file has been setup correctly. An example of how your strategy should be setup is provided [here](https://www.passportjs.org/packages/passport-google-oauth20/).

# Startup

We have developed several Node.js scripts for this project, with the two primary scripts being `npm start` (to start the server) and `npm run build` (to have Webpack transpile JSX). It is important to note that, by design, the server will not start listening on a port and it will not successfully start unless a connection can be established to the database. If you are experiencing issues here, ensure that your Mongoose and MongoDB processes are running in the background.

There are two other additional scripts that are particularly useful if you have exceeded your API quota. There exists a mock-data folder which can be updated to reflect a set of example data. 

  - The `npm run seed` will attempt to populate the database with five users; it is intentionally designed to _randomly_ populate User fields with data. This is intended to help with edge conditions and to help identify problems; if it is not desired then the `seedDatabase.js` file can be modified to meet testing needs.

  - The `npm run reap` will attempt to delete/clear the database of all users. It's more akin to a _purge_ but it is only intended to be used during testing. **As a warning, do not use the `npm run reap` command in cases where you don't want to delete items from the database. This command should eventually be disabled on deployment, or it risks us accidentally purging the database.**

```
  "start": "nodemon server/index.js",
  "build": "webpack",
  "seed": "node mock-data/seedDatabase.js",
  "reap": "node mock-data/reapDatabase.js"
```

# How It Works

## Frameworks, Libraries, Packages, & Plugins

|      Client      |      Server      |     Database     |           Miscellaneous          |
| ---------------- | ---------------- | ---------------- | -------------------------------- |
| React & React-DOM| Node.js          | MongoDB          | Mongoose / find-or-create plugin |
| MaterialUI       | Express          | Mongoose         | Babel & Babel Loader             |
| Axios            | Passport         |                  | Express / express-session        |
| Webpack          | Google OAuth 2.0 |                  | dotenv                           |
|                  | Webpack          |                  | eslint                           |
|                  | Nodemon          |                  | MaterialUI                       |

### Client

The client uses Webpack with Babel in order to transpile and bundle our components. In order to make our application neat, legible, and user-friendly we have opted to implement MaterialUI for handling the interface. Axios is used in the top-level components to perform requests to our server.

### Server

Our server imports several items for use, including our authentication strategy and database connection, which is available in the `auth.js` file and the `server/db/index.js` file respectively. The server imports these files so that they can be used within an Express instance. Most routes are secured with Passport and the Google OAuth 2.0 strategy, with a few _intended_ exceptions. The server `routes` folder contains all routes associated with specific endpoints.

The `server/index.js` expects for all sensitive information to be stored in the process environment; **never** store our secrets or API keys within a public config file. This would open our website to malign actors and it risks exposing user information that is intended to remain private.

### Database

A critical import is our connection to MongoDB / Mongoose from the `server/db/index.js` file. This file initializes a `UserSchema`, registers this schema to use the methods provided by the `find-or-create` plugin, and exports this alongside a connection to the server. Additionally a `RoutineSchema` is initialized that is used within workout components; this schema is associated with a `user_id` property which acts as a foreign key (indicates which user the saved routine belongs to).

## Entry to Application & Authentication
1. The entry point to our application is a Google Sign-in; this is handled by Passport with the Google OAuth 2.0 strategy. Navigation to routes within our server are prohibited if you have not or cannot be authenticated with this strategy.

2. Once a user logs in with the Google Sign-In, their user information is found (or initialized as empty) within our database. The database used for this project is called `fitness-tracker`. After the user is successfully created, subsequent requests will use a `req.user._id` property (created by Passport) to perform CRUD operations for that respective user.

3. The main application view is handled by a switch statement; the `view` is controlled as a state. Requests for a different view speak with the server, and the server attempts session validation and passport authentication during every request. If the user is authenticated and their session is valid, then the user is allowed to navigate through the website. If at any point there is deviant or malicious activity, our intent is to force a user signout and then force that user to log in again.

## Features for Application End-Users

1. **Account & Dashboard**
    - C - Create a new account.
    - R - Read stored data for their account across components, and in the dashboard view.
    - U - Update stored workouts and nutritional information. 
    - U - Updated stored profile information.
    - D - Delete their account and data.

2. **Workouts Management**
    - R - Read workouts for the current account, as well as reading data from external APIs.
    - C / U - Create and update new workouts for the user.
    - D / U - Delete (update) existing workouts for the user.

3. **Nutrition Management**
    - R - Read saved foods and nutritional information for the current account, as well as reading data from external APIs.
    - C / R - Read workouts and nutritional information to generate recommended meals for restoring calories.
    - C / U - Create and update existing foods and nutritional information for the user.
    - D / U - Delete (update) existing existing foods and nutritional information for the user.

4. **Routines Management**
    - C - Create a new routine with a specified name.
    - R - Read any routine associated with the current user.
    - U - Update any routine's name for the current user.
    - D - Delete any routine of specified name for the user.