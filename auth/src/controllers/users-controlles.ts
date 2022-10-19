import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator/src/validation-result";
import jwt from "jsonwebtoken";

import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/User";
import { CommonError } from "../errors/common-error";

const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new RequestValidationError(400, errors.array()));
    }

    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email }).exec();
    } catch (err) {
        return next(new CommonError(500, "Fail, Signup fail during exsisting user checking"));
    }

    if (existingUser) {
        return next(new CommonError(422, "Signup Fail, Email already Exist"));
    }

    const user = User.build({
        email,
        password
    });

    let createdUser;

    try {
        createdUser = await user.save();
    } catch (err) {
        return next(new CommonError(500, "Fail, Signup fail during user creation"));
    }

    var userJwt = jwt.sign({
        id: createdUser.id,
        email: createdUser.email
    }, "dkjdeiHUp");

    req.session = {
        jwt: userJwt
    };

    res.status(200).send({ user: createdUser.toObject({ getters: true }) });

};

const signin = (req: Request, res: Response, next: NextFunction): void => {
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