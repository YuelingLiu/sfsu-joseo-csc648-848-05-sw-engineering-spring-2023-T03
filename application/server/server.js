// server.js
require("dotenv").config();
const express = require("express");
const { client } = require("./db/db"); 

const searchRoutes = require("./controllers/search-routes");
const newPostRoutes = require("./controllers/newPost-routes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/search", searchRoutes);
app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
