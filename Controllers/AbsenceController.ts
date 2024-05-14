import {Request, Response} from "express";
import {AbsenceModel} from "../Models/AbsenceModel";

export class AbsenceController {
    private absenceModel: AbsenceModel;

    constructor() {
        this.absenceModel = new AbsenceModel();
    }

    async getAllStudentAbsences(id: number) {
        return await this.absenceModel.getAllStudentAbsences(id);
    }

    async insertStudentAbsence(req: Request, res: Response, id: number) {
        await this.absenceModel.insertStudentAbsence(req.body, id);
    }

    async deleteStudentAbsence(id: number) {
        await this.absenceModel.deleteStudentAbsence(id);
    }

    async editStudentAbsence(req: Request, res: Response, id: number) {
        await this.absenceModel.editStudentAbsence(req.body, id);
    }
}
