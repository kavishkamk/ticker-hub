import { requireAuth, validateRequest } from "@tickethub-kv/common";
import { Router } from "express";
import { body } from "express-validator";
import { newPaymentController } from "../controllers/new-payment-controller";

const router = Router();

// should be authenticated for proforem operations after this
router.use(requireAuth);

router.post(
    "/",
    [
        body("token")
            .not()
            .isEmpty(),
        body("orderId")
            .not()
            .isEmpty()
    ],
    validateRequest,
    newPaymentController
);

export { router as paymentRouter };