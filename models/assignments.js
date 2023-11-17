import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    assign: {
        data: Buffer,
        contentType: String,
    }

}, { timestamps: true });

export const assignment = mongoose.model('assignment', assignmentSchema);