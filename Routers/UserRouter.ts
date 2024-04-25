import express, {Request, Response, Router} from "express";
import {UserController} from "../Controllers/UserController";

export const userRouter = Router();

userRouter.use(express.json());

const userController = new UserController();

const getAllStudentsHandler = async (req: Request, res: Response) => {
    await userController.getAllStudents(req, res);
}

const getAllTeachersHandler = async (req: Request, res: Response) => {
    await userController.getAllTeachers(req, res);
}

const getStudentHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user: any = await userController.getStudent(Number(id));
    res.send(user[0]);
}

const getTeacherHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user: any = await userController.getTeacher(Number(id));
    res.send(user[0]);
}

const insertStudentHandler = async (req: Request, res: Response) => {
    await userController.insertStudent(req, res);
}

const insertTeacherHandler = async (req: Request, res: Response) => {
    await userController.insertTeacher(req, res);
}

userRouter.get("/api/students", getAllStudentsHandler)
userRouter.get("/api/students/:id", getStudentHandler)
userRouter.post("/api/students", insertStudentHandler)

userRouter.get("/api/teachers", getAllTeachersHandler)
userRouter.get("/api/teachers/:id", getTeacherHandler)
userRouter.post("/api/teachers", insertTeacherHandler)
