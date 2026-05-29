const express = require("express");
const router = express.Router();
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");
const { protect, allowRoles } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

router.get("/", getAllCategories);
router.post("/", protect, allowRoles("admin"), upload.single("image"), createCategory);
router.put("/:id", protect, allowRoles("admin"), upload.single("image"), updateCategory);
router.delete("/:id", protect, allowRoles("admin"), deleteCategory);

module.exports = router;
