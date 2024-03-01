import { Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity()
export class Service extends BaseEntity {
    @Column()
    name: string

    @Column({ nullable: true })
    featured_image: string

    @Column({ nullable: true })
    banner: string

    @Column({ nullable: true })
    content: string
}