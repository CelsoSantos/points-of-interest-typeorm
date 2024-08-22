import { Request, Response } from "express"
import { AppDataSource } from "../db/data-source";
import { PointOfInterest, Status } from "../models";
import { HttpStatusCode } from "../utils/HttpStatusCodes.enum";

export class PointsOfInterestController {
  private poiRepository = AppDataSource.getRepository(PointOfInterest);

  list = async (request: Request, response: Response) => {
    let page: number = 0;
    let per_page: number = 10;

    if (request.query.page) {
      page = parseInt(request.query.page?.toString());
    }

    if (request.query.per_page) {
      per_page = parseInt(request.query.per_page?.toString());
    }

    if (isNaN(page) || isNaN(per_page)) {
      return response.status(HttpStatusCode.BAD_REQUEST).send("Bad Request");
    }

    const skipItems = page * per_page;

    const result = await this.poiRepository
      .createQueryBuilder("pointOfInterest")
      .innerJoinAndSelect("pointOfInterest.address", "address")
      .innerJoinAndSelect("pointOfInterest.pumps", "pump")
      .innerJoinAndSelect("pump.fuel_products", "fuelProduct")
      .leftJoinAndSelect("pointOfInterest.business_hours", "businessHours")
      .skip(skipItems)
      .take(per_page)
      .getMany()

    return response.status(HttpStatusCode.OK).send(result);
  }

  getById = async (request: Request, response: Response) => {
    const id = request.params.id;
    // if (!UUID.isValid(id)) {
    //   return response.status(400).send("invalid point-of-interest ID")
    // }

    const poi = await this.poiRepository.findOne({
      relations: {
        address: true,
        pumps: {
          fuel_products: true
        },
        business_hours: true
      },
      where: { id }
    })

    if (!poi) {
      return response.status(HttpStatusCode.NOT_FOUND).send("unregistered point-of-interest");
    }
    return response.status(HttpStatusCode.OK).send(poi);
  }

  save = async (request: Request, response: Response) => {
    const { status, address, pumps, business_hours } = request.body;

    const poi = Object.assign(new PointOfInterest(), {
      status,
      address,
      pumps,
      business_hours
    })

    try {
      const result = await this.poiRepository.save(poi);
      return response.status(HttpStatusCode.OK).send(result);
    } catch (error) {
      return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  update = async (request: Request, response: Response) => {
    const id = request.params.id;
    const { status, address, pumps, business_hours } = request.body;

    let poi = await this.poiRepository.findOne({
      where: { id },
      relations: {
        address: true,
        pumps: {
          fuel_products: true
        },
        business_hours: true
      },
    });

    if (!poi) {
      return response.status(HttpStatusCode.NOT_FOUND).send("unregistered point-of-interest");
    } else {
      if (address) {
        poi.address = address
      }
      if (status == Status.OFFLINE || status == Status.ONLINE) {
        poi.status = status;
      }
      if (pumps) {
        poi.pumps = pumps
      }
      if (business_hours) {
        poi.business_hours = business_hours
      }
    }

    try {
      const result = await this.poiRepository.save(poi);
      return response.status(HttpStatusCode.OK).send(result);
    } catch (error) {
      return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  remove = async (request: Request, response: Response) => {
    const id =  request.params.id;
    // if (!UUID.isValid(id)) {
    //   response.status(400).send("invalid point-of-interest ID")
    // }

    let poiToRemove = await this.poiRepository.findOneBy({ id })
    if (!poiToRemove) {
      return response.status(HttpStatusCode.NOT_FOUND).send("unregistered point-of-interest");
    }
    try {
      let result = await this.poiRepository.remove(poiToRemove);
      return response.status(HttpStatusCode.OK).send("point-of-interest has been removed");
    } catch (error) {
      return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
