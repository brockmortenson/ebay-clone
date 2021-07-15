require('dotenv').config();

const express = require('express');
const massive = require('massive');
const session = require('express-session');
const path = require('path');

/* CONTROLLER IMPORTS */
const userCtrl = require('./controllers/userCtrl');

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



/* AUTH ENDPOINTS */

// REGISTER
app.post('/auth/register', userCtrl.register);

// LOGIN
app.post('/auth/login', userCtrl.login);

// LOGOUT
app.delete('/auth/logout', userCtrl.logout);

// DELETE ACCOUNT
app.delete('/auth/delete/:id', userCtrl.deleteAccount)

// USER SESSION
app.get('/auth/session', userCtrl.getSession);

// CHANGE PASSWORD
// app.put('/auth/change');



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