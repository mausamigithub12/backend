
import { course } from './course';
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Skill } from './skill';
import { BaseEntity } from './baseEntity';
import { Training } from './training';


@Entity()
export class instructor extends BaseEntity {

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    address: string

    @Column({ nullable: true })
    dob: string

    @Column()
    gender: string

    @Column()
    phone: string

    @ManyToMany(() => Skill, (Skill) => Skill.instructor, { nullable: true })
    @JoinTable()
    skills: Skill[]

    @Column({
        nullable: true
    })
    experience: string

    @Column("longtext",{
        nullable: true
    })
    bio: string

    @Column({
        nullable: true
    })
    avatar: string

    @Column({ nullable: true })
    citizenshipFront: string

    @Column({ nullable: true })
    citizenshipBack: string

    @Column({ nullable: true })
    cv: string

    @Column({ nullable: true })
    pancard: string

    @ManyToMany(() => course, (course) => course.instructor, { onUpdate: 'CASCADE' })
    @JoinTable()
    courses: course[]

    @DeleteDateColumn()
    deleteDate: Date

    @ManyToMany(() => Training, (traning) => traning.instructors, { nullable: true })
    training: Training[]
}