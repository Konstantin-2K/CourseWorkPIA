import express, {Request, Response, Router} from "express";
import {GradeController} from "../Controllers/GradeController";

export const gradeRouter = Router();

gradeRouter.use(express.json());

const gradeController = new GradeController();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllGradesHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const allGrades = await gradeController.getAllGrades(req, res);
    res.send(allGrades);
}

const getStudentGradesHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const studentGrades = await gradeController.getStudentGrades(Number(id));
    res.send(studentGrades);
}

const insertStudentGradeHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    await gradeController.insertStudentGrade(req, res, Number(id));
}

const deleteStudentGradeHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    await gradeController.deleteStudentGrade(Number(id));
    res.send(`Successfully deleted grade: '${id}`);
}

const editStudentGradeHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    await gradeController.editStudentGrade(req, res, Number(id));
    res.send(`Successfully edited grade: '${req.params.id}'`)
}

gradeRouter.get("/api/grades", getAllGradesHandler)
gradeRouter.get("/api/grades/:id", getStudentGradesHandler)
gradeRouter.post("/api/grades/:id", insertStudentGradeHandler)
gradeRouter.delete("/api/grades/:id", deleteStudentGradeHandler)
gradeRouter.put("/api/grades/:id", editStudentGradeHandler)
