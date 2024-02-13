import { GenreMiniPublicDto } from "../../genres/dtos/genre-mini-public.dto"

export class FilmPublicDto {
    id: string
    title: string
    locateTitle: string
    year: number
    rating: number
    description: string
    genres: GenreMiniPublicDto[]
}