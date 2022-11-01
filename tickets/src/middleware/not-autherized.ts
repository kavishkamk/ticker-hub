import { NextFunction, Request, Response } from "express";

const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
    console.log();
};

export { checkAuthentication };