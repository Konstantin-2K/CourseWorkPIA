import express from "express";
import {userRouter} from "./routers/userRouter";
import bodyParser from 'body-parser';

const app = express();

app.use(userRouter);
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server started")
})
