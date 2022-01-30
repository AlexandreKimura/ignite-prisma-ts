import { Request, Response } from "express";
import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";

export class UpdateEndDateController {
    async handle(request: Request, response: Response) {
        const { id_deliveryman } = request
        const { id } = request.params

        const updateEndDateUseCase = new UpdateEndDateUseCase()
        const delivery = await updateEndDateUseCase.execute({
            id_deliveryman,
            id_delivery: id
        })

        return response.json(delivery)
    }
}