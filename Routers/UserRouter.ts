import express, {Request, Response, Router} from "express";
import {UserController} from "../Controllers/UserController";

export const userRouter = Router();

userRouter.use(express.json());

const userController = new UserController();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

const getByEmailHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user: any = await userController.getByEmail(email);
        if (!user[0]) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }


        const payload = {
            userId: user[0].id,
        };
        const secret = "secretKey123";
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        res.json({ message: 'Login successful!', token, user: user[0]});

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const insertStudentHandler = async (req: Request, res: Response) => {
    await userController.insertStudent(req, res);
}

const insertTeacherHandler = async (req: Request, res: Response) => {
    await userController.insertTeacher(req, res);
}

const deleteStudentHandler = async (req: Request, res: Response)=> {
    const { id } = req.params;
    await userController.deleteStudent(Number(id));
    res.send(`Successfully deleted student: '${id}'`);
}

const deleteTeacherHandler = async (req: Request, res: Response)=> {
    const { id } = req.params;
    await userController.deleteTeacher(Number(id));
    res.send(`Successfully deleted teacher: '${id}'`);
}

const editStudentGradeHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    await userController.editStudent(req, res, Number(id));
    res.send(`Successfully edited student: '${req.params.id}'`)
}

userRouter.get("/api/students", getAllStudentsHandler)
userRouter.get("/api/students/:id", getStudentHandler)
userRouter.post("/api/students", insertStudentHandler)
userRouter.delete("/api/students/:id", deleteStudentHandler)
userRouter.put("/api/students/:id", editStudentGradeHandler)

userRouter.get("/api/teachers", getAllTeachersHandler)
userRouter.get("/api/teachers/:id", getTeacherHandler)
userRouter.post("/api/teachers", insertTeacherHandler)
userRouter.delete("/api/teachers/:id", deleteTeacherHandler)

userRouter.post("/api/login", getByEmailHandler);
