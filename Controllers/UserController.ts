import {Request, Response} from "express";
import {UserModel} from "../Models/UserModel";

export class UserController {
    private userModel: UserModel;
    constructor() {
        this.userModel = new UserModel();
    }

    async getAllStudents(req: Request, res: Response) {
        const users = await this.userModel.getAllStudents();
        res.send(users);
    }

    async getAllTeachers(req: Request, res: Response) {
        const users = await this.userModel.getAllTeachers();
        res.send(users);
    }

    async getStudent(id: number) {
        return await this.userModel.getStudent(id);
    }

    async getTeacher(id: number) {
        return await this.userModel.getTeacher(id);
    }

    async insertStudent(req: Request, res: Response) {
        const userToInsert = await this.userModel.insertStudent(req.body);
        res.send(`Successfully inserted student: '${req.body.faculty_number}'`);
    }

    async insertTeacher(req: Request, res: Response) {
        const userToInsert = await this.userModel.insertTeacher(req.body);
        res.send(`Successfully inserted teacher: '${req.body.teacher_number}'`);
    }
}