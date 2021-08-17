import express, { Application } from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";

import dbConfig from "./database";

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
