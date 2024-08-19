import { PointsOfInterestController } from '../controllers/pointOfInterest.controller';
import { CommonRoutesConfig } from './common.routes.config';
import express from 'express';

export class PointsOfInterestRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'PointsOfInterestRoutes');
  }

  configureRoutes() {

    const poiController = new PointsOfInterestController();

    this.app.route(`/points-of-interest`)
      .get(poiController.list)

    this.app.route(`/points-of-interest/:id`)
      .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
        // this middleware function runs before any request to /restaurants/:restaurantId
        // but it doesn't accomplish anything just yet---
        // it simply passes control to the next applicable function below using next()
        next();
      })
      .get(poiController.getById)
      .put(poiController.save)
      .patch(poiController.save) //TODO: make an update handler
      .delete(poiController.remove);

    return this.app;
  }
}
