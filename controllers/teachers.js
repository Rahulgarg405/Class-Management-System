import { Teacher } from "../models/teachers.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";


export const teacherLogin = async (req, res, next)=>{
    try {
        const {email, password} = req.body;

        let teacher = await Teacher.findOne({email});
        if(!teacher){
            return res.redirect('/teacherRegister');
        }

        if(password != teacher.password){
            return res.render('teacherLogin', {message: "Invalid Password"});
        }

        const token = jwt.sign({_id:teacher._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 60 * 1000),
        });
        res.redirect('/teachermain');
    } catch (error) {
        next(error);
    }
}


export const teacherRegister = async (req, res, next) => {
    try {
        const { name, department, email, password } = req.body;

        let teacher = await Teacher.findOne({ email });
        if (teacher) {
            return res.redirect('/teacherLogin');
        }

        teacher = await Teacher.create({
            name,
            department,
            email,
            password,
        });

        const token = jwt.sign({ _id: teacher._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 60 * 1000),
        });

        res.redirect('/teachermain');
    } catch (error) {
        next(error);
    }
}