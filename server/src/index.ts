import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";
import cors from 'cors';

import dbConfig from "./database";
import Router from "./routes";

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(cors()); // not having cors enabled will cause an access control error
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(Router);

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
