import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { FuelProduct } from "./FuelProduct"
import { PointOfInterest } from "./PointOfInterest"

@Entity()
export class Pump {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("text")
  name: string

  @ManyToMany(() => FuelProduct, (fuelProduct) => fuelProduct.pumps, { cascade: true })
  @JoinTable()
  fuel_products: FuelProduct[]

  @ManyToOne(() => PointOfInterest, (poi) => poi.pumps)
  poi: PointOfInterest

}
