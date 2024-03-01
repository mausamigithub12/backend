import { Column, Entity, ManyToMany, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { instructor } from "./instructor";

@Entity()
export class Skill extends BaseEntity {
    @Column()
    name: string;

    @ManyToMany(() => instructor, (instructor) => instructor.skills, { nullable: true, onDelete: 'CASCADE' })
    instructor: instructor[]
}