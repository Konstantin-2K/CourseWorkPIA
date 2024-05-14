import {DB} from "../Core/DB";

export class AbsenceModel extends DB {
    async getAllStudentAbsences(id: number) {
        const [rows] = await this.connection.query(`SELECT * FROM absences WHERE student_id = ?`, [id]);
        return rows;
    }

    async insertStudentAbsence(body: any, id: number) {
        const data = body;
        const student_id = id;
        const date = data.date;
        const subject = data.subject;
        const [rows] = await this.connection.query(`INSERT INTO absences VALUES(NULL, '${student_id}', '${date}', '${subject}')`);
        return rows;
    }

    async deleteStudentAbsence(id: number) {
        const [rows] = await this.connection.query(`DELETE FROM absences WHERE id = ?`, [id]);
        return rows;
    }

    async editStudentAbsence(body: any, id: number) {
        const data = body;
        const date = data.date;
        const subject = data.subject;
        const [rows] = await this.connection.query(`UPDATE absences SET date = '${date}', subject = '${subject}' WHERE id = '${id}'`);
        return rows;
    }
}
