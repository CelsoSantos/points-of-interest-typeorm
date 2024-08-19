import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { PointOfInterest } from "./PointOfInterest"

@Entity()
export class Address {

  // constructor(
  //   id: number,
  //   country: string,
  //   zip: number,
  //   city: string,
  //   house_number: number,
  //   poi: PointOfInterest
  // ) {
  //   this.id = id,
  //   this.country = country,
  //   this.zip = zip,
  //   this.city = city,
  //   this.house_number = house_number,
  //   this.poi = poi
  // }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  country: string

  @Column("int")
  zip: number

  @Column()
  city: string

  @Column("int")
  house_number: number

  @OneToOne(() => PointOfInterest)
  @JoinColumn()
  poi: PointOfInterest
}
