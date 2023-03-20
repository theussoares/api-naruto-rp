import express, { Application } from "express";
import { starDataBase } from "../Databases/database";
import { createCaracter } from "../Logic/logic";
import { verifyBody, verifyNameExist } from "./middleware";


const app: Application = express();
app.use(express.json());

app.post('/caracters', verifyBody, verifyNameExist, createCaracter)

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, async() => {
    await starDataBase()
    console.log(runningMsg)
});