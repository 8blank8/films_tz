import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import HttpStatus from 'http-status-codes'
import { GenreQueryRepository } from "../repository/genre.query.repository";
import { CreateGenreUseCase } from "../use-cases/create/create-genre.use-case";
import { CreateGenreCommand } from "../use-cases/create/create-genre.command";
import { UpdateGenreUseCase } from "../use-cases/update/update-genre.use-case";
import { UpdateGenreCommand } from "../use-cases/update/update-genre.command";
import { DeleteGenreUseCase } from "../use-cases/delete/delete-genre.use-case";
import { DeleteGenreCommand } from "../use-cases/delete/delete-genre.command";
import { PaginatedFilters } from "../../../libs/querySettings/paginated";


@injectable()
export class GenreController {
    constructor(
        @inject(GenreQueryRepository) private genreQueryRepo: GenreQueryRepository,
        @inject(CreateGenreUseCase) private createGenreUseCase: CreateGenreUseCase,
        @inject(UpdateGenreUseCase) private updateGenreUseCase: UpdateGenreUseCase,
        @inject(DeleteGenreUseCase) private deleteGenreUseCase: DeleteGenreUseCase
    ) { }

    async createGenre(req: Request, res: Response) {
        const result = await this.createGenreUseCase.execute(new CreateGenreCommand(req.body))
        return res.status(HttpStatus.CREATED).send(result.getValue())
    }

    async updateGenre(req: Request, res: Response) {
        const result = await this.updateGenreUseCase.execute(new UpdateGenreCommand({ id: req.params.id, ...req.body }))

        if (result.getError().code === HttpStatus.NOT_FOUND) {
            return res.status(HttpStatus.NOT_FOUND).send(result.getError())
        }

        return res.status(HttpStatus.CREATED).send(result.getValue())
    }

    async deleteGenre(req: Request, res: Response) {
        const result = await this.deleteGenreUseCase.execute(new DeleteGenreCommand({ id: req.params.id }))

        if (result.getError().code === HttpStatus.NOT_FOUND) {
            return res.status(HttpStatus.NOT_FOUND).send(result.getError())
        }

        return res.sendStatus(HttpStatus.NO_CONTENT)
    }


    async findAllGenres(req: Request<{}, {}, {}, PaginatedFilters>, res: Response) {
        const result = await this.genreQueryRepo.findAllGenres(req.query)

        return res.status(HttpStatus.OK).send(result.getValue())
    }

    async findGenreById(req: Request, res: Response) {
        const result = await this.genreQueryRepo.findGenreById(req.params.id)

        if (result.getError().code === HttpStatus.NOT_FOUND) {
            return res.status(HttpStatus.NOT_FOUND).send(result.getError())
        }

        return res.status(HttpStatus.OK).send(result.getValue())
    }
} 