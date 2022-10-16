// middleware for handle unhandle routes

import { Request, Response, NextFunction } from "express"

import { CommonError } from "../errors/common-error";

const unhandledRouteMiddleWare = (req: Request, res: Response, next: NextFunction): void => {
    return next(new CommonError(404, "Could not find this route"));
}

export default unhandledRouteMiddleWare;