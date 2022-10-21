import express from "express";
import { body } from "express-validator";

import { signup, signin, signout, currentUsers } from "../controllers/users-controlles";
import validateRequest from "../middleware/validate-request";
import currentUserMiddleware from "../middleware/current-user";

const router = express.Router();

router.get(
    "/currentuser",
    currentUserMiddleware,
    currentUsers
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
            .not()
            .isEmpty()
            .withMessage("Passwrod required")
    ],
    validateRequest,
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
    validateRequest,
    signup
);

router.post("/signout", signout);

export default router;