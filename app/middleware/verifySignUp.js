import { User, Role } from '../models/associations.model.js'

const checkDuplicateUsernameOrEmail = (req, res, next) => {
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

/**
 * 
 * to improve this function am not satisfied
 * hii function ni WIP
 * 
 */
const checkRolesExisted = async (req, res, next) => {
    if(req.body.roles) {
        // // console.log(req.body.roles)
        // // console.log(User.getRoles())
        // const roles = await Role.findAll({attributes:['name'], raw: true}).ToArray();
        // console.log(roles)
        // for(let i =0; i < req.body.roles.length; i++) {
        //     // roles.map(r => {
        //     //     console.log(r.name)
        //     // })
        //     // console.log(roles.includes(req.body.roles[i]))
        //     // if(!nyef.includes(req.body.roles[i])){
        //         // console.log(nyef.includes(req.body.roles[i]))
        //     // //     res.status(400).send({
        //     // //         message: "Failed! Role does not exist = " + req.body.roles[i]
        //     // //     })
        //     // //     return
        //     // }
        // }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
}

export default verifySignUp;