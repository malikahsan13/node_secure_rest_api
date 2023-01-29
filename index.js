import express from "express";
import mongoose from "mongoose";
import routes from "./routes/playerRoute";
import jwt from "jsonwebtoken"

const app = express();
const PORT = 4000;

mongoose.Promise = global.Promise;

const mongodbConnection = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/playersDB",{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log(`MongoDB Connected`)})
    .catch((err) => { console.log("Error connected with Mongodb",err)});
}

mongoose.connection.on("connected", () => {
    console.log("Mongoose default Connection is Open")
})

mongoose.connection.on("error", (err) => {
    console.log(`Mongoose default connection occured ${err}`)
})

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection is closed")
})

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Mongoose default connection is disconnected due to application termination")
        process.exit(0);
    })
})

app.use(express.urlencoded({extended:true}));
app.use(express.json())

mongodbConnection()

app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT"){
        jwt.verify(req.headers.authorization.split(" ")[1],"RESTFUL", (err, decode) => {
            if(err)  res.send(err) //req.user = undefined;
            req.user = decode;
            next();
        })
    } else {
        req.user = undefined;
        next();
    }
})

routes(app);

app.get("/",(req, res)=>{
    res.send("Welcome to Players Portals")
})

app.listen(PORT, () => {
    console.log(`Express Server is Listening on ${PORT}`)
})
