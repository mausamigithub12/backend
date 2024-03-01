import {Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity()
export class Aboutus{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column('longtext')
    description:string

    @Column("longtext")
    vision:string

    @Column("longtext")
    mission:string

    @Column('longtext')
    objectives:string

    @Column('longtext')
    howwework:string
    
    @Column()
    image:string

    @Column()
    videolink:string


}



@Entity()
export class Provide extends BaseEntity{

    @Column()
    image:string 

    @Column()
    title:string

    @Column('longtext')
    description:string
}   





@Entity()
export class workflow extends BaseEntity{
    @Column()
    title:string

    @Column('longtext')
    description:string

    @Column()
    image:string
}