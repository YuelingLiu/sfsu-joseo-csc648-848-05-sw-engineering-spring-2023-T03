require("dotenv").config();
const express = require("express");
const { Client } = require("pg");

const app = express();

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
    console.log(client);
    await client.connect();
    const res = await client.query("SELECT * FROM some_table");
    console.log(res);
    await client.end();
  } catch (error) {
    console.log(error);
  }
};
connectDb();

app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
