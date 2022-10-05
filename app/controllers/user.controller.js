import User from "../models/user.model.js"

export const allAccess = (req, res) => {
    res.status(200).send("Public Content.")
}

export const userBoard = (req, res) => {
    res.status(200).send("User Content")
}

export const userList = (req, res) => {
    User.findAll({
        attributes: ['id', 'username', 'email', 'createdAt']
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not retrieve users"
        })
    })
}

export const adminBoard = (req, res) => {
    User.findAll({
        attributes: ['id', 'username', 'email', 'createdAt']
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not retrieve users"
        })
    })
}

export const moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content")
}