import {Request, Response} from "express";
import {GradeModel} from "../Models/GradeModel";

export class GradeController {
    private gradeModel: GradeModel;

    constructor() {
        this.gradeModel = new GradeModel();
    }

    async getAllGrades(req: Request, res: Response) {
        const allGrades = await this.gradeModel.getAllGrades();
        res.send(allGrades);
    }

    async getStudentGrades(id: number) {
        return await this.gradeModel.getStudentGrades(id);
    }

    async insertStudentGrade(req: Request, res: Response, id: number) {
        const gradeToInsert = await this.gradeModel.insertStudentGrade(req.body, id);
        res.send(`Successfully inserted grade: '${req.body.grade}', '${req.body.id}'`)
    }

    async deleteStudentGrade(id: number) {
        const gradeToDelete = await this.gradeModel.deleteGrade(id);
    }

    async editStudentGrade(req: Request, res: Response, id: number) {
        await this.gradeModel.editGrade(req.body, id);
    }
}
