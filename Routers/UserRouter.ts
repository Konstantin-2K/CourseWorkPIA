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
    const { password, ...otherFields } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userController.insertStudent(req , hashedPassword);
        res.status(201).send('Successfully inserted student');
    } catch (error) {
        console.error('Error inserting student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const insertTeacherHandler = async (req: Request, res: Response) => {
    const { password, ...otherFields } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userController.insertTeacher(req , hashedPassword);
        res.status(201).send('Successfully inserted teacher');
    } catch (error) {
        console.error('Error inserting teacher:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
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

const editStudentHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    await userController.editStudent(req, res, Number(id));
    res.send(`Successfully edited student: '${req.params.id}'`)
}

const editTeacherHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    await userController.editTeacher(req, res, Number(id));
    res.send(`Successfully edited teacher: '${req.params.id}'`)
}

const changePasswordHandler = async (req: Request, res: Response) => {
    const { password } = req.body;
    const { id } = req.params;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userController.changePassword(Number(id), hashedPassword);
        res.send(`Successfully changed password for user: '${id}'`);
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

userRouter.get("/api/students", getAllStudentsHandler)
userRouter.get("/api/students/:id", getStudentHandler)
userRouter.post("/api/students", insertStudentHandler)
userRouter.delete("/api/students/:id", deleteStudentHandler)
userRouter.put("/api/students/:id", editStudentHandler)

userRouter.get("/api/teachers", getAllTeachersHandler)
userRouter.get("/api/teachers/:id", getTeacherHandler)
userRouter.post("/api/teachers", insertTeacherHandler)
userRouter.delete("/api/teachers/:id", deleteTeacherHandler)
userRouter.put("/api/teachers/:id", editTeacherHandler)

userRouter.post("/api/login", getByEmailHandler);
userRouter.put(`/api/change-password/:id`, changePasswordHandler);
