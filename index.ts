import {studentRouter} from "./Routers/StudentRouter";
import express from "express";
import bodyParser from 'body-parser'

const app = express();

app.use(studentRouter);
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server started")
})
