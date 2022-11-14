import { requireAuth, validateRequest } from "@tickethub-kv/common";
import { Router } from "express";
import { body } from "express-validator";
import { Types } from "mongoose";

import { createOrder } from "../controllers/create-order";
import { deleteOrder } from "../controllers/delete-order";
import { getOrder } from "../controllers/get-order-controller";
import { getOrders } from "../controllers/get-orders-controller";

const router = Router();

router.use(requireAuth);

router.get("/:id", getOrder);

router.get("/", getOrders);

router.post(
    "/",
    [
        body("ticketId")
            .not()
            .isEmpty()
            .custom((ticketId: string) => Types.ObjectId.isValid(ticketId))
            .withMessage("Ticket id should be valid"),

    ],
    validateRequest,
    createOrder
);

router.delete("/:id", deleteOrder);

export default router;