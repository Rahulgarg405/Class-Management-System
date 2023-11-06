import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    fileurl : {
        type: String,
    },
    duedate: {
        type: Date,
    }
}, {timestamps: true});

export const assignment = mongoose.model('assignment', assignmentSchema);