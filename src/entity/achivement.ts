import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./baseEntity";


@Entity()
export class achievements extends BaseEntity {

    @Column()
    title: string

    @Column()
    image: String

    @Column()
    from: string

    @Column()
    date: string

}
