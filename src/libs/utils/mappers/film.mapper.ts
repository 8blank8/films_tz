import { FilmMiniPublicDto } from "../../../features/films/dtos/film-mini-public.dto";
import { FilmPublicDto } from "../../../features/films/dtos/film-public.dto";
import { FilmEntity } from "../../../features/films/entity/film.entity";
import { MapperGenre } from "./genre.mapper";


export class MapperFilm {
    static mapFilmsWithGenresToMiniPublic(filmsEntitys: FilmEntity[]): FilmMiniPublicDto[] {
        return filmsEntitys.map((film: FilmEntity): FilmMiniPublicDto => {
            return {
                id: film.id,
                locateTitle: film.locateTitle,
                year: film.year,
                rating: film.rating,
                genres: MapperGenre.mapGenresToPublic(film.genres)
            }
        })
    }

    static mapFilmWithGenresToPublic(filmEntity: FilmEntity): FilmPublicDto {
        return {
            id: filmEntity.id,
            title: filmEntity.title,
            locateTitle: filmEntity.locateTitle,
            year: filmEntity.year,
            rating: filmEntity.rating,
            description: filmEntity.description,
            genres: MapperGenre.mapGenresToPublic(filmEntity.genres)
        }
    }
}