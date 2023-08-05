import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    userID!: number;

    @Column({
        unique: true
    })
    userStringID!: string;

    @Column()
    userName!: string;

    @Column()
    userPW!: string;

    @Column()
    inviteCode!: string;

    @ManyToOne(
        () => Company,
        company => company.user
    )
    @JoinColumn()
    company!: Company;

    @Column({
        nullable: true
    })
    accesstoken!: string;
}