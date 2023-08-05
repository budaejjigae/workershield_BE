import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { companyKind } from "./company.entity";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    articleID!: number;

    @Column()
    articleGroup!: companyKind;

    @Column()
    articleHead!: string;

    @Column()
    articleContent!: string;

    @Column()
    articleImage!: string;

    @Column({
        default: 0
    })
    articleView!: number;

    @CreateDateColumn()
    createdAt!: Date;
}