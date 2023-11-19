import { Admin } from "../models/admin.js";
import jwt from "jsonwebtoken";

export const adminLogin = async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        let admin = await Admin.findOne({email});

        if(!admin){
            return res.redirect('/adminRegister');
        }

        if(password != admin.password){
            return res.render('adminLogin', {message: "Incorrect Password"});
        }

        const token = jwt.sign({_id: admin._id}, process.env.JWT_SECRET);
        res.cookie("token", token,{
            httpOnly: true,
            expires: new Date(Date.now() + 15*60*1000),
        });

        res.redirect('/adminmain');
    } catch (error) {
        next(error);
    }
}

export const adminRegister = async (req, res, next) => {
    try {
        const { name, contact, email, password } = req.body;

        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.redirect('/adminLogin');
        }

        admin = await Admin.create({
            name,
            contact,
            email,
            password,
        });

        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 60 * 1000),
        });

        res.redirect('/adminmain');
    } catch (error) {
        next(error);
    }
}