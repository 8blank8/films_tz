import { Router } from "express";
import { container } from "../../../composition-root/composition-root";
import { GenreController } from "./genres.controller";
import { createGenreValidation } from "../validations/create-genre.validation";
import { updateGenreValidation } from "../validations/update-genre.validation";
import { deleteGenreValidation } from "../validations/delete-genre.validation";
import { findByIdValidation } from "../../../libs/validation/find-by-id.validation";

const genreController = container.resolve(GenreController)

export const genresRouter = Router({})

genresRouter.post(
    '/',
    createGenreValidation,
    genreController.createGenre.bind(genreController)
)

genresRouter.put(
    '/:id',
    updateGenreValidation,
    genreController.updateGenre.bind(genreController)
)

genresRouter.delete(
    '/:id',
    deleteGenreValidation,
    genreController.deleteGenre.bind(genreController)
)

genresRouter.get(
    '/',
    genreController.findAllGenres.bind(genreController)
)

genresRouter.get(
    '/:id',
    findByIdValidation,
    genreController.findGenreById.bind(genreController)
)