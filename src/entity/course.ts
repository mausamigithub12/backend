
import { Syllabus } from '../entity/syllabus';
import { student } from './student';
import { category } from './category';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { review } from './review';
import { instructor } from './instructor';
import { admission } from './admission';
import { Training } from './training';

@Entity()
export class course {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    course: string

    @Column("longtext", {
        nullable: true
    })
    description: string

    @Column({ nullable: true }) // may be used in future
    startDate: string

    @Column({ nullable: true }) // may be used in future
    endDate: string

    @Column()
    duration: string;

    @Column({ nullable: true })
    image: string

    // @ManyToOne(() => category, (category) => category.course, { onDelete: "RESTRICT", onUpdate: "RESTRICT" })
    // category: category

    @Column()
    category:string

    // @ManyToMany(() => instructor, (instructor) => instructor.courses, { onUpdate: 'CASCADE', cascade: true })
    // instructor: instructor[]
    @Column()
    instructor:string

    @OneToMany(() => review, (review) => review.course, { cascade: true })
    review: review[]

    @ManyToMany(() => student, (student) => student.course, { cascade: true })
    student: student[]

    @OneToMany(() => Syllabus, (Syllabus) => Syllabus.course, { cascade: true })
    syllabus: Syllabus[]

    @OneToMany(() => admission, (admission) => admission.course, { cascade: true })
    admission: admission[]

    @OneToMany(() => Training, (Training) => Training.course, { nullable: true })
    training: Training[]

    @DeleteDateColumn()
    deleteDate: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({default:""})
    type: string
}