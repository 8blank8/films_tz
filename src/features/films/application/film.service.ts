import { injectable } from 'inversify'
import { CreateFilmCommand } from '../use-cases/create/create-film.command';
import { FilmEntity } from '../entity/film.entity';
import { EntityManager } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'
import { UpdateFilmCommand } from '../use-cases/update/update-film.command';
import { Result } from '../../../libs/result/result';
import { GenreEntity } from '../../genres/entity/genre.entity';

type CreateFilmCommandWithGenreEntity = Omit<CreateFilmCommand, 'genres'> & { genres: GenreEntity[] };
type UpdateFilmCommandWithGenreEntity = Omit<UpdateFilmCommand, 'genres'> & { genres: GenreEntity[] };


@injectable()
export class FilmService {

    async fillAndSaveFilm(data: CreateFilmCommandWithGenreEntity, filmEntity: FilmEntity, manager: EntityManager): Promise<Result<FilmEntity>> {

        try {

            filmEntity.id = uuidv4()
            filmEntity.createdAt = new Date()
            filmEntity.title = data.title
            filmEntity.locateTitle = data.locateTitle
            filmEntity.description = data.description
            filmEntity.rating = data.rating
            filmEntity.genres = data.genres
            filmEntity.year = data.year

            await manager.save(filmEntity)

            return Result.ok(filmEntity)
        } catch (error) {
            console.error(error)
        }
        return Result.ok()
    }

    async updateFilmAndSave(data: UpdateFilmCommandWithGenreEntity, filmEntity: FilmEntity, manager: EntityManager): Promise<Result<FilmEntity>> {
        filmEntity.title = data.title
        filmEntity.locateTitle = data.locateTitle
        filmEntity.description = data.description
        filmEntity.rating = data.rating
        filmEntity.genres = data.genres
        filmEntity.year = data.year
        filmEntity.updatedAt = new Date()

        await manager.save(filmEntity)

        return Result.ok(filmEntity)
    }

    async deleteFilm(filmEntity: FilmEntity, manager: EntityManager): Promise<Result<FilmEntity>> {
        filmEntity.isDeleted = true

        await manager.save(filmEntity)

        return Result.ok(filmEntity)
    }
}