import { injectable } from "inversify";
import { Result } from "../../../libs/result/result";
import { GenreEntity } from "../entity/genre.entity";
import { CreateGenreCommand } from "../use-cases/create/create-genre.command";
import { EntityManager } from "typeorm";
import { v4 as uuidv4 } from 'uuid'
import { UpdateGenreCommand } from "../use-cases/update/update-genre.command";

@injectable()
export class GenreService {
    async fillGenreAndSave(data: CreateGenreCommand, genreEntity: GenreEntity, manager: EntityManager): Promise<Result<GenreEntity>> {
        genreEntity.id = uuidv4()
        genreEntity.createdAt = new Date()
        genreEntity.description = data.description
        genreEntity.name = data.name
        genreEntity.locateName = data.locateName

        await manager.save(genreEntity)

        return Result.ok(genreEntity)
    }

    async updateGenreAndSave(data: UpdateGenreCommand, genreEntity: GenreEntity, manager: EntityManager): Promise<Result<GenreEntity>> {
        genreEntity.description = data.description
        genreEntity.locateName = data.locateName
        genreEntity.name = data.name
        genreEntity.updatedAt = new Date()

        await manager.save(genreEntity)

        return Result.ok(genreEntity)
    }

    async deleteGenre(genreEntity: GenreEntity, manager: EntityManager): Promise<Result> {
        genreEntity.isDeleted = true

        await manager.save(genreEntity)

        return Result.ok()
    }

}