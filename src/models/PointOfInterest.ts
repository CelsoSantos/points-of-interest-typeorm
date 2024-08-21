import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm"
import { Address } from "./Address"
import { Pump } from "./Pump"
import { Status } from "./Status.enum"
import { BusinessHours } from "./BusinessHours"

@Entity()
export class PointOfInterest {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    type: "enum",
    enum: Status,
    default: Status.OFFLINE
  })
  status: Status

  @OneToOne(() => Address, (address) => address.poi, { cascade: true })
  @JoinColumn()
  address: Address

  @OneToMany(() => Pump, (pump) => pump.poi, { cascade: true })
  pumps: Pump[]

  @ManyToOne(() => BusinessHours, (businessHours) => businessHours.pois, { cascade: true })
  business_hours: BusinessHours

}
