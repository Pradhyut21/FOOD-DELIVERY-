const express = require("express");
const router = express.Router();
const {
  placeOrder, getMyOrders, getOrderById, updateOrderStatus,
  cancelOrder, getAllOrders, assignDeliveryAgent,
} = require("../controllers/orderController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

// Customer
router.post("/", protect, allowRoles("customer"), placeOrder);
router.get("/my-orders", protect, allowRoles("customer"), getMyOrders);
router.patch("/:id/cancel", protect, allowRoles("customer"), cancelOrder);

// Shared (all roles view their relevant orders)
router.get("/", protect, allowRoles("admin", "restaurant_owner", "delivery_agent"), getAllOrders);
router.get("/:id", protect, getOrderById);

// Status update
router.patch("/:id/status", protect, allowRoles("admin", "restaurant_owner", "delivery_agent"), updateOrderStatus);

// Admin only
router.patch("/:id/assign-agent", protect, allowRoles("admin"), assignDeliveryAgent);

module.exports = router;
