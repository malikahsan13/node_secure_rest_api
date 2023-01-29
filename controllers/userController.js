import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserSchema} from "../models/userModel";

const User = mongoose.model("User", UserSchema);

export const loginRequired = (req, res, next) => {
    if(req.user){
        next()
    } else {
        res.status(401).json({message: "Unauthorized User"})
    }
}

export const registerUser = (req, res) => {
    let newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.hashPassword, 10);
    newUser.save((err, User) => {
        if(err){
            res.status(400).json({message: err})
        } else{ 
            User.hashPassword = undefined;
            res.json(User);
        }
    })
}

export const loginUser = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if(err) throw err;
        if(!user){
            res.status(401).json({message: "Authentication Failed. user not found"})
        } else if(user) {
            if(!bcrypt.compareSync(req.body.hashPassword, user.hashPassword)){
                res.status(401).json({message: "Authentication Failed. username or password is wrong"})
            } else {
                res.json({token: jwt.sign({email: user.email, username: user.username, id: user._id}, "RESTFUL")})
            }
        }
    })
}