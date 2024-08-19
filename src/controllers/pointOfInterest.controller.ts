import express, { Request, Response } from "express"
import { AppDataSource } from "../db/data-source";
import { PointOfInterest } from "../entity/PointOfInterest";

export class PointsOfInterestController {
  private poiRepository = AppDataSource.getRepository(PointOfInterest);

  list = async (request: Request, response: Response) => {
    const result = await this.poiRepository.find();
    response.status(200).send(result);
  }

  getById = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id)

    const poi = await this.poiRepository.findOne({
      where: { id }
    })

    if (!poi) {
      return "unregistered point-of-interest"
    }
    response.status(200).send(poi);
  }

  save = async (request: Request, response: Response) => {
    const { status, address, pumps, business_hours } = request.body;

    const poi = Object.assign(new PointOfInterest(), {
      status,
      address,
      pumps,
      business_hours
    })
    const result = await this.poiRepository.save(poi);
    response.status(200).send(result);
  }

  remove = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id)
    let poiToRemove = await this.poiRepository.findOneBy({ id })
    if (!poiToRemove) {
      return response.status(200).send("this point-of-interest does not exist");
    }
    await this.poiRepository.remove(poiToRemove);
    response.status(200).send("point-of-interest has been removed");
  }
}
