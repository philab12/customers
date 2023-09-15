import { DataSource, DataSourceOptions } from "typeorm";
import {config} from "dotenv";

config();

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: `${process.env.HOST}`,
    port: Number.parseInt(`${process.env.POSTGRES_DB_PORT}`),
    username: `${process.env.POSTGRES_USER}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    database: `${process.env.POSTGRES_DB}`,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize:JSON.parse(`${process.env.POSTGRES_SYNCHRONIZE}`)
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;