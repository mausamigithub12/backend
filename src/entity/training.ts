import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { instructor } from "./instructor";
import { course } from "./course";
import { Partner } from "./partner";

export enum TrainingStatus {
    COMPLETED = "completed",
    RUNNING = "running",
    UPCOMING = "upcoming",
}
@Entity()
export class Training extends BaseEntity {
    @Column()
    name: string

    @Column({ nullable: true })
    featured_image: string

    @Column({ nullable: true })
    banner: string

    @Column("simple-array", { nullable: true })
    images: string[]

    @Column()
    duration: string

    @Column()
    startDate: string

    @Column()
    endDate: string

    @Column("longtext", { nullable: true })
    content: string

    @ManyToMany(() => instructor, (instructor) => instructor.training)
    @JoinTable()
    instructors: instructor[]

    @ManyToOne(() => course, (course) => course.training)
    course: course;

    @Column({ nullable: true })
    syllabus: string

    @Column({ default: "pending" })
    status: string

    @Column({ type: 'varchar' })
    location: string;

    @ManyToOne(() => Partner, (partner) => partner.training, { nullable: true })
    partner: Partner
}