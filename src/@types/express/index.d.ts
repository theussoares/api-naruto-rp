import * as express from "express"
export {}

declare global {
    namespace Express {
      interface Request {
        validatedBody: {
          nome: string
          password: string
          patente: string
          image: string
        }
      }
    }
  }