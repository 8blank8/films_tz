import { inject, injectable } from "inversify";
import { DataSource, EntityManager } from "typeorm";
import { GenreService } from "../../application/genre.service";
import { DeleteGenreCommand } from "./delete-genre.command";
import { Result } from "../../../../libs/result/result";
import { TransactionDecorator } from "../../../../libs/decorators/transaction.decorator";
import { GenreRepository } from "../../repository/genre.repository";
import { NotFoundError } from "../../../../libs/errors/custom.error";


@injectable()
export class DeleteGenreUseCase {
    constructor(
        @inject(DataSource) private dataSource: DataSource,
        @inject(GenreService) private genreService: GenreService,
        @inject(GenreRepository) private genreRepo: GenreRepository
    ) { }

    async execute(command: DeleteGenreCommand): Promise<Result> {
        const transaction = new TransactionDecorator(this.dataSource)

        return transaction.doOperation(
            command,
            this.doOperation.bind(this)
        )
    }

    async doOperation(
        data: DeleteGenreCommand,
        manager: EntityManager
    ): Promise<Result> {

        const genreEntity = await this.genreRepo.findGenreById(data.id)

        if (!genreEntity) {
            return Result.error(new NotFoundError('genre'))
        }

        await this.genreService.deleteGenre(genreEntity, manager)

        return Result.ok()
    }
}