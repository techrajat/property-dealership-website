# RK Homes

This website is for property dealership where a user can buy properties of his/her choice via an agent. The user can also sell properties on this website.

This web-application is developed using the following technologies:

## Frontend
- HTML
- CSS (including Bootstrap)
- JavaScript

## Backend
- Node.js
- MySQL

## Prerequisites

Before you can install and run this software, you must have the following prerequisites installed:

- Node.js (version 14 or later)
- npm (version 6 or later)
- MySQL (version 8 or later)
- MySQL Workbench (latest version)

If you don't have Node.js or npm installed, you can download and install them from the [Node.js website](https://nodejs.org/en/). If you don't have MySQL or MySQL Workbench installed, you can download and install them from the [MySQL website](https://dev.mysql.com/downloads/). 

Make sure to install the latest versions of Node.js, npm, MySQL, and MySQL Workbench to ensure compatibility with this software.

To import the provided database, follow these steps:

1. Extract the database zip file present in the root directory.
2. Open MySQL Workbench and connect to your MySQL database.
3. Click on `Server > Data Import`.
4. Select `Import from Self-Contained File` and browse to the location of the extracted database file.
5. Under `Default Schema to be Imported To`, select `New...` and enter the name "project" for the database.
6. Click `Start Import` to import the database.

## Installation

- Clone the repository or download the source code:
`git clone https://github.com/techrajat/property-dealership-website`

- Install dependencies by running the following command in the project directory:
`npm install`


## Configuration

Create a `.env` similar to the `.env.example` file in the root directory and make the following changes to it:
- Replace `Your mysql username` with with the username of your mysql local server (usually "root").
- Replace `Your mysql password` with with the password of your mysql local server.

## Starting the app

- Run the following command in the project directory:
`nodemon .\app.js` or `node .\app.js`

- Navigate to `http://localhost:3000` in your web browser to view the application.