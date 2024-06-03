import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./routes";
import { AppDataSource } from "./data-source";

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(bodyParser.json());
app.use(router);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
