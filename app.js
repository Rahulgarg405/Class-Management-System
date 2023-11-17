import express from "express";
import { config } from "dotenv";
import path from "path";
import { studentLogin, studentRegister } from "./controllers/students.js";
import { teacherLogin, teacherRegister } from "./controllers/teachers.js";
import cookieParser from "cookie-parser";
import { studentAuthenticated, teacherAuthenticated } from "./middlewares/auth.js";
import { Student } from "./models/students.js";
import multer from "multer";
import { assignment } from "./models/assignments.js";
import fs, { rmSync } from "fs";


const app = express();

config({
    path: "./data/config.env",
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
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

app.get('/studentmain', studentAuthenticated ,(req, res)=>{
    res.render('studentmain', {
        student : req.student,
    });
})

app.get('/teachermain', (req, res)=>{
    res.render('teachermain');
})

app.get('/studentprofile', studentAuthenticated, (req, res)=>{
    res.render('studentprofile', {
        student: req.student,
    });
});

app.get('/teacherprofile', teacherAuthenticated, (req, res)=>{
    res.render('teacherprofile', {
        teacher : req.teacher,
    });
});

app.get('/uploadassign', (req, res)=>{
    res.render('uploadassign');
})

app.get('/assignments', async(req, res)=>{
    try {
        const assignments = await assignment.find();
        res.render('assignments', {assignments});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/downassign', async (req, res)=>{
    try {
        const assignments = await assignment.find();
        res.render('downassign', {assignments});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching data');
    }
})

app.post('/teacherLogin', teacherLogin);
app.post('/teacherRegister', teacherRegister);
app.post('/studentRegister', studentRegister);
app.post('/studentLogin', studentLogin);



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.post('/upload', upload.single("assign"), (req, res) => {

    let obj = {
        name: req.body.name,
        assign: {
            data: fs.readFileSync(path.join('./public/uploads/', req.file.filename)),
            contentType: 'application/pdf'// or 'image/png' for images files,
        }
    }

    assignment.create(obj)
        .then((item) => {
            // item saved
            res.redirect('/assignments');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error saving to database');
        });


    console.log(req.body)
    console.log(req.file)
})


app.get('/download/:assignmentId', async (req, res) => {
    try {
        // Fetch the assignment based on the assignmentId parameter
        const Assignment = await assignment.findById(req.params.assignmentId);

        // Check if the assignment and fileUrl exist
        if (!Assignment || !Assignment.assign.data) {
            return res.status(404).send('File not found');
        }

        // Redirect the user to the fileUrl for download
        res.send(Assignment.assign.data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching data');
    }
});



export default app;