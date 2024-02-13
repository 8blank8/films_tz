import { inject, injectable } from "inversify";
import { FilmEntity } from "../entity/film.entity";
import { DataSource, Repository } from "typeorm";

@injectable()
export class FilmRepository {
    private filmRepo: Repository<FilmEntity>

    constructor(
        @inject(DataSource) private dataSource: DataSource
    ) {
        this.filmRepo = this.dataSource.getRepository(FilmEntity)
    }

    async findFilmById(filmId: string): Promise<FilmEntity | null> {
        return this.filmRepo.findOne(
            {
                where: { id: filmId }
            })
    }
}