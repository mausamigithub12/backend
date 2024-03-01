import { Collection, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class message{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    message:string
}