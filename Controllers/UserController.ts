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

    async getByEmail(email: string) {
        return await this.userModel.getByEmail(email);
    }

    async insertStudent(req: Request, password: string) {
        await this.userModel.insertStudent(req.body, password);
    }

    async insertTeacher(req: Request, password: string) {
        await this.userModel.insertTeacher(req.body, password);
    }

    async deleteStudent(id: number) {
        await this.userModel.deleteStudent(id);
    }

    async deleteTeacher(id: number) {
        await this.userModel.deleteTeacher(id);
    }

    async editStudent(req: Request, res: Response, id: number) {
        await this.userModel.editStudent(req.body, id);
    }

    async editTeacher(req: Request, res: Response, id: number) {
        await this.userModel.editTeacher(req.body, id);
    }

    async changePassword(id: number, password: string ) {
        await this.userModel.changePassword(id, password);
    }
}
