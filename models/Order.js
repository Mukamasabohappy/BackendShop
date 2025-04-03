const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                clothId: { type: mongoose.Schema.Types.ObjectId, ref: "Cloth", required: true },
                quantity: { type: Number, required: true, min: 1 }
            }
        ],
        totalPrice: { type: Number, required: true, default: 0 }, // ✅ Default added
        status: { 
            type: String, 
            enum: ["Pending", "Shipped", "Delivered", "Cancelled"], 
            default: "Pending" 
        }
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// ✅ Debugging middleware before saving an order
OrderSchema.pre("save", function (next) {
    console.log("🔍 Creating Order:", this);
    next();
});

module.exports = mongoose.model("Order", OrderSchema);
