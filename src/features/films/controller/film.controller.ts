import { inject, injectable } from "inversify"
import HttpStatus from 'http-status-codes'
import { Response, Request } from "express"
import { CreateFilmUseCase } from "../use-cases/create/create-film.use-case"
import { CreateFilmCommand } from "../use-cases/create/create-film.command"
import { FilmQueryRepository } from "../repository/film.query.repository"
import { UpdateFilmUseCase } from "../use-cases/update/update-film.use-case"
import { UpdateFilmCommand } from "../use-cases/update/update-film.command"
import { DeleteFilmUseCase } from "../use-cases/delete/delete-film.use-case"
import { DeleteFilmCommand } from "../use-cases/delete/delete.-film.command"
import { FilmQueryParam } from "./types/film-query.types"


@injectable()
export class FilmController {
    constructor(
        @inject(CreateFilmUseCase) private createFilmUseCase: CreateFilmUseCase,
        @inject(UpdateFilmUseCase) private updateFilmUseCase: UpdateFilmUseCase,
        @inject(FilmQueryRepository) private filmQueryRepository: FilmQueryRepository,
        @inject(DeleteFilmUseCase) private deleteFilmUseCase: DeleteFilmUseCase
    ) { }

    async createFilm(req: Request, res: Response) {

        const result = await this.createFilmUseCase.execute(new CreateFilmCommand(req.body))

        if (result.getError().code === HttpStatus.NOT_FOUND) {
            return res.status(HttpStatus.NOT_FOUND).send(result.getError())
        }

        return res.status(HttpStatus.CREATED).send(result.getValue())
    }

    async updateFilm(req: Request, res: Response) {

        const result = await this.updateFilmUseCase.execute(new UpdateFilmCommand({ id: req.params.id, ...req.body }))

        if (result.getError().code === HttpStatus.NOT_FOUND) {
            return res.status(HttpStatus.NOT_FOUND).send(result.getError())
        }

        return res.status(HttpStatus.CREATED).send(result.getValue())
    }

    async deleteFilm(req: Request, res: Response) {

        const result = await this.deleteFilmUseCase.execute(new DeleteFilmCommand({ id: req.params.id }))

        if (result.getError().code === HttpStatus.NOT_FOUND) {
            return res.status(HttpStatus.NOT_FOUND).send(result.getError())
        }

        return res.sendStatus(HttpStatus.NO_CONTENT)
    }

    async findAllFilms(req: Request<{}, {}, {}, FilmQueryParam>, res: Response) {

        const result = await this.filmQueryRepository.findAllFilms(req.query)

        return res.status(HttpStatus.OK).send(result.getValue())
    }

    async findFilmById(req: Request, res: Response) {

        const result = await this.filmQueryRepository.findFilmById(req.params.id)

        if (result.getError().code === HttpStatus.NOT_FOUND) {
            return res.status(HttpStatus.NOT_FOUND).send(result.getError())
        }

        return res.status(HttpStatus.OK).send(result.getValue())
    }
}