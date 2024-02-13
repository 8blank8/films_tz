import 'reflect-metadata'
import { Container } from 'inversify'
import { FilmController } from '../features/films/controller/film.controller'
import { FilmService } from '../features/films/application/film.service'
import { CreateFilmUseCase } from '../features/films/use-cases/create/create-film.use-case'
import { DataSource } from 'typeorm'
import { FilmQueryRepository } from '../features/films/repository/film.query.repository'
import { UpdateFilmUseCase } from '../features/films/use-cases/update/update-film.use-case'
import { FilmRepository } from '../features/films/repository/film.repository'
import { DeleteFilmUseCase } from '../features/films/use-cases/delete/delete-film.use-case'
import { GenreController } from '../features/genres/controller/genres.controller'
import { postgresDataSource } from '../infra/postgres/postgres.config'
import { GenreService } from '../features/genres/application/genre.service'
import { GenreQueryRepository } from '../features/genres/repository/genre.query.repository'
import { CreateGenreUseCase } from '../features/genres/use-cases/create/create-genre.use-case'
import { GenreRepository } from '../features/genres/repository/genre.repository'
import { UpdateGenreUseCase } from '../features/genres/use-cases/update/update-genre.use-case'
import { DeleteGenreUseCase } from '../features/genres/use-cases/delete/delete-genre.use-case'

export const container = new Container()

container.bind<DataSource>(DataSource).toConstantValue(postgresDataSource)

container.bind(FilmController).to(FilmController)

container.bind(FilmService).to(FilmService)
container.bind(CreateFilmUseCase).to(CreateFilmUseCase)
container.bind(UpdateFilmUseCase).to(UpdateFilmUseCase)
container.bind(DeleteFilmUseCase).to(DeleteFilmUseCase)
container.bind(FilmQueryRepository).to(FilmQueryRepository)
container.bind(FilmRepository).to(FilmRepository)

container.bind(GenreController).to(GenreController)
container.bind(GenreService).to(GenreService)
container.bind(GenreQueryRepository).to(GenreQueryRepository)
container.bind(GenreRepository).to(GenreRepository)
container.bind(CreateGenreUseCase).to(CreateGenreUseCase)
container.bind(UpdateGenreUseCase).to(UpdateGenreUseCase)
container.bind(DeleteGenreUseCase).to(DeleteGenreUseCase)

