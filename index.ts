import {studentRouter} from "./Routers/StudentRouter";
import express from "express";
import bodyParser from 'body-parser'

const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));
app.use(studentRouter);
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server started")
})
