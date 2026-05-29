const express = require("express");
const router = express.Router();
const {
  getAllRestaurants, getRestaurantById, createRestaurant,
  updateRestaurant, approveRestaurant, toggleRestaurantOpen, deleteRestaurant,
} = require("../controllers/restaurantController");
const { protect, allowRoles } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.post("/", protect, allowRoles("admin", "restaurant_owner"), upload.single("image"), createRestaurant);
router.put("/:id", protect, allowRoles("admin", "restaurant_owner"), upload.single("image"), updateRestaurant);
router.patch("/:id/approve", protect, allowRoles("admin"), approveRestaurant);
router.patch("/:id/toggle-open", protect, allowRoles("admin", "restaurant_owner"), toggleRestaurantOpen);
router.delete("/:id", protect, allowRoles("admin"), deleteRestaurant);

module.exports = router;
