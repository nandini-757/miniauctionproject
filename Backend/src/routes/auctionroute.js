
import { Router } from "express";

import { createAuction, getAuctions, placeBid } from "../controllers/auctioncontroller.js";
import { closeauction } from "../controllers/closeauctioncontroller.js";
import { protect } from "../middlewares/authmiddleware.js";
import { searchauction } from "../controllers/searchauctioncontroller.js";
const router = Router();

router.post("/create", protect,createAuction);
router.get("/getauctions",protect, getAuctions);
router.post("/bid/:id",protect, placeBid);
router.post("/closeauction/:id", protect, closeauction);
router.get("/searchauction",protect, searchauction);
export default router;