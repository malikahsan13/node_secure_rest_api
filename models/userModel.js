import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";
const {Schema} = mongoose;

export const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

// UserSchema.methods.comparePassword = (password, hashPassword) => {
//     return bcrypt.compareSync(password, hashPassword);
// }