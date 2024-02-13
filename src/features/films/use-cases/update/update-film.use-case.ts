import { inject, injectable } from "inversify";
import { DataSource, EntityManager } from "typeorm";
import { UpdateFilmCommand } from "./update-film.command";
import { TransactionDecorator } from "../../../../libs/decorators/transaction.decorator";
import { FilmService } from "../../application/film.service";
import { FilmRepository } from "../../repository/film.repository";
import { NotFoundError } from "../../../../libs/errors/custom.error";
import { Result } from "../../../../libs/result/result";
import { GenreRepository } from "../../../genres/repository/genre.repository";


@injectable()
export class UpdateFilmUseCase {
    constructor(
        @inject(DataSource) private dataSource: DataSource,
        @inject(FilmService) private filmService: FilmService,
        @inject(FilmRepository) private filmRepo: FilmRepository,
        @inject(GenreRepository) private genreRepo: GenreRepository
    ) { }

    async execute(command: UpdateFilmCommand): Promise<Result<IdType>> {
        const transaction = new TransactionDecorator(this.dataSource)

        const res = await transaction.doOperation(
            command,
            this.doOperation.bind(this)
        )

        return res
    }

    async doOperation(
        data: UpdateFilmCommand,
        manager: EntityManager
    ): Promise<Result<IdType>> {
        const filmEntity = await this.filmRepo.findFilmById(data.id)

        if (!filmEntity) {
            return Result.error(new NotFoundError('film'))
        }

        const genres = await this.genreRepo.findGenresByNames(data.genres)

        if (genres.length !== data.genres.length) {
            return Result.error(new NotFoundError('genre'))
        }

        const result = await this.filmService.updateFilmAndSave({ ...data, genres }, filmEntity, manager)

        return Result.ok({ id: result.getValue()!.id })
    }
}