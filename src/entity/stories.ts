import { Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity";


@Entity()
export class Stories extends BaseEntity{

    @Column()
    post:string

    @Column()
    name:string

    @Column()
    company:string

    @Column()
    category:string

    @Column()
    image:string
}