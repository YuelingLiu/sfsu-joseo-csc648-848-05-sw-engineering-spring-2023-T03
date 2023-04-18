// server.js
require("dotenv").config();
const express = require("express");
const { client } = require("./db/db"); 

// sessions
const session = require('express-session');
const bodyParser = require('body-parser');


const searchRoutes = require("./controllers/search-routes");
const userRoutes = require("./controllers/user-routes");
const categoriesRoutes = require('./controllers/category-routes');

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;

// cores
app.use(cors());

// sessions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to 'true' for production in a HTTPS environment
}));

// routes
app.use('/category', categoriesRoutes);
app.use("/search", searchRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
