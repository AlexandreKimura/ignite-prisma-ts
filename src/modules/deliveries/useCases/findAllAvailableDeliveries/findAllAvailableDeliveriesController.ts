import { Request, Response } from "express";
import { FindAllAvailableDeliveriesUseCase } from "./FindAllAvailableDeliveriesUseCase";

export class FindAllAvailableDeliveriesController {
    async handle(reques: Request, response: Response) {
        const findAllAvailableDeliveriesUseCase = new FindAllAvailableDeliveriesUseCase()

        const deliveries = await findAllAvailableDeliveriesUseCase.execute()

        return response.json(deliveries)
    }
}