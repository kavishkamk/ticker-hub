import { Router } from "express";
import { requireAuth } from "@tickethub-kv/common";

import { createTicket } from "../controllers/tickets-controllers";

const router = Router();

// check the signup, 
// if the user did't signup, user can't access bellow routes
router.use(requireAuth);

router.post("/", createTicket);

export { router as ticketRouter };