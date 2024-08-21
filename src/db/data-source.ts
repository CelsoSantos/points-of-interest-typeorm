import "reflect-metadata"
import { DataSource } from "typeorm"

import * as dotenv from "dotenv";
dotenv.config();

import { Address, PointOfInterest, Pump, BusinessHours, FuelProduct } from "../models"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  username: process.env.POSTGRES_APP_USER,
  password: process.env.POSTGRES_APP_PASSWORD,
  database: process.env.POSTGRES_APP_DB,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  synchronize: true,
  logging: false,
  entities: [Address, BusinessHours, FuelProduct, PointOfInterest, Pump],
  migrations: [],
  subscribers: [],
})
