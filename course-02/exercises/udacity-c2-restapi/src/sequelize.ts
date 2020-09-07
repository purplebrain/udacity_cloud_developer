import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const cfg_rds = config.postgress;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": cfg_rds.username,
  "password": cfg_rds.password,
  "database": cfg_rds.database,
  "host":     cfg_rds.host,

  dialect: 'postgres',
  storage: ':memory:',
});

