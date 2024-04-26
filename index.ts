import {userRouter} from "./Routers/UserRouter";
import express from "express";
import bodyParser from 'body-parser'
import exp from "node:constants";

const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));
app.use(userRouter);
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server started")
})
