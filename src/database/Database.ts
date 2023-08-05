import {DataSource} from "typeorm";
import dotenv  from "dotenv";
dotenv.config();

const {username, password,database } = process.env;
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