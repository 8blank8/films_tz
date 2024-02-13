import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { GenreEntity } from "../entity/genre.entity";
import { GenreMiniPublicDto } from "../dtos/genre-mini-public.dto";
import { MapperGenre } from "../../../libs/utils/mappers/genre.mapper";
import { GenrePublicDto } from "../dtos/genre-public.dto";
import { Result } from "../../../libs/result/result";
import { NotFoundError } from "../../../libs/errors/custom.error";
import { Paginated, PaginatedFilters } from "../../../libs/querySettings/paginated";
import { GenreQuerySetting } from "../../../libs/querySettings/genre-query.setting";


@injectable()
export class GenreQueryRepository {
    private genreRepo: Repository<GenreEntity>

    constructor(@inject(DataSource) private dataSource: DataSource) {
        this.genreRepo = this.dataSource.getRepository(GenreEntity)
    }

    async findAllGenres(queryParams: PaginatedFilters): Promise<Result<Paginated<GenreMiniPublicDto>>> {
        const { pageNumber = GenreQuerySetting.pageNumber, pageSize = GenreQuerySetting.pageSize } = queryParams

        const genres = await this.genreRepo.find({
            where: { isDeleted: false },
            skip: (+pageNumber - 1) * +pageSize,
            take: +pageSize
        })

        const count = await this.genreRepo.count({ where: { isDeleted: false } })

        return Result.ok(Paginated.new({
            page: pageNumber,
            size: pageSize,
            count: count,
            items: MapperGenre.mapGenresToPublic(genres)
        }))
    }

    async findGenreById(genreId: string): Promise<Result<GenrePublicDto>> {
        const genre = await this.genreRepo.findOne({
            where: {
                id: genreId,
                isDeleted: false
            }
        })

        if (!genre) {
            return Result.error(new NotFoundError('genre'))
        }

        return Result.ok(MapperGenre.mapGenreToPublic(genre))
    }
}