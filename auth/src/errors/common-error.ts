import { CustomError } from "./custom-error";

export class CommonError extends CustomError {
    constructor(public statusCode: number, message: string) {
        super(message);

        Object.setPrototypeOf(this, CommonError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.message }];
    }
}