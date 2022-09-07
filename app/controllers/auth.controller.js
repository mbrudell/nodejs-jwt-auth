import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Op } from "sequelize";

import { secret } from '../config/auth.config.js';
import { User, Role } from '../models/associations.model.js'
// import User from "../models/user.model.js";
// import Role from "../models/role.model.js";

export const signup = (req, res) => {
    // save to DB
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            })
            .then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({ message: "User registered successfully"})
                })
            })
        }  
        else {
            // user role 1
            user.setRoles([1]).then(() => {
                res.send({ message: "User registered successfully"})
            })
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message})
    })
}

export const signin = (req, res) => {
    User.findOne({ 
        where: { 
            username: req.user.username
        }
    })
    .then(user => {
        if(!user){
            return res.status(404).send({ message: "User Not Found"})
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if(!passwordIsValid){
            return res.status(401).send({ 
                accessToken: null,
                message: "Invalid Password!"
            })
        }
        var token = jwt.sign({ id: user.id}, secret, { 
            expiresIn: 86400 // 24hrs
        })
        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    })
}