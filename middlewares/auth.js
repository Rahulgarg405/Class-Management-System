import jwt from "jsonwebtoken";
import { Student } from "../models/students.js";
import { Teacher } from "../models/teachers.js";


export const studentAuthenticated = async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(404).json({
            success: false, 
            message : "Login First",
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.student = await Student.findById(decoded);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}

export const teacherAuthenticated = async (req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Login First",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.teacher = await Teacher.findById(decoded);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message : 'Invalid or expired token',
        })
    }
}