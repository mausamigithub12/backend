import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(['email'])
export class newsletter{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    email:string
}