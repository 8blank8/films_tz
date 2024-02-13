import { config } from 'dotenv'
config()
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { FilmEntity } from '../../features/films/entity/film.entity'
import { GenreEntity } from '../../features/genres/entity/genre.entity'
import { DataSource } from 'typeorm'


const allEntities = [FilmEntity, GenreEntity]

const isTest = process.env.NODE_ENV === 'test'

const postgresConnectionOptions: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env[isTest ? 'DB_TEST_HOST' : 'DB_HOST'],
    port: Number(process.env[isTest ? 'DB_TEST_PORT' : 'DB_PORT']),
    username: process.env[isTest ? 'DB_TEST_USERNAME' : 'DB_USERNAME'],
    password: process.env[isTest ? 'DB_TEST_PASSWORD' : 'DB_PASSWORD'],
    database: process.env[isTest ? 'DB_TEST_NAME' : 'DB_NAME'],
    entities: allEntities,
    logging: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}']
}


export const postgresDataSource = new DataSource(postgresConnectionOptions)
