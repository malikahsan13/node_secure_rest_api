import mongoose from "mongoose";
const {Schema} = mongoose;

export const PlayerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    speed: {
        type: Number,
        enum: [1,2,3,4,5]
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});