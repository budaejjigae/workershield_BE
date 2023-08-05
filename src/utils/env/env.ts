import dotenv from "dotenv";
dotenv.config();

const {USERNAME, PASSWORD, DATABASE} = process.env;
if (!USERNAME || !PASSWORD || !DATABASE) {
    throw new Error("Database Config Error")
}

export {
    USERNAME as username,
    PASSWORD as password,
    DATABASE as database
}