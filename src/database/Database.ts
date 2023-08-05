import {DataSource} from "typeorm";
import dotenv  from "dotenv";
dotenv.config();
import {username, password, database} from "@src/utils/env/env";
import { User } from "./entity/user.entity";
import { Company } from "./entity/company.entity";
import { Article } from "./entity/article.entity";


console.log(username, password, database)
const AppDataSource = new DataSource({
    type: "mysql",
    host: '127.0.0.1',
    port: 3306,
    username,
    password,
    database,
    entities: [User, Company, Article],
    synchronize: true,
    logging: ["info","error"],
})

const DatabaseStart =  () => {
    AppDataSource.initialize().then(r => console.log("Database Start"))
}

export {
    DatabaseStart,
    AppDataSource
}