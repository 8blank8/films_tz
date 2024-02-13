import { inject, injectable } from "inversify";
import { DataSource, EntityManager } from "typeorm";
import { CreateGenreCommand } from "./create-genre.command";
import { Result } from "../../../../libs/result/result";
import { TransactionDecorator } from "../../../../libs/decorators/transaction.decorator";
import { GenreService } from "../../application/genre.service";
import { GenreEntity } from "../../entity/genre.entity";

@injectable()
export class CreateGenreUseCase {
    constructor(
        @inject(DataSource) private dataSource: DataSource,
        @inject(GenreService) private genreService: GenreService
    ) { }

    async execute(command: CreateGenreCommand): Promise<Result<IdType>> {
        const transaction = new TransactionDecorator(this.dataSource)

        return transaction.doOperation(
            command,
            this.doOperation.bind(this)
        )
    }

    async doOperation(
        data: CreateGenreCommand,
        manager: EntityManager
    ): Promise<Result<IdType>> {

        const genre = new GenreEntity()

        const result = await this.genreService.fillGenreAndSave(data, genre, manager)

        return Result.ok({ id: result.getValue()!.id })
    }
}