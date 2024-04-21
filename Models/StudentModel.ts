import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import {DB} from "../Core/DB";

export class StudentModel extends DB {
    async getAllStudents() {
        const [rows] = await this.connection.query("SELECT * FROM students")
        return rows;
    }

    async insertStudent(body: any) {
        const data = body;
        const username = data.username;
        const password = data.password;
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const [rows] = await this.connection.query(`INSERT INTO students VALUES(NULL, '${username}', '${password}', '${currentDate}')`);
        return rows;
    }
}
