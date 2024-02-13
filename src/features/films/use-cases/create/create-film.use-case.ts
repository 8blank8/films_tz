import { inject, injectable } from "inversify";
import { CreateFilmCommand } from "./create-film.command";
import { TransactionDecorator } from "../../../../libs/decorators/transaction.decorator";
import { DataSource, EntityManager } from "typeorm";
import { FilmService } from "../../application/film.service";
import { FilmEntity } from "../../entity/film.entity";
import { Result } from "../../../../libs/result/result";
import { GenreRepository } from "../../../genres/repository/genre.repository";
import { NotFoundError } from "../../../../libs/errors/custom.error";

@injectable()
export class CreateFilmUseCase {
    constructor(
        @inject(DataSource) private dataSource: DataSource,
        @inject(FilmService) private filmService: FilmService,
        @inject(GenreRepository) private genreRepo: GenreRepository,
    ) { }

    async execute(command: CreateFilmCommand): Promise<Result<IdType>> {
        const transaction = new TransactionDecorator(this.dataSource)

        return transaction.doOperation(
            command,
            this.doOperation.bind(this)
        )
    }

    async doOperation(
        data: CreateFilmCommand,
        manager: EntityManager
    ): Promise<Result<IdType>> {

        const genres = await this.genreRepo.findGenresByNames(data.genres)

        if (genres.length !== data.genres.length) {
            return Result.error(new NotFoundError('genre'))
        }

        const filmEntity = new FilmEntity()

        const result = await this.filmService.fillAndSaveFilm({ ...data, genres }, filmEntity, manager)

        return Result.ok({ id: result.getValue()!.id })
    }
}