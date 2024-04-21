import mysql2 from "mysql2";
export class DB {
    connection;

    constructor() {
        this.connection = mysql2.createPool({
            host: "localhost",
            database: "corseworkpia",
            user: "root",
            password: "1234"
        }).promise();
    }
}
