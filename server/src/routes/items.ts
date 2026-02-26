import { Router } from "express";
import { getItems, createItem } from "../controllers/itemsController";

const router = Router();

router.get("/", getItems);
router.post("/", createItem);

export default router;
