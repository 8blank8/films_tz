import { inject, injectable } from "inversify";
import { DataSource, In, Repository } from "typeorm";
import { GenreEntity } from "../entity/genre.entity";


@injectable()
export class GenreRepository {
    private genreRepo: Repository<GenreEntity>

    constructor(@inject(DataSource) private dataSource: DataSource) {
        this.genreRepo = this.dataSource.getRepository(GenreEntity)
    }

    async findGenreById(genreId: string): Promise<GenreEntity | null> {
        return this.genreRepo.findOne({
            where: { id: genreId }
        })
    }

    async findGenresByNames(genres: string[]): Promise<GenreEntity[]> {
        return this.genreRepo.find({
            where: {
                name: In(genres),
                isDeleted: false
            }
        })
    }
}