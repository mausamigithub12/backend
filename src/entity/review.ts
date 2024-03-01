// import { student } from './student';
import { course } from './course';
import { Column, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany,OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class review{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    rating:Number
    
    @Column()
    comment:string
    
    // @ManyToMany(()=>student,(student)=>student.course)
    // student:student[]
    
    @ManyToOne(()=>course,(course)=>course.review)
    course:course

    @DeleteDateColumn()
    deleteDate:Date

}