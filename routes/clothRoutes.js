const express = require("express");
const { Addcloth, Viewbyid, deletecloth, updatecloth } = require("../controllers/clothController");

const router = express.Router();

router.post("/add", Addcloth);
router.get("/view/:id", Viewbyid);  // View by ID should use GET
router.delete("/delete/:id", deletecloth); // DELETE method for deletion
router.put("/update/:id", updatecloth); // PUT for updating

module.exports = router;
