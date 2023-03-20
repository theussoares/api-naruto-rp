import { Client } from 'pg'
import 'dotenv/config'

const client: Client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST,
    database: process.env.DB,
    port: parseInt(process.env.DB_PORT!)
})

const starDataBase = async(): Promise<void> => {
    await client.connect()
    console.log('Database connected')
}

export { client, starDataBase }