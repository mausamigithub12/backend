import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {BaseEntity} from './baseEntity';
enum hackathonStatus{
    upcoming = "upcoming",
    onGoing="onGoing",
    completed="completed"
}

@Entity()
export class hackathon extends BaseEntity{

    @Column()
    title:string

    @Column('longtext')
    description:string

    @Column()
    dateAndTime:string

    @Column()
    hours:string

    @Column()
    location:string

    @Column()
    organizers:string

    @Column()
    image:string

    @Column({type:"enum",enum:hackathonStatus,default:hackathonStatus.upcoming})
    status:hackathonStatus

}