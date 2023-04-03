
require("dotenv").config();
const express = require("express");
const knex = require("knex");

const app = express();

const PORT = process.env.PORT || 3000;

const connectDb = async () => {
  try {
    const db = knex({
      client: "pg",
      connection: {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
      },
    });
    await client.connect();
    const res = await client.query("SELECT * FROM public.\"users\"");
    console.log(res);
    await client.end();
  } catch (error) {
    console.log(error);
  }
};
connectDb();

app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));