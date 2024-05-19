import {DB} from "../Core/DB";

export class UserModel extends DB {
    async getAllStudents() {
        const [rows] = await this.connection.query(`SELECT * FROM users WHERE role="STUDENT"`)
        return rows;
    }

    async getAllTeachers() {
        const [rows] = await this.connection.query(`SELECT * FROM users WHERE role="TEACHER"`)
        return rows;
    }

    async getStudent(id: number) {
        const [rows] = await this.connection.query(`SELECT * FROM users WHERE id = ? and role="STUDENT"`, [id])
        return rows;
    }

    async getTeacher(id: number) {
        const [rows] = await this.connection.query(`SELECT * FROM users WHERE id = ? and role="TEACHER"`, [id])
        return rows;
    }

    async getByEmail(email: any) {
        const [rows] = await this.connection.query(`SELECT * FROM users WHERE email = ?`, [email])
        return rows;
    }

    async deleteStudent(id: number) {
        await this.connection.query(`DELETE FROM absences WHERE student_id = ?`, [id])
        await this.connection.query(`DELETE FROM grades WHERE student_id = ?`, [id]);
        const [rows] = await this.connection.query(`DELETE FROM users WHERE id = ?`, [id]);
        return rows;
    }

    async deleteTeacher(id: number) {
        const [rows] = await this.connection.query(`DELETE FROM users WHERE id = ?`, [id])
        return rows;
    }

    async insertStudent(body: any, password: string) {
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
        const role = data.role;

        const [rows] = await this.connection.query(`INSERT INTO users VALUES(NULL, '${facultyNumber}', '${yearEnrolled}', '${PIN}', '${gender}', '${birthDate}',
                                                                                                '${phoneNumber}', '${firstName}', '${email}', '${address}', '${degree}', '${specialty}', '${lastName}', '${givenName}', '${password}', '${role}' , NULL)`);
        return rows;
    }

    async insertTeacher(body: any, password: string) {
        const data = body;
        const PIN = data.personal_identification_number;
        const gender = data.gender;
        const birthDate = data.birth_date;
        const phoneNumber = data.phone_number;
        const firstName = data.first_name;
        const email = data.email;
        const address = data.address;
        const lastName = data.last_name;
        const givenName = data.given_name;
        const role = data.role;
        const teacherNumber = data.teacher_number;

        const [rows] = await this.connection.query(`INSERT INTO users VALUES(NULL, NULL, NULL, '${PIN}', '${gender}', '${birthDate}',
                                                                                                '${phoneNumber}', '${firstName}', '${email}', '${address}', NULL, NULL, '${lastName}', '${givenName}', '${password}', '${role}', '${teacherNumber}')`);
        return rows;
    }

    async editStudent(body: any, id: number) {
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
        const [rows] = await this.connection.query(`UPDATE users 
    SET 
        personal_identification_number = '${PIN}',
        faculty_number = '${facultyNumber}',
        year_enrolled = '${yearEnrolled}',
        gender = '${gender}',
        birth_date = '${birthDate}',
        phone_number = '${phoneNumber}',
        first_name = '${firstName}',
        email = '${email}',
        address = '${address}',
        degree = '${degree}',
        specialty = '${specialty}',
        last_name = '${lastName}',
        given_name = '${givenName}'
    WHERE 
        id = '${id}';`)
        return rows;
    }

    async editTeacher(body: any, id: number) {
        const data = body;
        const teacherNumber = data.teacher_number;
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
        const [rows] = await this.connection.query(`UPDATE users 
    SET 
        personal_identification_number = '${PIN}',
        teacher_number = '${teacherNumber}',
        gender = '${gender}',
        birth_date = '${birthDate}',
        phone_number = '${phoneNumber}',
        first_name = '${firstName}',
        email = '${email}',
        address = '${address}',
        degree = '${degree}',
        specialty = '${specialty}',
        last_name = '${lastName}',
        given_name = '${givenName}'
    WHERE 
        id = '${id}';`)
        return rows;
    }

    async changePassword(id: number, password: string) {
        const [rows] = await this.connection.query(`UPDATE users SET password = '${password}' WHERE id = '${id}'`);
        return rows;
    }

}
