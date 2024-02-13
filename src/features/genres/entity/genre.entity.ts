import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../libs/entity/base.entity";


@Entity()
export class GenreEntity extends BaseEntity {

    @Column()
    name: string

    @Column()
    locateName: string

    @Column()
    description: string

    @Column({ default: false })
    isDeleted: boolean
}