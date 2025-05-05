import express from "express";

import searchController from "../controller/searchController.js";

const router = express.Router();

router.post("/search", searchController);

export default router;