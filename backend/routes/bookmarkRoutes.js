import express from "express";

import searchController from "../controller/searchController.js";
import createController from "../controller/createController.js";

const router = express.Router();

router.post("/search", searchController);
router.post("/create", createController);

export default router;