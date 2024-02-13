import { inject, injectable } from "inversify";
import { DataSource, EntityManager } from "typeorm";
import { UpdateGenreCommand } from "./update-genre.command";
import { Result } from "../../../../libs/result/result";
import { TransactionDecorator } from "../../../../libs/decorators/transaction.decorator";
import { GenreService } from "../../application/genre.service";
import { GenreRepository } from "../../repository/genre.repository";
import { NotFoundError } from "../../../../libs/errors/custom.error";


@injectable()
export class UpdateGenreUseCase {
    constructor(
        @inject(DataSource) private dataSource: DataSource,
        @inject(GenreService) private genreService: GenreService,
        @inject(GenreRepository) private genreRepo: GenreRepository
    ) { }

    async execute(command: UpdateGenreCommand): Promise<Result<IdType>> {
        const transaction = new TransactionDecorator(this.dataSource)

        return transaction.doOperation(
            command,
            this.doOperation.bind(this)
        )
    }

    private async doOperation(
        data: UpdateGenreCommand,
        manager: EntityManager
    ): Promise<Result<IdType>> {

        const genreEntity = await this.genreRepo.findGenreById(data.id)

        if (!genreEntity) {
            return Result.error(new NotFoundError('genre'))
        }

        const result = await this.genreService.updateGenreAndSave(data, genreEntity, manager)
        return Result.ok({ id: result.getValue()!.id })
    }
}