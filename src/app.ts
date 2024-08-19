/**
 * The following lines intialize dotenv,
 * so that env vars from the .env file are present in process.env
 */
// import debug from "debug";

import * as dotenv from "dotenv";
dotenv.config();

import http, { Server } from "http";
import express, { Express, Request, Response } from "express";
import * as bodyParser from "body-parser";

import { CommonRoutesConfig } from "./routes/common.routes.config";
import { PointsOfInterestRoutes } from "./routes/poi.routes";
import { HealthRoutes } from "./routes/health.routes";
import { AppDataSource } from "./db/data-source";

// establish database connection
AppDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })


const app: Express = express();
const server: Server = http.createServer(app);
const port = process.env.PORT || 3000;
const routes: Array<CommonRoutesConfig> = [];

const startServer = (async () => {
  server.listen(port);
  console.log(`[Server]: Server is running at http://localhost:${port}`)
});

app.use(express.json());

routes.push(new HealthRoutes(app));
routes.push(new PointsOfInterestRoutes(app));

startServer();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello! My name is Celso Santos');
});

export default app;
