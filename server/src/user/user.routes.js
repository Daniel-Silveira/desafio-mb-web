import express from "express";
import { controller } from "./user.controller.js";

const router = express.Router();

router.post("/registration", controller.create);
router.get("/registration", controller.getAll);

export default router;
