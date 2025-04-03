const mongoose = require("mongoose");

const ClothSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['Men', 'Women', 'Kids'],
      set: (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() // Normalize to proper case (e.g., "men" => "Men")
    },
    photo: { type: String, required: true }, // Added photo field (URL of the image)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cloth", ClothSchema);
