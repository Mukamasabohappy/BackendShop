const express = require("express");
const {
    Addcloth,
    Viewbyid,
    deletecloth,
    updatecloth,
    getAllCloths,
    getClothesByCategory
} = require("../controllers/clothController");

const router = express.Router();

router.post("/add", Addcloth);
router.get("/view/:id", Viewbyid);  
router.delete("/delete/:id", deletecloth);
router.put("/update/:id", updatecloth);
router.get("/all", getAllCloths);
router.get("/category/:category", getClothesByCategory); // ✅ Fixed route

module.exports = router;
