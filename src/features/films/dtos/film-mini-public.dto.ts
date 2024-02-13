import { GenreMiniPublicDto } from "../../genres/dtos/genre-mini-public.dto"

export class FilmMiniPublicDto {
    id: string
    locateTitle: string
    year: number
    rating: number
    genres: GenreMiniPublicDto[]
}