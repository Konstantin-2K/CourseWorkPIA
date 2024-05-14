import {DB} from "../Core/DB";
import {gradeRouter} from "../Routers/GradeRouter";

export class GradeModel extends DB {

    async getAllGrades() {
        const [rows] = await this.connection.query(`SELECT * FROM grades`)
        return rows;
    }
    async getStudentGrades(id: number) {
        const [rows] = await this.connection.query(`SELECT * FROM grades WHERE student_id = ?`, [id])
        return rows;
    }

    async insertStudentGrade(body: any, id: number) {
        const data = body;
        const student_id = id;
        const grade = data.grade;
        const subject = data.subject;

        const[rows] = await this.connection.query(`INSERT INTO grades VALUES(NULL, '${student_id}', '${grade}', '${subject}')`);

        return rows;
    }

    async deleteGrade(id: number) {
        const [rows] = await this.connection.query(`DELETE FROM grades WHERE id = ?`, [id])
        return rows;
    }

    async editGrade(body: any, id: number) {
        const data = body;
        const grade = data.grade;
        const subject = data.subject;
        const [rows] = await this.connection.query(`UPDATE grades SET grade = '${grade}', subject = '${subject}' WHERE id = '${id}'`);

        return rows;
    }
}
