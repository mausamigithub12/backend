
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./baseEntity";


@Entity()
export class Home{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    heading:string

    @Column('longtext')
    description:string

    @Column('longtext')
    portal:string

    @Column({nullable:true})
    featuredimage:string

    @Column({nullable:true})
    portalimage:string
}

@Entity()
export class Choose extends BaseEntity{

    @Column()
    image:string
    
    @Column()
    title:string

    @Column("longtext")
    description:string
}