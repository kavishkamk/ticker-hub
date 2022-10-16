import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator/src/validation-result";

import { RequestValidationError } from "../errors/request-validation-error";

const signup = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new RequestValidationError(400, errors.array()));
    }

    const { email, password } = req.body;

    console.log("user creating...");

    res.status(200).send({});

};

const signin = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new RequestValidationError(400, errors.array()));
    }

    res.status(200).send({});
};

const signout = (req: Request, res: Response, next: NextFunction): void => {

};

const getCurrentUsers = (req: Request, res: Response, next: NextFunction): void => {

};

export {
    signup,
    signin,
    signout,
    getCurrentUsers
};