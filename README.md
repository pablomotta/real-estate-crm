# Real Estate CRM

![App Logo](client/img/eat-da-burger.png)

## Description

### Eat da Burger is a full stack app using Express-Handlebars, Express, Node.js and MySQL.

On this app users can:

-   Add their favorite burgers to a favorite burger list.
-   Mark burgers as devoured, sending the burger to the devoured list.
-   Delete burgers from the devoured burger list.

## Prerequisites

-   [NPM](https://www.npmjs.com/get-npm)
-   [NodeJS](https://nodejs.org/en/)
-   [MySQL Workbench](https://www.mysql.com/products/workbench/)

## Installation

On your MySQL Workbench, run the following commands:

-   `CREATE DATABASE burgers_db`
-   `USE burgers_db`

-   `CREATE TABLE burgers ( id int NOT NULL AUTO_INCREMENT, burger_name varchar(255) NOT NULL, devoured BOOLEAN DEFAULT false, PRIMARY KEY (id) );`

On your command line, run the following commands:

-   `Git clone git@github.com:pablomotta/burger-CRUD-APP.git`

-   `npm install`

-   `npm start`

## Author

-   **Pablo Motta** - [github profile](https://github.com/pablomotta)

## Live App

[Click here to visit the live website.](https://eat-da-burger-pm.herokuapp.com/)
