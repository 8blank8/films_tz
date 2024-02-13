export class PaginatedFilters {
    pageSize: number
    pageNumber: number
}

export class Paginated<T> {
    pageNumber: number
    pageSize: number
    pagesCount: number
    totalCount: number
    items: Array<T>

    static new<T>(data: { page: number, size: number, count: number, items: Array<T> }): Paginated<T> {
        return {
            pageNumber: +data.page,
            pageSize: +data.size,
            pagesCount: Math.ceil(data.count / +data.size),
            totalCount: data.count,
            items: data.items
        }
    }
}