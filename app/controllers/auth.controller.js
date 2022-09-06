import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Op } from "sequelize";

import { secret } from '../config/auth.config';
import User from "../models/user.model";
import Role from "../models/role.model";

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