import { Router } from "express";
import { requireAuth, validateRequest } from "@tickethub-kv/common";
import { body } from "express-validator";

import { createTicket, getTicket, getTickets, updateTicket } from "../controllers/tickets-controllers";

const router = Router();

router.get(
    "/",
    getTickets
);

router.get(
    "/:ticketId",
    getTicket
);

// check the signup, 
// if the user did't signup, user can't access bellow routes
router.use(requireAuth);

router.post(
    "/",
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

router.put(
    "/:ticketId",
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
    updateTicket
);

export default router;