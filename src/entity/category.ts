import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Unique, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { course } from "./course";

@Entity()
export class category {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @OneToMany(() => course, (course) => course.category, { cascade: true, onDelete: "RESTRICT", onUpdate: "RESTRICT" })
    course: course[]

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deleteDate: Date

    @UpdateDateColumn()
    updatedAt:Date
}