import express from "express";
import { config } from "dotenv";
import path from "path";

const app = express();

config({
    path: "./data/config.env",
});

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/studentLogin', (req, res)=>{
    res.render('studentLogin');
});

app.get('/teacherLogin', (req, res)=>{
    res.render('teacherLogin');
});

app.get('/studentRegister', (req, res)=>{
    res.render('studentRegister');
});

app.get('/teacherRegister', (req, res)=>{
    res.render('teacherRegister');
});
export default app;