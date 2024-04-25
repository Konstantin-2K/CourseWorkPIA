import express, {Request, Response, Router} from "express";
import {StudentController} from "../Controllers/StudentController";

export const studentRouter = Router();

studentRouter.use(express.json());

const studentController = new StudentController();

const getAllStudentsHandler = async (req: Request, res: Response) => {
    await studentController.getAllStudents(req, res);
}

const getStudentHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user: any = await studentController.getStudent(Number(id));
    res.send(user[0]);
}


const insertStudentHandler = async (req: Request, res: Response) => {
    await studentController.insertStudent(req, res);
}

studentRouter.get("/api/students", getAllStudentsHandler)
studentRouter.get("/api/students/:id", getStudentHandler)
studentRouter.post("/api/students", insertStudentHandler)
