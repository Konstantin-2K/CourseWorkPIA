import {Request, Response} from "express";
import {StudentModel} from "../Models/StudentModel";

export class StudentController {
    private studentModel: StudentModel;
    constructor() {
        this.studentModel = new StudentModel();
    }

    async getAllStudents(req: Request, res: Response) {
        const users = await this.studentModel.getAllStudents();
        res.send(users);
    }

    async getStudent(id: number) {
        return await this.studentModel.getStudent(id);
    }

    async insertStudent(req: Request, res: Response) {
        const userToInsert = await this.studentModel.insertStudent(req.body);
        res.send(`Successfully inserted student: '${req.body.faculty_number}'`);
    }
}
