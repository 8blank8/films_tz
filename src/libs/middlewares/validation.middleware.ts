import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import HttpStatus from 'http-status-codes'

class ErrorType {
    field: string
    message: string
}

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errorFormatter = (err: any): ErrorType => {
        return {
            field: err.path,
            message: err.msg
        }
    }

    const errors = validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
        return res.status(HttpStatus.BAD_REQUEST).send({ errorsMessages: errors.array() })
    }

    next()
}