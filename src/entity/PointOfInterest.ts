import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { Address } from "./Address"
import { Pump } from "./Pump"
import { Status } from "./Status.enum"

@Entity()
export class PointOfInterest {

  // constructor(
  //   id: number,
  //   status: Status,
  //   address: Address,
  //   pump: Pump[],
  //   business_hours: string
  // ) {
  //   this.id = id,
  //   this.status = status,
  //   this.address = address,
  //   this.pump = pump,
  //   this.business_hours = business_hours
  // }

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "enum",
    enum: Status,
    default: Status.OFFLINE
  })
  status: Status

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address

  @OneToMany(() => Pump, (pump) => pump.poi)
  pump: Pump[]

  @Column()
  business_hours: string

}
