import { config } from 'dotenv'
config()
import { connectToDatabase } from "./infra/postgres/postgres.connection";
import express from "express";
import { filmRouter } from "./features/films/controller/film.router";
import { genresRouter } from "./features/genres/controller/genres.router";

const app = express();

export const startApp = async () => {
    app.use(express.json())

    await connectToDatabase()

    app.use('/films', filmRouter)
    app.use('/genres', genresRouter)

    app.listen(process.env.PORT, () => {
        console.log(`app listen port ${process.env.PORT}`)
    })
}

startApp()
export { app }