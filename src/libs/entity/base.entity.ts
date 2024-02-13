import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class BaseEntity {
    @PrimaryColumn('uuid')
    id: string

    @Column({ type: 'timestamp without time zone' })
    createdAt: Date

    @Column({ type: 'timestamp without time zone', default: null })
    updatedAt: Date | null
}