import { GenreMiniPublicDto } from "../../../features/genres/dtos/genre-mini-public.dto";
import { GenrePublicDto } from "../../../features/genres/dtos/genre-public.dto";
import { GenreEntity } from "../../../features/genres/entity/genre.entity";

export class MapperGenre {

    static mapGenresToPublic(genres: GenreEntity[]): GenreMiniPublicDto[] {
        return genres.map((genre: GenreEntity) => {
            return {
                id: genre.id,
                name: genre.name
            }
        })
    }

    static mapGenreToPublic(genre: GenreEntity): GenrePublicDto {
        return {
            id: genre.id,
            locateName: genre.locateName,
            description: genre.description
        }
    }
}