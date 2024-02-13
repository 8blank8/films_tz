import { Router } from 'express'
import { FilmController } from './film.controller'
import { container } from '../../../composition-root/composition-root'
import { createFilmValidator } from '../validations/create-film.validator'
import { updateFilmValidator } from '../validations/update-film.validator'
import { deleteFilmValidator } from '../validations/delete-film.validator'
import { findByIdValidation } from '../../../libs/validation/find-by-id.validation'

const filmController = container.resolve(FilmController)
export const filmRouter = Router({})

filmRouter.post(
    '/',
    createFilmValidator,
    filmController.createFilm.bind(filmController)
)

filmRouter.put(
    '/:id',
    updateFilmValidator,
    filmController.updateFilm.bind(filmController),
)

filmRouter.delete(
    '/:id',
    deleteFilmValidator,
    filmController.deleteFilm.bind(filmController)
)

filmRouter.get(
    '/',
    filmController.findAllFilms.bind(filmController)
)

filmRouter.get(
    '/:id',
    findByIdValidation,
    filmController.findFilmById.bind(filmController)
)


