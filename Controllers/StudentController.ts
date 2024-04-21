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

    async insertStudent(req: Request, res: Response) {
        const userToInsert = await this.studentModel.getAllStudents();
        res.send(`Successfully inserted user: '${req.body.username}'`);
    }
}
