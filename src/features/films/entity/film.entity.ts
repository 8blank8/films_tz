import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { GenreEntity } from "../../genres/entity/genre.entity";
import { BaseEntity } from "../../../libs/entity/base.entity";


@Entity()
export class FilmEntity extends BaseEntity {

    @Column()
    title: string

    @Column()
    locateTitle: string

    @Column()
    year: number

    @Column({ type: 'float' })
    rating: number

    @Column()
    description: string

    @Column({ default: false })
    isDeleted: boolean

    @ManyToMany(() => GenreEntity)
    @JoinTable()
    genres: GenreEntity[]

}