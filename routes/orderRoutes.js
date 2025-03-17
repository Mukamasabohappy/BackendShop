const express = require("express");
const { createOrder, getUserOrders, getOrderById, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const authMiddleware = require("../middlewares/orderMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.get("/", authMiddleware, getUserOrders);
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id", authMiddleware, updateOrderStatus);
router.delete("/:id", authMiddleware, deleteOrder);

module.exports = router;
