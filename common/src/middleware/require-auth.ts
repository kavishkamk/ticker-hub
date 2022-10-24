import { NextFunction, Request, Response } from "express";
import { CommonError } from "../errors/common-error";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        return next(new CommonError(401, "Not Autherized"));
    }
}

export { requireAuth };