import { Request, Response, NextFunction, request, response } from "express"
import { client } from "../Databases/database"
import { caractersKeys, CaractersResult} from "../Interfaces/interface"

export const verifyBody = (req: Request, res: Response, next: NextFunction): Response | void =>{

    const keys: Array<string> = Object.keys(req.body)
    const requiredKeys: Array<caractersKeys> = ["nome", "password", "patente", "image"]


    const containsAllRequiredKeys: Boolean = requiredKeys.every((key: string) =>{
        return keys.includes(key)
    })

    if (!containsAllRequiredKeys) {
        return res.status(400).json({ message: `Required keys are: ${requiredKeys}` })
    }

    const {nome, password, patente, image} = req.body

    req.validatedBody = {
        nome,
        password,
        patente,
        image
    }

    next()
}

export const verifyNameExist =async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const query: string = 
            `
                SELECT 
                    *
                FROM 
                    personagens;
            `

        const queryResult: CaractersResult = await client.query(query)

        const nameExist: boolean = queryResult.rows.some(developer => developer.nome === req.body.name)
        
        if(nameExist === true){
            return response.status(409).json({message: 'Este nome já existe'})
        }

        next()
    } catch (error) {
        console.error(error)
    }
}