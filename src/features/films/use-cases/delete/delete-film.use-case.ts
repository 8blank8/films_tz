import { inject, injectable } from "inversify"
import { DataSource, EntityManager } from "typeorm"
import { DeleteFilmCommand } from "./delete.-film.command"
import { TransactionDecorator } from "../../../../libs/decorators/transaction.decorator"
import { FilmRepository } from "../../repository/film.repository"
import { Result } from "../../../../libs/result/result"
import { NotFoundError } from "../../../../libs/errors/custom.error"
import { FilmService } from "../../application/film.service"

@injectable()
export class DeleteFilmUseCase {
    constructor(
        @inject(DataSource) private dataSource: DataSource,
        @inject(FilmRepository) private filmRepo: FilmRepository,
        @inject(FilmService) private filmService: FilmService
    ) { }

    async execute(command: DeleteFilmCommand): Promise<Result> {
        const transaction = new TransactionDecorator(this.dataSource)

        return transaction.doOperation(
            command,
            this.doOperation.bind(this)
        )
    }

    async doOperation(
        data: DeleteFilmCommand,
        manager: EntityManager
    ): Promise<Result> {

        const filmEntity = await this.filmRepo.findFilmById(data.id)

        if (!filmEntity) {
            return Result.error(new NotFoundError('film'))
        }

        await this.filmService.deleteFilm(filmEntity, manager)

        return Result.ok()

    }
}

