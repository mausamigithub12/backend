import { Column, Entity, OneToMany, Unique } from "typeorm"
import { BaseEntity } from "./baseEntity"
import { Training } from "./training"

enum PartnerType {
    'PLACEMENT' = 'placement',
    'AGENT' = 'agent',
    'MAIN' = 'main',
    'COLLEGE' = 'college'
}

@Entity()
export class Partner extends BaseEntity {

    @Column()
    name: string

    @Column({ nullable: true, unique: true },)
    phone: string


    @Column({ nullable: true, unique: true },)
    email: string

    @Column({ nullable: true })
    location: string

    @Column()
    agent_name: string

    @Column({ nullable: true, unique: true },)
    agent_phone: string

    @Column({ nullable: true, unique: true },)
    agent_email: string

    @Column({ nullable: true })
    logo: string

    @Column({ type: 'enum', enum: PartnerType })
    type: PartnerType

    @OneToMany(() => Training, (training) => training.partner, { nullable: true, onDelete: 'CASCADE' })
    training: Training[]
}