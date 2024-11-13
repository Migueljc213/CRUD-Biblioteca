import { Router } from "express";
import bookController from "../controller/book.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middlewares.js";
import bookSchema from "../schema/book.schema.js";

const router = Router();

router.get("/", bookController.findAllBooksController);
router.use(authMiddleware);
router.post("/", validate(bookSchema), bookController.createBookController);
router.patch("/:id", validate(bookSchema), bookController.updateBookController);
router.delete("/:id", validate(bookSchema), bookController.deleteBookControler);

export default router;
