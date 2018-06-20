# Just-spammers
A simple Messenger starter web application just for my friends..


I have hoisted demo Application on Heroku https://spam-messenger.herokuapp.com/messages and database repository on MongoLAB

Application is starter MEAN stack website which uses Angular 4, Mongodb and Nodejs(Express Framework).

Initial Application setup for handling cross-origin and Http requests made on each path of application is set in app.js.

Package.json is configured with all the dependencies required to get started with node modules.

Application uses JWT(Json Web Tokens) and localstorage to implement authentication of users for each activity in the application.

Application uses webpack bundling to produce final production ready minified build available to public which is served statically to users from nodejs setup.

Application is built using standard MVC pattern
------------------------------------------------
>Routes directory handles all the backend and http requests made for the application by user using node.js

>assets directory handles the front end(view) functionality of the application developed using Angular.

>models directory has schema specification written in sync with mongodb database schema to map and handle user data storage and manipulation.

>public directory contains final production build.js (minified build) the only directory available for users on browser.



Application contains two main modules
-------------------------------------
>Messenger module : A simple SPA for users to communicate.

>Authentication module: An interactive module to authenticate users for signup/signin and communication using JWT (Json Web Tokens).


Mongodb connection string
--------------------------
Connection string is added in app.js file to connect with local database repository or hoisted repository.
Please update connection string to connect with your database repository.

Get Started
-------------
To run application on localhost:
>Run dev build using : npm run build.

>To start application :  npm start.

To hoist production build please use command : npm run build:prod
