import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    rollno : {
        type: String,
        required : true,
        unique: true,
    },
    semester: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    email : {
        type: String,
        required : true,
    },
    password : {
        type: String,
        required : true,
    },
}, {timestamps : true});

export const Student = mongoose.model('Student', studentSchema);