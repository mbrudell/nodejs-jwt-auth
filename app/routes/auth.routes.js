import express from "express";

import verifySignUp from "../middleware/verifySignUp";
import { signin, signup } from "../controllers/auth.controller"

const router = express.Router();

router.use(function(req, res, next) {
    res.header(
        'Access-Control-Allow-Headers',
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

export default router;