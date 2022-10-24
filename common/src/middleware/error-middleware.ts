// this is default middle ware for handling errors

import { Request, Response, NextFunction } from "express";

import { CustomError } from "../errors/custom-error";

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // if alrady send headers
    if (res.headersSent) {
        return next(err);
    }

    // to handle custome errors
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    // for unhadler errors
    res.status(500)
        .send({ message: err.message || "Something went wrong" });
}

export { errorMiddleware };