/**
 * The following lines intialize dotenv,
 * so that env vars from the .env file are present in process.env
 */
// import debug from "debug";

import * as dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
// import * as bodyParser from "body-parser";

import { CommonRoutesConfig } from "./routes/common.routes.config";
import { PointsOfInterestRoutes } from "./routes/poi.routes";
import { HealthRoutes } from "./routes/health.routes";
import { AppDataSource } from "./db/data-source";
import { dataInit } from "./db/data-init";
import { shutdown, startServer } from "./server";

const app: Express = express();
const routes: Array<CommonRoutesConfig> = [];

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello! My name is Celso Santos');
});

routes.push(new HealthRoutes(app));
routes.push(new PointsOfInterestRoutes(app));

// establish database connection
AppDataSource
  .initialize()
  .then(async () => {
    // Initialize data
    await dataInit();
    console.log("Data Source has been initialized!")
    // Start server
    startServer();
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server')
  shutdown();
  await AppDataSource.destroy()
})

export default app;
