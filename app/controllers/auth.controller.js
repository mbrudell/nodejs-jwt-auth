import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Op } from "sequelize";

import { secret, jwtExpiration } from '../config/auth.config.js';
import { User, Role, RefreshToken } from '../models/associations.model.js'

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
            username: req.body.username
        }
    })
    .then(async user => {
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

        // tokens
        var token = jwt.sign({ id: user.id, username: user.username}, secret, {  // can customise the way i want
            expiresIn: 86400 // 24hrs
        })
        let refreshToken = await RefreshToken.createToken(user)

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
                accessToken: token,
                refreshToken: refreshToken
            })
        })
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    })
}

export const refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body
    if (requestToken == null) {
        return res.status(403).send({ message: "Refresh Token is required"})
    }

    try {
        let refreshToken = await RefreshToken.findOne({where: { token: requestToken }})
        // console.log(refreshToken)
        if (!refreshToken) {
            res.status(403).json({ message: "Refresh Token not in db"})
            return
        }
        if (RefreshToken.verifyExpiration(refreshToken)){
            RefreshToken.destroy({ where: { id: refreshToken.id}})

            res.status(403).json({ message: "Refresh token expired. Signin again!"})
            return
        }
        const user = await refreshToken.getUser()
        let newAccessToken = jwt.sign({id: user.id}, secret, { expiresIn: jwtExpiration })

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token
        })
    }
    catch (err) {
        return res.status(500).send({ message: err})
    }

}