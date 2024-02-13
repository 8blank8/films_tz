export class UpdateFilmCommand {
    public id: string
    public title: string
    public locateTitle: string
    public year: number
    public rating: number
    public description: string
    public genres: string[]
    constructor(data: UpdateFilmCommand) {
        this.id = data.id
        this.title = data.title
        this.locateTitle = data.locateTitle
        this.year = +data.year
        this.rating = +data.rating
        this.description = data.description
        this.genres = data.genres
    }
}