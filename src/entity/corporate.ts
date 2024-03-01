import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { IsEmail, Length } from "class-validator";


@Entity()
export class Corporate extends BaseEntity {

    @Column()
    title: string

    @Column({ nullable: true })
    banner: string

    @Column({ nullable: true })
    featured_image: string

    @Column("longtext")
    content: string
}