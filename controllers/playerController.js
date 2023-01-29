import mongoose from "mongoose";
import { PlayerSchema } from "../models/playerModel";

const Player = mongoose.model("Player", PlayerSchema);

export const addNewPlayer = (req, res) => {
    let player = new Player(req.body);
    player.save((err, Player) => {
        if(err){
            res.send(err)
        }
        res.json(Player);
    })
}

export const getPlayers = (req, res) => {
    Player.find({}, (err, Player) => {
        if(err){
            res.send(err)
        }
        res.json(Player)
    })
}

export const findPlayerbyId = (req, res) => {
    Player.findById(req.params.playerId, (err, Player) => {
        if(err){
            res.send(err)
        }
        res.json(Player)
    })
}

export const updatePlayer = (req, res) => {
    Player.findByIdAndUpdate({_id: req.params.playerId}, req.body, {new: true}, (err, Player) => {
        if(err){
            res.send(err)
        }
        res.json(Player)
    })
}

export const deletePlayer = (req, res) => {
    Player.remove({_id: req.params.playerId}, (err, Player) => {
        if(err){
            res.send(err)
        }
        res.json({msg: "Player Deleted Successfully"})
    })
}