import { DefaultValidationMessages } from "./validation.messages";
import { body, param } from "express-validator";

export class Validator {

    static isArrayString(field: string) {
        return body(field).custom((value: any[]) => {
            console.log('is array ', Array.isArray(value))
            console.log(value.every(item => typeof item === 'string'))

            return !Array.isArray(value) ? false : true

        })
            .withMessage(DefaultValidationMessages.isArrayString(field))
    }

    static isParamUUID(field: string) {
        return param(field)
            .isString()
            .isUUID()
            .withMessage(DefaultValidationMessages.isUUID(field))
    }

    static isInt(field: string) {
        return body(field)
            .custom((value: any) => {
                return !Number.isNaN(+value)
            })
            .withMessage(DefaultValidationMessages.isNumber(field))
    }

    static isNotEmpty(field: string) {
        return body(field)
            .trim()
            .not()
            .isEmpty()
            .withMessage(DefaultValidationMessages.isNotEmpty(field))
    }

    static isLength(field: string, min: number, max: number) {
        return body(field)
            .trim()
            .isLength({ min })
            .withMessage(DefaultValidationMessages.minLength(field, min))
            .isLength({ max })
            .withMessage(DefaultValidationMessages.maxLength(field, max))
    }

    static isEnum(field: string, value: any) {
        const customValidator = (inputData: any[]): boolean => {
            return inputData.every(item => Object.values(value).includes(item))
        }

        return body(field)
            .custom(customValidator)
            .withMessage(`${field} is not from enum`)
    }
}