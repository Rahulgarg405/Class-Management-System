import { Student } from "../models/students.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const studentLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let student = await Student.findOne({ email });
        if (!student) {
            return res.redirect('/studentRegister');
        }

        if (password != student.password) {
            return res.render('studentLogin', { message: "Incorrect Password" });
        }

        const token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 60 * 1000),
        });

        res.redirect('/studentmain');

    } catch (error) {
        next(error);
    }
}

export const studentRegister = async (req, res, next) => {
    try {
        const { name, rollno, semester, branch, contact, email, password } = req.body;

        let student = await Student.findOne({ email });
        if (student) {
            return res.redirect('/studentLogin');
        }

        student = await Student.create({
            name,
            rollno,
            semester,
            branch,
            contact,
            email,
            password,
        });

        const token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 60 * 1000),
        });

        res.redirect('/studentmain');
    } catch (error) {
        next(error);
    }
}