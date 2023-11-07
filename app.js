import express from "express";
import { config } from "dotenv";
import path from "path";
import { studentLogin, studentRegister } from "./controllers/students.js";
import { teacherLogin, teacherRegister } from "./controllers/teachers.js";

const app = express();

config({
    path: "./data/config.env",
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
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

app.get('/studentmain', (req, res)=>{
    res.render('studentmain');
})

app.get('/teachermain', (req, res)=>{
    res.render('teachermain');
})


app.post('/teacherLogin', teacherLogin);
app.post('/teacherRegister', teacherRegister);
app.post('/studentRegister', studentRegister);
app.post('/studentLogin', studentLogin);
export default app;