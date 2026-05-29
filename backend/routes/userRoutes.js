const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, createAdmin, toggleUserActive, getDeliveryAgents } = require("../controllers/userController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

router.get("/", protect, allowRoles("admin"), getAllUsers);
router.get("/delivery-agents", protect, allowRoles("admin"), getDeliveryAgents);
router.get("/:id", protect, allowRoles("admin"), getUserById);
router.post("/create-admin", protect, allowRoles("admin"), createAdmin);
router.patch("/:id/toggle-active", protect, allowRoles("admin"), toggleUserActive);

module.exports = router;
