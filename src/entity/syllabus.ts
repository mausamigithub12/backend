import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { course } from './course';
@Entity()
export class Syllabus {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column("longtext", {
        nullable: true
    })
    description: string;

    @DeleteDateColumn()
    deleteDate: Date

    @ManyToOne(() => course, (course) => course.syllabus, { nullable: true })
    course: course;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}