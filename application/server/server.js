// server.js
require("dotenv").config();
const express = require("express");
const { client } = require("./db/db"); 

const searchRoutes = require("./controllers/search-routes");
const userRoutes = require("./controllers/user-routes");
const categoriesRoutes = require('./controllers/category-routes');

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/category', categoriesRoutes);
app.use("/search", searchRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
