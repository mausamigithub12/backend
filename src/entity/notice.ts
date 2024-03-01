import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity()
export class Notice extends BaseEntity {
    @Column()
    date: string

    @Column()
    title: string

    @Column()
    type: string

    @Column("longtext")
    description: string

    @Column()
    image:String
}