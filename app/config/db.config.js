export const HOST = process.env.MYSQLDB_HOST
export const USER = process.env.MYSQLDB_USER
export const PASSWORD = process.env.MYSQLDB_ROOT_PASSWORD
export const DB = process.env.MYSQLDB_DATABASE
export const dialect = "mysql";

export const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
};