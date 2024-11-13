import { Router } from "express";
import loansController from "../controller/loans.controller.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { loansSchema } from "../schema/loan.schema.js";

const router = Router();

router.post("/", validate(loansSchema), loansController.createLoanController);
router.get("/", loansController.findAllLoansController);

export default router;
