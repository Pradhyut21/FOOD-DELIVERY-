const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
const getAllRestaurants = async (req, res) => {
  try {
    const { city, cuisine, search, page = 1, limit = 20 } = req.query;
    const query = { isApproved: true };

    if (city) query["address.city"] = { $regex: city, $options: "i" };
    if (cuisine) query.cuisine = { $in: [cuisine] };
    if (search) query.name = { $regex: search, $options: "i" };

    const skip = (Number(page) - 1) * Number(limit);
    const [restaurants, total] = await Promise.all([
      Restaurant.find(query).skip(skip).limit(Number(limit)).sort({ rating: -1 }),
      Restaurant.countDocuments(query),
    ]);

    res.json({ success: true, total, page: Number(page), pages: Math.ceil(total / Number(limit)), restaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get restaurant by ID
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate("owner", "name email phone");
    if (!restaurant) return res.status(404).json({ success: false, message: "Restaurant not found" });
    res.json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create restaurant
// @route   POST /api/restaurants
// @access  Private (restaurant_owner, admin)
const createRestaurant = async (req, res) => {
  try {
    const { name, description, email, phone, address, cuisine, deliveryTime, minOrderAmount, deliveryFee } = req.body;

    const restaurantData = {
      name, description, email, phone, address,
      cuisine: cuisine ? (Array.isArray(cuisine) ? cuisine : cuisine.split(",").map((c) => c.trim())) : [],
      deliveryTime, minOrderAmount, deliveryFee,
      owner: req.user._id,
      image: req.file ? req.file.filename : "",
      isApproved: req.user.role === "admin", // Auto-approve for admin
    };

    const restaurant = await Restaurant.create(restaurantData);

    // Link restaurant to owner
    if (req.user.role === "restaurant_owner") {
      await User.findByIdAndUpdate(req.user._id, { restaurantId: restaurant._id });
    }

    res.status(201).json({ success: true, message: "Restaurant created", restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update restaurant
// @route   PUT /api/restaurants/:id
// @access  Private (restaurant_owner, admin)
const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: "Restaurant not found" });

    if (req.user.role === "restaurant_owner" && restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not your restaurant" });
    }

    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;
    if (updateData.cuisine && typeof updateData.cuisine === "string") {
      updateData.cuisine = updateData.cuisine.split(",").map((c) => c.trim());
    }

    const updated = await Restaurant.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, message: "Restaurant updated", restaurant: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve / reject restaurant (admin only)
// @route   PATCH /api/restaurants/:id/approve
// @access  Private (admin)
const approveRestaurant = async (req, res) => {
  try {
    const { isApproved } = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );
    if (!restaurant) return res.status(404).json({ success: false, message: "Restaurant not found" });
    res.json({
      success: true,
      message: `Restaurant ${isApproved ? "approved" : "rejected"}`,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle restaurant open/closed
// @route   PATCH /api/restaurants/:id/toggle-open
// @access  Private (restaurant_owner, admin)
const toggleRestaurantOpen = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: "Restaurant not found" });

    if (req.user.role === "restaurant_owner" && restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not your restaurant" });
    }

    restaurant.isOpen = !restaurant.isOpen;
    await restaurant.save();

    res.json({ success: true, message: `Restaurant is now ${restaurant.isOpen ? "open" : "closed"}`, isOpen: restaurant.isOpen });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete restaurant (admin)
// @route   DELETE /api/restaurants/:id
// @access  Private (admin)
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: "Restaurant not found" });
    res.json({ success: true, message: "Restaurant deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  approveRestaurant,
  toggleRestaurantOpen,
  deleteRestaurant,
};
