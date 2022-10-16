import express from "express";
import { body } from "express-validator";

import { signup, signin, signout, getCurrentUsers } from "../controllers/users-controlles";

const router = express.Router();

router.get(
    "/currentuser",
    getCurrentUsers
);

router.post(
    "/signin",
    [
        body('email')
            .normalizeEmail()
            .isEmail()
            .withMessage("Email Must be Valid"),
        body('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage("Password should have at least 6 characters")
    ],
    signin
);

router.post(
    "/signup",
    [
        body('email')
            .normalizeEmail()
            .isEmail()
            .withMessage("Email Must be Valid"),
        body('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage("Password should have at least 6 characters")
    ],
    signup
);

router.post("/signout", signout);

export default router;