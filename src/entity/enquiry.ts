
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class enquiry {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({nullable:true})
    email: string

    @Column()
    type:string

    @Column()
    phone: string

    @Column({nullable:true})
    message: string
}