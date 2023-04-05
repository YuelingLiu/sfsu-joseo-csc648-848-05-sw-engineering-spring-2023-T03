
require("dotenv").config();
const express = require("express");
const { Client } = require("pg");

// const apiRoutes = require("./controllers/api");
const searchRoutes = require("./controllers/search-routes");
const newPostRoutes = require("./controllers/newPost-routes");

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const connectDb = async () => {
  try {
    const client = new Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    });
    await client.connect();
    await client.end();
  } catch (error) {
    console.log(error);
  }
};
connectDb();

app.use(cors());
// app.use("/api", apiRoutes);
app.use("/search", searchRoutes);
// app.use("/createPost", newPostRoutes);

app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
