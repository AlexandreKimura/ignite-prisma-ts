import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface IAuthenticateDeliveryman {
    username: string
    password: string
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        //Receber o username, password

        //Verificar o deliveryman cadastrado
        const deliveryman = await prisma.deliveryMan.findFirst({
            where: {
                username
            }
        })

        if(!deliveryman) {
            throw new Error("Username or password invalid!")
        }

        //Verificar se a senha corresponde ao user
        const passwordMatch = await compare(password, deliveryman.password)

        if(!passwordMatch) {
            throw new Error("Username or password invalid!")
        }

        //Gerar token
        const token = sign({ username }, "0e80922269a9c7b704fe91ab8c9a38f4", {
            subject: deliveryman.id,
            expiresIn: "1d"
        })

        return token
    }
}