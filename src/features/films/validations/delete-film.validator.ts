import { validationMiddleware } from "../../../libs/middlewares/validation.middleware";
import { getProperty } from "../../../libs/utils/get-property-class";
import { Validator } from "../../../libs/validation/validator";
import { DeleteFilmCommand } from "../use-cases/delete/delete.-film.command";

const film = getProperty(DeleteFilmCommand)

export const deleteFilmValidator = [
    Validator.isParamUUID(film.id),

    validationMiddleware
]