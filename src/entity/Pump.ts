import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { FuelProduct } from "./FuelProduct"
import { PointOfInterest } from "./PointOfInterest"

@Entity()
export class Pump {

  // constructor(
  //   id: number,
  //   name: string,
  //   fuel_products: FuelProduct[],
  //   poi: PointOfInterest
  // ) {
  //   this.id = id,
  //   this.name = name,
  //   this.fuel_products = fuel_products,
  //   this.poi = poi
  // }

  @PrimaryGeneratedColumn()
  id: number //TODO: Make UUIDv4

  @Column()
  name: string

  @OneToMany(() => FuelProduct, (fuelProduct) => fuelProduct.id)
  fuel_products: FuelProduct[]

  @ManyToOne(() => PointOfInterest, (poi) => poi.pump)
  poi: PointOfInterest

}
