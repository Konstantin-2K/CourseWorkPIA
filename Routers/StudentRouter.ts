import express, {Request, Response, Router} from "express";
import {StudentController} from "../Controllers/StudentController";

export const studentRouter = Router();

studentRouter.use(express.json());

const studentController = new StudentController();

const getAllStudentsHandler = async (req: Request, res: Response) => {
    await studentController.getAllStudents(req, res);
}

const insertStudentHandler = async (req: Request, res: Response) => {
    await studentController.insertStudent(req, res);
}

studentRouter.get("/api/users", getAllStudentsHandler)
studentRouter.post("/api/users", insertStudentHandler)
