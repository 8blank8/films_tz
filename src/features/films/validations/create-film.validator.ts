import { CreateFilmCommand } from "../use-cases/create/create-film.command";
import { validationMiddleware } from "../../../libs/middlewares/validation.middleware";
import { getProperty } from "../../../libs/utils/get-property-class";
import { FilmValidationEnum } from "../../../libs/validation/enums/film-validation.enum";
import { Validator } from "../../../libs/validation/validator";

const film = getProperty(CreateFilmCommand)

export const createFilmValidator = [
    Validator.isNotEmpty(film.title),
    Validator.isLength(film.title, FilmValidationEnum.titleMinLength, FilmValidationEnum.titleMaxLength),

    Validator.isNotEmpty(film.locateTitle),
    Validator.isLength(film.locateTitle, FilmValidationEnum.locateTitleMinLength, FilmValidationEnum.locateTitleMaxLength),

    Validator.isNotEmpty(film.description),
    Validator.isLength(film.description, FilmValidationEnum.descriptionMinLength, FilmValidationEnum.descriptionMaxLength),

    Validator.isNotEmpty(film.rating),
    Validator.isInt(film.rating),

    Validator.isNotEmpty(film.genres),
    Validator.isArrayString(film.genres),

    Validator.isNotEmpty(film.year),
    Validator.isInt(film.year),

    validationMiddleware
]