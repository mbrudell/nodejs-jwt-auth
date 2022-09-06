import User from "../models/user.model"
import Role from "../models/role.model"

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // username
    User.findOne({
        where: { username: req.body.username }
    })
    .then(user => {
        if(user){
            res.status(400).send({
                message: "Username already in use!"
            })
            return;
        }
        User.findOne({
            where: { email: req.body.email}
        })
        .then(user => {
            if(user){
                res.status(400).send({
                    message: "Email already in use!"
                })
                return;
            }
            next();
        })
    })
}

checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for(let i =0; i < req.body.roles.length; i++) {
            if(!Role.includes(req.body.roles[i])){
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                })
                return
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
}

export default verifySignUp;