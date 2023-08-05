import { config } from "dotenv";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";
import { Company } from "./company.entity";

config();

@Entity()
export class User {
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

    @Column({
        default: process.env.PROFILE_LINK
    })
    userProfile!: string;
    
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

    @OneToMany(
        () => Board,
        board => board.user
    )
    board!: Board;
}