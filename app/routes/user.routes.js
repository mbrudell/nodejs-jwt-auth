import express from 'express';
import { allAccess, userBoard, adminBoard, moderatorBoard, userList } from '../controllers/user.controller.js';
import authJwt from "../middleware/authJwt.js"

const router = express.Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    )
    next();
})

router.get('/api/test/all', allAccess);
router.get(
    '/api/test/user',
    [authJwt.verifyToken],
    userBoard
)

router.get(
    '/api/users',
    [authJwt.verifyToken, authJwt.isAdmin],
    userList
)

router.get(
    '/api/test/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
)
router.get(
    '/api/test/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
)

export default router;