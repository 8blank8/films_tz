export class CreateGenreCommand {
    public name: string
    public locateName: string
    public description: string
    constructor(data: CreateGenreCommand) {
        this.name = data.name
        this.locateName = data.locateName
        this.description = data.description
    }
}