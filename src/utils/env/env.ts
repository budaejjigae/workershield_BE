import dotenv from "dotenv";
dotenv.config();

const {DB_USER, PASSWORD, DATABASE} = process.env;
if (!DB_USER || !PASSWORD || !DATABASE) {
    throw new Error("Database Config Error")
}

export {
    DB_USER as username,
    PASSWORD as password,
    DATABASE as database
}