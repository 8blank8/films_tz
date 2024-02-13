import { inject, injectable } from "inversify";
import { FilmEntity } from "../entity/film.entity";
import { DataSource, Repository, FindManyOptions, ILike, In } from "typeorm";
import { FilmMiniPublicDto } from "../dtos/film-mini-public.dto";
import { MapperFilm } from "../../../libs/utils/mappers/film.mapper";
import { FilmPublicDto } from "../dtos/film-public.dto";
import { Result } from "../../../libs/result/result";
import { NotFoundError } from "../../../libs/errors/custom.error";
import { FilmQuerySetting } from "../../../libs/querySettings/film-query.setting";
import { Paginated } from "../../../libs/querySettings/paginated";
import { FilmQueryParam } from "../controller/types/film-query.types";


@injectable()
export class FilmQueryRepository {
    private filmRepo: Repository<FilmEntity>

    constructor(
        @inject(DataSource) private dataSource: DataSource
    ) {
        this.filmRepo = this.dataSource.getRepository(FilmEntity)
    }

    async findAllFilms(queryParams: FilmQueryParam): Promise<Result<Paginated<FilmMiniPublicDto>>> {
        const {
            pageNumber = FilmQuerySetting.pageNumber,
            pageSize = FilmQuerySetting.pageSize
        } = queryParams

        const filter = this.getFiltersForFindAllFilms(queryParams)


        const films = await this.filmRepo.find({
            ...filter,
            skip: (+pageNumber - 1) * +pageSize,
            take: +pageSize
        })

        const count = await this.filmRepo.count(filter)

        return Result.ok(
            Paginated.new({
                page: pageNumber,
                size: pageSize,
                count: count,
                items: MapperFilm.mapFilmsWithGenresToMiniPublic(films)
            })
        )
    }

    async findFilmById(filmId: string): Promise<Result<FilmPublicDto>> {
        const film = await this.filmRepo.findOne({
            where: {
                isDeleted: false,
                id: filmId
            },
            relations: {
                genres: true
            },

        })

        if (!film) {
            return Result.error(new NotFoundError('film'))
        }

        return Result.ok(MapperFilm.mapFilmWithGenresToPublic(film))
    }

    private getFiltersForFindAllFilms(filters: FilmQueryParam) {

        const {
            sortBy = FilmQuerySetting.defaultSortBy,
            sortDirection = FilmQuerySetting.defaultSortDirection,
        } = filters

        const filter: FindManyOptions<FilmEntity> = {
            where: {
                isDeleted: false,
            },
            relations: { genres: true },
            order: {},

        };

        if (sortBy) filter.order = { ...filter.order, [sortBy]: sortDirection }

        if (filters.title) filter.where = { ...filter.where, title: ILike(`%${filters.title}%`) };

        if (filters.year) filter.where = { ...filter.where, year: +filters.year }

        if (filters.genres) filter.where = { ...filter.where, genres: { name: In(filters.genres.split(',')) } };

        if (filters.rating) filter.where = { ...filter.where, rating: +filters.rating }

        return filter
    }
}