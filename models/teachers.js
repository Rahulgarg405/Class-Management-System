import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required :true,
    },
    password :{
        type: String,
        required :true,
    }
}, {timestamps : true});

export const Teacher = mongoose.model('Teacher', teacherSchema);