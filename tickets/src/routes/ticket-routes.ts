import { Router } from "express";
import { requireAuth, validateRequest } from "@tickethub-kv/common";
import { body } from "express-validator";

import { createTicket } from "../controllers/tickets-controllers";

const router = Router();

// check the signup, 
// if the user did't signup, user can't access bellow routes
// router.use(h);

router.post(
    "/",
    requireAuth,
    [
        body("title")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Title is required"),
        body("price")
            .trim()
            .isFloat({ gt: 0 })
            .withMessage("Price mush be grater than zero")
    ],
    validateRequest,
    createTicket
);

export default router;