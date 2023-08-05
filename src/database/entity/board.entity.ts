import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    boardID!: number;

    @Column()
    boardHead!: string;

    @Column()
    boardContent!: string;

    @Column()
    boardWriter!: string;

    @Column()
    boardWriterID!: number;

    @Column({
        default: 0
    })
    boardView!: number;

    @Column({
        default: 0
    })
    boardComment!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(
        () => User,
        user => user.board
    )
    user!: User;

    @OneToMany(
        () => Comment,
        comment => comment.board
    )
    comment!: Comment;
}