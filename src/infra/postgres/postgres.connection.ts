import { postgresDataSource } from "./postgres.config"

export const connectToDatabase = async () => {
    await postgresDataSource
        .initialize()
        .then(() => {
            console.log("database connected")
        })
        .catch((err) => {
            console.error("database connection error", err)
        })
}
