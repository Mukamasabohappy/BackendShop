const Cloth = require("../models/Cloth");

// Add a new cloth
exports.Addcloth = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newCloth = new Cloth({ name, description, price });
        await newCloth.save();
        res.status(201).json({ message: "Cloth added successfully", cloth: newCloth });
    } catch (error) {
        res.status(500).json({ error: "Failed to add cloth" });
    }
};

// View cloth by ID
exports.Viewbyid = async (req, res) => {
    try {
        const cloth = await Cloth.findById(req.params.id);
        if (!cloth) return res.status(404).json({ error: "Cloth not found" });
        res.json(cloth);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cloth" });
    }
};

// Delete cloth by ID
exports.deletecloth = async (req, res) => {
    try {
        const cloth = await Cloth.findByIdAndDelete(req.params.id);
        if (!cloth) return res.status(404).json({ error: "Cloth not found" });
        res.json({ message: "Cloth deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete cloth" });
    }
};

// Update cloth details
exports.updatecloth = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const cloth = await Cloth.findByIdAndUpdate(req.params.id, { name, description, price }, { new: true });
        if (!cloth) return res.status(404).json({ error: "Cloth not found" });
        res.json({ message: "Cloth updated successfully", cloth });
    } catch (error) {
        res.status(500).json({ error: "Failed to update cloth" });
    }
};
