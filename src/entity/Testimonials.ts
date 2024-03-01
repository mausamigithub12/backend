import { Column, Entity, ManyToOne} from "typeorm";
import { BaseEntity } from "./baseEntity";
import { admission } from "./admission";

@Entity()
export class Testimonials extends BaseEntity{
    @Column('longtext')
    description:string

    @Column({type:"simple-array"})
    videolink:string[]

    @ManyToOne(()=>admission,(student)=>student.testimonials)
    student:admission

}