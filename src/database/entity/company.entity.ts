import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    companyID!: number;

    @Column({
        "unique" : true,
    })
    companyCode!: string;

    @Column()
    companyName!: string;

    @Column()
    companyKind!: companyKind;

    @OneToMany(
        () => User,
        user => user.company
    )
    user!: User[];
}

export enum companyKind {
    b = "건설직",
    f = "소방직",
    s = "운송직",
    c = "생산직",
    e = "전기 공학 기술직",
    cf = "식품 생산직"
}

// 건설직, 소방직, 운송직, 생산직, 전기 공학 기술직, 식품 생산직