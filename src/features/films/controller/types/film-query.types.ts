import { PaginatedFilters } from "../../../../libs/querySettings/paginated"

export class FilmQueryParam extends PaginatedFilters {
    sortBy?: string
    sortDirection?: string
    title?: string
    year?: string
    rating?: string
    genres?: string
}