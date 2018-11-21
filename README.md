# ZZ2 F5 CI bootstrap

## Run the app

- `npm install` to install all dependencies
- `npm run start` to start the app

## Run the app at ISIMA

- `npm run isima-install` to install all dependencies (if fails, no worry and continue)
- `npm run isima-start` to start the app

## Controllers

Controllers are located in the `src/controllers` folder. They contains routing of the app and use [Express](http://expressjs.com/). Create one controller for each part of the app.

## Views

Views are located in the `src/views` folder. View are [EJS](http://ejs.co/) templates.

> Don't forget to include header and footer with `<%- include('_layout/header'); -%>` and `<%- include('_layout/footer'); -%>` to have the basic HTML skeleton with all assets imported.

## Services

Services are located in the `src/services` folder. It contains all the logic of the app.

## Storage

JSON are located in the `src/storage` folder. It contains all the json files used as database.

## Assets (Public folder)

All assets (JS, CSS, Images) are located in public folder. These assets are accessible via `/public/{asset-name}` URL.
For example: `/public/css/main.css` is the url to access `public/css/main.css`.

## Tests

- `npm run test` to run test suites.
- `npm run isima-test` to run test suites at ISIMA.

Tests can be located in every `__tests__` folder.
