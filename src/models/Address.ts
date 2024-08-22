import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { PointOfInterest } from "./PointOfInterest"

@Entity()
export class Address {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("text")
  country: string

  @Column("int")
  zip: number

  @Column("text")
  city: string

  @Column()
  street: string

  @Column("int")
  house_number: number

  @OneToOne(() => PointOfInterest, (poi) => poi.address)
  poi: PointOfInterest
}
