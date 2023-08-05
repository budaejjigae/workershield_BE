import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({
        unique: true
    })
    userEmail!: string;
}