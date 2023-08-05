import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const basename = path.basename(__filename);
const db = {};

const {database, username, password,host } = process.env;

const sequelize = new Sequelize(database, username, password,  {
  host: host,
  dialect: 'mysql',
  timezone: '+09:00' 
});


export default sequelize;
