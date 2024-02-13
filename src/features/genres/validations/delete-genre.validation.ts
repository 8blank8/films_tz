import { validationMiddleware } from "../../../libs/middlewares/validation.middleware";
import { getProperty } from "../../../libs/utils/get-property-class";
import { Validator } from "../../../libs/validation/validator";
import { DeleteGenreCommand } from "../use-cases/delete/delete-genre.command";


const genre = getProperty(DeleteGenreCommand)

export const deleteGenreValidation = [
    Validator.isParamUUID(genre.id),

    validationMiddleware
]