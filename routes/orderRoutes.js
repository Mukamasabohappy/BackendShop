const express = require("express");
const { createOrder, getUserOrders, getOrderById, updateOrderStatus, deleteOrder, getAllOrders } = require("../controllers/orderController");
const authMiddleware = require("../middlewares/orderMiddleware");

const router = express.Router();

// Admin access check middleware
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: "Access denied. Admins only." });
};

router.post("/create", authMiddleware, createOrder); // Create order
router.get("/", authMiddleware, getUserOrders); // Get user orders
router.get("/:id", authMiddleware, getOrderById); // Get order by ID
router.put("/:id", authMiddleware, updateOrderStatus); // Update order status
router.delete("/:id", authMiddleware, deleteOrder); // Delete order
router.get("/all", authMiddleware,  getAllOrders); // Get all orders (Admin only)

module.exports = router;
