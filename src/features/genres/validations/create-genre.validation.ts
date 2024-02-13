import { validationMiddleware } from "../../../libs/middlewares/validation.middleware";
import { getProperty } from "../../../libs/utils/get-property-class";
import { GenreValidationEnum } from "../../../libs/validation/enums/genre-validation.enum";
import { Validator } from "../../../libs/validation/validator";
import { CreateGenreCommand } from "../use-cases/create/create-genre.command";


const genre = getProperty(CreateGenreCommand)

export const createGenreValidation = [
    Validator.isNotEmpty(genre.name),
    Validator.isLength(genre.name, GenreValidationEnum.nameMinLenth, GenreValidationEnum.nameMaxLength),

    Validator.isNotEmpty(genre.locateName),
    Validator.isLength(genre.locateName, GenreValidationEnum.locationNameMinLength, GenreValidationEnum.locationNameMaxLength),

    Validator.isNotEmpty(genre.description),
    Validator.isLength(genre.description, GenreValidationEnum.descriptionMinLength, GenreValidationEnum.descriptionMaxLength),

    validationMiddleware
]