"use strict";
const express = require("express");
const app = express();
const path = require('path');

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require('dotenv').config();

const session = require('express-session');
const passport = require('passport');
require('./auth/passport');

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

const cors = require('cors');
app.use(
    cors({
        origin: "http://localhost:5173", // Vite frontend URL
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    })
);


const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);
app.use('/auth', require('./auth/authRoute'));

// Serve the static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../react-frontend-client/dist')));

app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname, '../react-frontend-client/dist', 'index.html'));
});

console.log("CLIENT_BASE_URL =", process.env.CLIENT_BASE_URL);
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});