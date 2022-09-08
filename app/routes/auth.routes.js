import express from "express";

import verifySignUp from "../middleware/verifySignUp.js";
import { signin, signup, refreshToken } from "../controllers/auth.controller.js"

const router = express.Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    )
    next();
})

router.post(
    '/api/auth/signup',
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    signup
)

router.post('/api/auth/signin', signin)

router.post('/api/auth/refreshtoken', refreshToken)

export default router;