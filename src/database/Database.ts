import {DataSource} from "typeorm";
import dotenv  from "dotenv";
dotenv.config();
import {username, password, database} from "@src/utils/env/env";


console.log(username, password, database)
const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username,
    password,
    database,
    entities: [],
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