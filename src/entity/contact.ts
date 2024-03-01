import { Column, CreateDateColumn, DeleteDateColumn, Entity, Unique } from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity()
export class Contact extends BaseEntity {
    @Column()
    title: string;

    @Column({ nullable: true })
    tel: string

    @Column({ nullable: true })
    phone: string

    @Column()
    email: string

    @Column({ nullable: true })
    alternate_email: string

    @Column({ nullable: true })
    address: string

    @Column({ type: "simple-array", nullable: true })
    socialLinks: string[]
}