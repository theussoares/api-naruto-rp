import { QueryResult } from "pg"

export interface iCaracters {
    nome: string,
    password: string,
    patente: string,
    image: string,
    id?: number
}

export type caractersKeys = "nome" | "password" | "patente" | "image"
export type CaractersResult = QueryResult<iCaracters>
export type CaracterCreate = Omit<iCaracters, 'id'>