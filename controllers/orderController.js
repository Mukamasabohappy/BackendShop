const mongoose = require("mongoose");
const Order = require("../models/Order");
const Cloth = require("../models/Cloth");

exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        let totalPrice = 0;

        // Loop over the items array to calculate totalPrice
        for (let item of items) {
            // Convert clothId to ObjectId to ensure proper lookup in MongoDB
            const clothId = mongoose.Types.ObjectId(item.clothId);  // Convert clothId to ObjectId
            
            // Find the cloth by ObjectId
            const cloth = await Cloth.findById(clothId);

            // If the cloth doesn't exist, return an error
            if (!cloth) {
                return res.status(404).json({ error: `Cloth with ID ${item.clothId} not found` });
            }

            // Add to the total price based on quantity
            totalPrice += cloth.price * item.quantity;
        }

        // Create a new order
        const newOrder = new Order({
            userId: req.user.userId,  // Assuming the userId comes from authenticated user
            items,
            totalPrice
        });

        // Save the new order to the database
        await newOrder.save();

        // Respond with a success message and the created order
        res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        });
    } catch (error) {
        console.error(error);  // Log error for debugging
        res.status(500).json({ error: "Failed to create order" });
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
