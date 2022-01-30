import { prisma } from "../../../../database/prismaClient";


export class FindAllAvailableDeliveriesUseCase {

    async execute() {
        const deliveries = await prisma.deliveries.findMany({
            where: {
                end_at: null,
                id_deliveryman: null
            }
        })

        return deliveries
    }
}