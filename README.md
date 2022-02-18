# E-Shopper

An app that simulates some features of an e-commerce store.

## Table of Contents
* General Info
* Technologies
* Setup
* Swagger + Using the App
* Testing

## General Info
Welcome to e-shopper! This is a simple demo application meant to mimic a couple basic features that can be found on a typical e-commerce site.

On startup, the app will automatically load the necessary product data and insert it into the database. In a real world application, there could be many other ways to accomplish this, but that would depend on where the data is coming from and how often it would need to be fetched. In this case, it made sense to attempt to load the data each time the server starts by passing the URL into the method `loadProductsFromUrl`. This method takes a URL and saves the data it provides into a database. It could easily be called with a different URL for each source as needed. This is all done behind the scenes without any required action from the end-user.

The data will persist between reboots, so the database will need to be manually cleared if needed. If any data is provided from the URL source that already exists in the database, the app will simply not insert it and instead log an exception. However, it will insert any new variants or images that are found even if the product or variant already exists in the database.

## Technologies
* [Node.js](nodejs.org) using [NestJS](https://nestjs.com/) on top of [Express](https://expressjs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Docker](https://www.docker.com/)
* [Jest](https://jestjs.io/)
* [MySQL](https://www.mysql.com/)
* [TypeORM](https://typeorm.io/#/)

## Setup
This entire project is completely dockerized! To run the app: 

1. Clone the repo
2. Run `docker compose up` from the project’s root directory

This will build the image, create  (or restart) the database @ `localhost:3306`, pull the correct dependencies, and serve the API at `localhost:3434/api`.

NOTE: The api uses a global prefix of `api`.

The project is configured to use live reloading when running in Docker. Any change in the code should automatically restart the server.

You can also run the NestJS portion of the app by running `npm run start`, but you will need to ensure that the database is running and that your local environment has the correct dependencies.

## Swagger + Using the App
This app was configured to use [Swagger](https://swagger.io/).

With the app running, navigate to `http://localhost:3434/api/#/` to open the Swagger UI. From here, you can try out the endpoints in real-time by making HTTP requests. These responses will provide the persisted data from the database.

You can also make HTTP requests directly to `localhost:3434/api` using tools like curl or Postman.

## Testing
This project contains unit tests for the `ProductsService`. If this were a production application, I would have added unit tests for the controllers in addition to more extensive integration tests. In this case, testing the service was sufficient enough to cover most of the core functionality of the app such as: creating products, finding inventory, and finding a product by ID.

To run the tests: `npm run test`
