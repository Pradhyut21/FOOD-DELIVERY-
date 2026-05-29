const express = require("express");
const router = express.Router();
const {
  getAllMenuItems, getMenuItemById, createMenuItem,
  updateMenuItem, deleteMenuItem, toggleAvailability,
} = require("../controllers/menuController");
const { protect, allowRoles } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);
router.post("/", protect, allowRoles("admin", "restaurant_owner"), upload.single("image"), createMenuItem);
router.put("/:id", protect, allowRoles("admin", "restaurant_owner"), upload.single("image"), updateMenuItem);
router.delete("/:id", protect, allowRoles("admin", "restaurant_owner"), deleteMenuItem);
router.patch("/:id/availability", protect, allowRoles("admin", "restaurant_owner"), toggleAvailability);

module.exports = router;
