import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:200})
    name:string

    @Column({length:100})
    industry:string
}
