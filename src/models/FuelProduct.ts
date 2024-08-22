import { UUID } from "crypto"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm"
import { Pump } from "./Pump"

@Entity()
export class FuelProduct {

  @PrimaryGeneratedColumn("uuid")
  id: UUID

  @Column("text")
  name: string

  @Column("json")
  price: JSON

  @ManyToMany(() => Pump, (pump) => pump.fuel_products)
  pumps: Pump[]

}
