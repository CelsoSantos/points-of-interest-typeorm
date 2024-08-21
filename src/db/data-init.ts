import { AppDataSource } from "./data-source";
import { Address, PointOfInterest, Pump, BusinessHours, FuelProduct, Status } from "../models";

export const dataInit = async () => {
  const addrRepo = AppDataSource.getRepository(Address);
  const poiRepo = AppDataSource.getRepository(PointOfInterest);
  const pumpsRepo = AppDataSource.getRepository(Pump);
  const businessHoursRepo = AppDataSource.getRepository(BusinessHours);
  const fuelProductsRepo = AppDataSource.getRepository(FuelProduct);

  // Create Fuel Products
  const prod1 = new FuelProduct();
  prod1.id = "66837c0a-4770-4349-a8ce-f3e531822d15";
  prod1.name = "DIESEL";
  prod1.price = JSON.parse('{ "EUR": 1.00, "CHF": 1.00, "USD": 1.00 }');
  let prod1Res = await fuelProductsRepo.save(prod1)
  console.log("FuelProduct 1 created!");

  const prod2 = new FuelProduct();
  prod2.id = "4053be8b-e5d1-42f5-93cc-306584890a06";
  prod2.name = "UNLEADED 95";
  prod2.price = JSON.parse('{ "EUR": 2.00, "CHF": 2.00, "USD": 2.00 }');
  let prod2Res = await fuelProductsRepo.save(prod2);
  console.log("FuelProduct 2 created!");
  // End Fuel Products

  // Create Business Hours Cases
  const hours1 = new BusinessHours();
  hours1.id = "4e712ebd-2601-489b-8afc-881521f41ad4";
  hours1.type = 1;
  hours1.description = "Open Monday to Friday from 8 AM to 8 PM, Saturdays from 8 AM to 6 PM, closed on Sundays and public holidays"
  let hRes1 = await businessHoursRepo.save(hours1);

  const hours2 = new BusinessHours();
  hours2.id = "9d6ee6d9-d5e0-43f9-8d25-5206e86872cc";
  hours2.type = 2;
  hours2.description = "Open daily, including public holidays"
  let hRes2 = await businessHoursRepo.save(hours2);

  const hours3 = new BusinessHours();
  hours3.id = "72494a1d-c64c-42b2-95c2-afcc88927ad7";
  hours3.type = 3;
  hours3.description = "Open Monday to Thursday from 6 AM to 8 PM, Fridays from 6 AM to 4PM, closed on Saturdays, Sundays and public holidays"
  let hRes3 = await businessHoursRepo.save(hours3);
  console.log("BusinessHours created!")
  // End Business Hours

  // Create POIs
  const poi = new PointOfInterest();
  poi.id = "7737cc63-4024-4626-984d-5dadabf784ff";
  poi.status = Status.ONLINE;
  poi.business_hours = hRes1;
  let poiRes = await poiRepo.save(poi);
  console.log("POI created!");
  // End POIs

  // Create Addresses
  const addr1 = new Address();
  addr1.id = "a01b3f95-9fc8-4a99-837d-10a006e1a642";
  addr1.country = "Portugal";
  addr1.zip = 2400;
  addr1.city = "Lisbon";
  addr1.street = "R. Joaquim David";
  addr1.house_number = 127;
  addr1.poi = poiRes;
  await addrRepo.save(addr1);
  console.log("Address created!")
  // End Addresses

  // Create Pumps
  const pump1 = new Pump();
  pump1.id = "2ca3dd63-55e7-40e0-a580-f850a5f50aeb"
  pump1.name = "1";
  pump1.poi = poiRes;
  pump1.fuel_products = [prod1Res, prod2Res]
  // pump1.fuel_products = [prod1, prod2]
  await pumpsRepo.save(pump1);
  console.log("Pump created!")
  // End Pumps
}
