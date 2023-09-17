import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    "ADMIN"="ADMIN",
    "SUPPORT"="SUPPORT"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:200})
    fullname:string;

    @Column({unique: true, length:50})
    username:string;

    @Column({nullable:true})
    refreshToken:string;

    @Column({length: 100, enum:UserRole})
    user_level:UserRole;

    @Exclude()
    @Column()
    password:string;

    constructor(private readonly partial:Partial<User>){
        Object.assign(this, partial);
    }

}
