import { Request, Response } from "express";
import format from "pg-format";
import { client } from "../Databases/database";
import { CaracterCreate, CaractersResult, iCaracters } from "../Interfaces/interface";



export const createCaracter = async (request: Request, response: Response): Promise<Response> => {
    
    const caracterRequest: CaracterCreate = request.validatedBody

    const queryString: string = format(
        `
            INSERT INTO 
                personagens(%I)
            VALUES
                (%L)
            RETURNING 
                *;
        `,
        Object.keys(caracterRequest),
        Object.values(caracterRequest)
    )

    const queryResult: CaractersResult = await client.query(queryString)

    const newDeveloper: iCaracters = queryResult.rows[0]

    return response.status(201).json(newDeveloper)
}