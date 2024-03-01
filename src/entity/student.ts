
import { course } from './course';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
// import { review } from './review';



@Entity()
@Unique(['regNO'])
export class student {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ default: `${new Date().getFullYear().toString().slice(2)}/${(new Date().getFullYear() + 1).toString().slice(2)}-${Math.floor(Math.random() * 10000)}` })
    regNO: string

    @Column()
    fullname: string

    @Column()
    address: string

    @Column()
    dob: string

    @Column({ length: 10 })
    phNo: string

    @Column()
    gender: string

    @Column()
    guardianName: string

    @Column()
    guardianNumber: string

    @Column()
    college: string

    @Column()
    email: string

    @Column({ nullable: true })
    avatar: string;

    @Column()
    levelOfEducation: string

    @Column()
    shiftTime: String

    @Column({ nullable: true })
    joinDate: string

    @Column({ nullable: true })
    payment: String

    @ManyToMany(() => course, (course) => course.student, { nullable: true })
    @JoinTable()
    course: course[]

    @CreateDateColumn()
    createdate: Date

    @DeleteDateColumn()
    deleteDate: Date
}