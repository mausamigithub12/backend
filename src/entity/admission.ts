
import { Testimonials } from './Testimonials';
import { course } from './course';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";



@Entity()
export class admission {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: true })
    regNo: string

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

    @Column({ nullable: true })
    guardianName: string

    @Column({ nullable: true })
    guardianNumber: string

    @Column({ nullable: true })
    college: string

    @Column()
    email: string

    @Column({ nullable: true })
    avatar: string;

    @Column()
    levelOfEducation: string

    @Column({ nullable: true })
    shiftTime: string

    @Column({ nullable: true })
    shift: string

    @Column({ nullable: true })
    joinDate: string

    @Column({ nullable: true })
    payment: String

    @Column({ nullable: true })
    remarks: String

    @Column({default:false})
    certificateStatus:boolean
    
    @ManyToOne(() => course, (course) => course.student, { nullable: true })
    course: course

    @CreateDateColumn()
    createdate: Date

    @DeleteDateColumn()
    deleteDate: Date

    @Column({ default: false })
    verified: boolean

    @OneToMany(()=>Testimonials,(Testimonials)=>Testimonials.student)
    testimonials:Testimonials[]
}