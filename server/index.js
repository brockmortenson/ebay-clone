require('dotenv').config();

const express = require('express');
const massive = require('massive');
const session = require('express-session');
const path = require('path');

const app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 14
        }
    })
);



massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then((db) => {
    app.set('db', db)

    app.listen(SERVER_PORT, () => console.log(`DB up and server is running on port ${SERVER_PORT}`))
}).catch(err => {
    console.log(err)
});