import express, {Request, Response, Router} from "express";
import {AbsenceController} from "../Controllers/AbsenceController";

export const absenceRouter = Router();

absenceRouter.use(express.json());

const absenceController = new AbsenceController();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllStudentAbsencesHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const absences = await absenceController.getAllStudentAbsences(Number(id));
    res.send(absences);
}

const insertStudentAbsencesHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    await absenceController.insertStudentAbsence(req, res, Number(id));
}

const deleteStudentAbsenceHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    await absenceController.deleteStudentAbsence(Number(id));
    res.send(`Successfully deleted absence: '${id}`);
}

const editStudentAbsenceHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    await absenceController.editStudentAbsence(req, res, Number(id));
    res.send(`Successfully edited absence: '${req.params.id}'`)
}

absenceRouter.get("/api/absences/:id", getAllStudentAbsencesHandler);
absenceRouter.post("/api/absences/:id", insertStudentAbsencesHandler);
absenceRouter.delete("/api/absences/:id", deleteStudentAbsenceHandler);
absenceRouter.put("/api/absences/:id", editStudentAbsenceHandler);
