const Cloth = require("../models/Cloth");

// ✅ Add a new cloth
exports.Addcloth = async (req, res) => {
    try {
        console.log("Received Data:", req.body);  // Debugging
        const { name, description, price, category, photo } = req.body;

        if (!name || !description || !price || !category || !photo) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newCloth = new Cloth({ name, description, price, category: category.toLowerCase(), photo });
        await newCloth.save();

        console.log("Saved Cloth:", newCloth);
        res.status(201).json({ message: "Cloth added successfully", cloth: newCloth });
    } catch (error) {
        console.error("Error adding cloth:", error);
        res.status(500).json({ error: "Failed to add cloth" });
    }
};

// ✅ View cloth by ID
exports.Viewbyid = async (req, res) => {
    try {
        const cloth = await Cloth.findById(req.params.id);
        if (!cloth) return res.status(404).json({ error: "Cloth not found" });
        res.json(cloth);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cloth" });
    }
};

// ✅ Delete cloth by ID
exports.deletecloth = async (req, res) => {
    try {
        const cloth = await Cloth.findByIdAndDelete(req.params.id);
        if (!cloth) return res.status(404).json({ error: "Cloth not found" });
        res.json({ message: "Cloth deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete cloth" });
    }
};

// ✅ Update cloth details
exports.updatecloth = async (req, res) => {
    try {
        const { name, description, price, category, photo } = req.body;
        const cloth = await Cloth.findByIdAndUpdate(
            req.params.id, 
            { name, description, price, category: category.toLowerCase(), photo }, 
            { new: true }
        );
        if (!cloth) return res.status(404).json({ error: "Cloth not found" });
        res.json({ message: "Cloth updated successfully", cloth });
    } catch (error) {
        res.status(500).json({ error: "Failed to update cloth" });
    }
};

// ✅ Get all clothes
exports.getAllCloths = async (req, res) => {
    try {
        const cloths = await Cloth.find();
        if (!cloths || cloths.length === 0) return res.status(404).json({ error: "No clothes found" });
        res.json(cloths);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch clothes" });
    }
};

// ✅ Get clothes by category
exports.getClothesByCategory = async (req, res) => {
    try {
        const category = req.params.category.toLowerCase(); // ✅ Convert to lowercase
        console.log("Requested category:", category); // Debugging

        const clothes = await Cloth.find({ category });

        if (!clothes || clothes.length === 0) {
            return res.status(404).json({ error: "No clothes found for this category" });
        }

        res.json(clothes);
    } catch (error) {
        console.error("Error fetching clothes by category:", error);
        res.status(500).json({ error: "Failed to fetch clothes by category" });
    }
};
