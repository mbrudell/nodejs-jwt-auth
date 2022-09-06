import jwt from "jsonwebtoken";
import { underscoredIf } from "sequelize/types/utils";

import { secret } from "../config/auth.config"
import User from "../models/user.model"

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if(!token){
        return res.status(403).send({ 
            message: "No token provided" 
        })
    }
    jwt.verify(token, secret, (err, decoded) => {
        if(err){
            return res.status(401).send({ 
                message: "Unauthorized!"
            })
        }
        req.userId = decoded.id
        next()
    })
}

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if(roles[i].name === "admin"){
                    next();
                    return
                }
            }
            res.status(403).send({
                message: "Requires admin role"
            })
            return
        })
    })
}

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if(roles[i].name === "moderator"){
                    next();
                    return
                }
            }
            res.status(403).send({
                message: "Requires moderator role"
            })
        })
    })
}

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if(roles[i].name === "moderator"){
                    next();
                    return
                }
                if(roles[i].name === "admin"){
                    next();
                    return
                }
            }
            res.status(403).send({
                message: "Requires moderator or admin role"
            })
        })
    })
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
}

export default authJwt
