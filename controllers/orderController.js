const mongoose = require("mongoose");
const Order = require("../models/Order");
const Cloth = require("../models/Cloth");

exports.createOrder = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ error: "User not authenticated" });
        }
        
        const { items } = req.body;
        let totalPrice = 0;

        // Loop over the items array to calculate totalPrice
        for (let item of items) {
            const clothId = mongoose.Types.ObjectId(item.clothId);  // Convert clothId to ObjectId
            
            const cloth = await Cloth.findById(clothId);
            if (!cloth) {
                return res.status(404).json({ error: `Cloth with ID ${item.clothId} not found` });
            }

            totalPrice += cloth.price * item.quantity;
        }

        const newOrder = new Order({
            userId: req.user.userId,
            items,
            totalPrice
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create order" });
    }
};

// Get all orders from database
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders
    res.status(200).json(orders); // Respond with the orders
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.userId }).populate("items.clothId", "name price");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};


exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("items.clothId", "name price");
        if (!order) return res.status(404).json({ error: "Order not found" });

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ error: "Failed to update order status" });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found" });

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete order" });
    }
};
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("items.clothId", "name price userId status totalPrice");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};