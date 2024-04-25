import {DB} from "../Core/DB";

export class StudentModel extends DB {
    async getAllStudents() {
        const [rows] = await this.connection.query("SELECT * FROM students")
        return rows;
    }

    async getStudent(id: number) {
        const [rows] = await this.connection.query("SELECT * FROM students WHERE id = ?", [id])
        return rows;
    }

    async insertStudent(body: any) {
        const data = body;
        const facultyNumber = data.faculty_number;
        const yearEnrolled = data.year_enrolled;
        const PIN = data.personal_identification_number;
        const gender = data.gender;
        const birthDate = data.birth_date;
        const phoneNumber = data.phone_number;
        const firstName = data.first_name;
        const email = data.email;
        const address = data.address;
        const degree = data.degree;
        const specialty = data.specialty;
        const lastName = data.last_name;
        const givenName = data.given_name;
        const password = data.password;

        const [rows] = await this.connection.query(`INSERT INTO students VALUES(NULL, '${facultyNumber}', '${yearEnrolled}', '${PIN}', '${gender}', '${birthDate}',
                                                                                                '${phoneNumber}', '${firstName}', '${email}', '${address}', '${degree}', '${specialty}', '${lastName}', '${givenName}', '${password}' )`);
        return rows;
    }
}
