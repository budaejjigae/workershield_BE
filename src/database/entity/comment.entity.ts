import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    commentID!: number;

    @Column()
    boardID!: number;

    @Column()
    commentWriter!: string;

    @Column()
    commentWriterID!: number;

    @Column()
    commentContent!: string;

    @CreateDateColumn()
    createAt!: Date;

    @ManyToOne(
        () => Board,
        board => board.comment
    )
    board!: Board;
}