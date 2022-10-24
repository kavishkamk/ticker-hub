import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CommonError } from "@tickethub-kv/common";

import { User } from "../models/User";
import { Password } from "../services/password";

const signup = async (req: Request, res: Response, next: NextFunction) => {

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
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    };

    res.status(201).send({ id: createdUser.id, email: createdUser.email });

};

const signin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    let user;

    try {
        user = await User.findOne({ email }).exec();
    } catch (err) {
        return next(new CommonError(500, "Fail, Signin fail during user details searching"));
    }

    if (!user) {
        return next(new CommonError(401, "SignIn fail. Invalid credentials"));
    }

    const passwordMatch = await Password.compare(user.password, password);

    if (!passwordMatch) {
        return next(new CommonError(401, "SignIn fail, Invalid credentials"));
    }

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    }

    res.status(200).send({ id: user.id, email: user.email });
};

const signout = (req: Request, res: Response, next: NextFunction): void => {

    req.session = null;

    res.status(201).send({});

};

const currentUsers = (req: Request, res: Response, next: NextFunction) => {

    res.send({ currentUser: req.currentUser || null });

};

export {
    signup,
    signin,
    signout,
    currentUsers
};