import { hash } from "bcrypt"
import { prisma } from "../../../../database/prismaClient"

interface ICreateDeliveryman {
    username: string
    password: string
}

export class CreateDeliverymanUseCase {

    async execute({ username, password }: ICreateDeliveryman) {
        //Validar se o deliveryman existe
        const deliverymanExists = await prisma.deliveryMan.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })

        if(deliverymanExists) {
            throw new Error("Deliveryman already exists!")
        }

        //Criptografar a senha
        const hashPassword = await hash(password, 10)

        //Salvar o deliveryman
        const deliveryman = await prisma.deliveryMan.create({
            data: {
                username,
                password: hashPassword
            }
        })

        return deliveryman
    }
} 