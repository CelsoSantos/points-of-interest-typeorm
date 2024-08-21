import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { PointOfInterest } from "./PointOfInterest"

@Entity()
export class BusinessHours {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("smallint")
  type: number

  @Column()
  description: string

  @OneToMany(() => PointOfInterest, (poi) => poi.business_hours)
  pois: PointOfInterest[]

}
