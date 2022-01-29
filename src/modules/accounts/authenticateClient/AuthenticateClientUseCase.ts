import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface IAuthenticateClient {
    username: string
    password: string
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        //Receber o username, password

        //Verificar o username cadastrado
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if(!client) {
            throw new Error("Username or password invalid!")
        }

        //Verificar se a senha corresponde ao user
        const passwordMatch = await compare(password, client.password)

        if(!passwordMatch) {
            throw new Error("Username or password invalid!")
        }

        //Gerar token
        const token = sign({ username }, "0e80988269a9c7b704fe91ab8c9a38f4", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token
    }
}