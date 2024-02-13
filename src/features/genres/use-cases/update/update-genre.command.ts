export class UpdateGenreCommand {
    public id: string
    public name: string
    public locateName: string
    public description: string
    constructor(data: UpdateGenreCommand) {
        this.id = data.id
        this.name = data.name
        this.locateName = data.locateName
        this.description = data.description
    }
}