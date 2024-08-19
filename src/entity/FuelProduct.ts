import { UUID } from "crypto"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class FuelProduct {

  // constructor(
  //   id: UUID,
  //   name: string,
  //   price: JSON
  // ) {
  //   this.id = id,
  //   this.name = name,
  //   this.price = price
  // }

  @PrimaryGeneratedColumn("uuid")
  id: UUID

  @Column()
  name: string

  @Column({ type: "json" })
  price: JSON

}
