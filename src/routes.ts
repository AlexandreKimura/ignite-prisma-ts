import { Router } from "express"
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient"
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman"
import { AuthenticateClientController } from "./modules/accounts/authenticateClient/AuthenticateClientController"
import { AuthenticateDeliverymanController } from "./modules/accounts/authenticateDeliveryman/AuthenticateDeliverymanController"
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController"
import { FindAllDeliveriesController } from "./modules/clients/useCases/findDeliveries/findAllDeliveriesController"
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController"
import { FindAllAvailableDeliveriesController } from "./modules/deliveries/useCases/findAllAvailableDeliveries/findAllAvailableDeliveriesController"
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController"
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController"

const routes = Router()

const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

const createClientController = new CreateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findAllWithoutEndDateController = new FindAllAvailableDeliveriesController()
const updateDeliverymanController = new UpdateDeliverymanController()
const findAllDeliveriesController = new FindAllDeliveriesController()

routes.post("/client/authenticate/", authenticateClientController.handle)
routes.post("/deliveryman/authenticate/", authenticateDeliverymanController.handle)

routes.post("/client/", createClientController.handle)
routes.get("/client/deliveries", ensureAuthenticateClient, findAllDeliveriesController.handle)
routes.post("/deliveryman/", createDeliverymanController.handle)

routes.post("/delivery/", ensureAuthenticateClient, createDeliveryController.handle)
routes.get("/delivery/available", ensureAuthenticateDeliveryman ,findAllWithoutEndDateController.handle)
routes.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle)

export { routes }