import { validationMiddleware } from "../middlewares/validation.middleware";
import { Validator } from "./validator";


export const findByIdValidation = [
    Validator.isParamUUID('id'),

    validationMiddleware
]