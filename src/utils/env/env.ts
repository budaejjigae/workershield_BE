import dotenv from "dotenv";
dotenv.config();

const {username,password,database} = process.env;
if(!username || !password || !database){
    throw new Error("Database Config Error")
}

export {
    username,
    password,
    database
}