const MenuItem = require("../models/MenuItem");
const Restaurant = require("../models/Restaurant");

// @desc    Get all menu items (with filters)
// @route   GET /api/menu
// @access  Public
const getAllMenuItems = async (req, res) => {
  try {
    const { restaurant, category, isVeg, search, page = 1, limit = 20 } = req.query;

    const query = {};
    if (restaurant) query.restaurant = restaurant;
    if (category) query.category = category;
    if (isVeg !== undefined) query.isVeg = isVeg === "true";
    if (search) query.name = { $regex: search, $options: "i" };

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      MenuItem.find(query)
        .populate("restaurant", "name")
        .populate("category", "name")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      MenuItem.countDocuments(query),
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      items,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
      .populate("restaurant", "name address")
      .populate("category", "name");

    if (!item) {
      return res.status(404).json({ success: false, message: "Menu item not found" });
    }

    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create menu item
// @route   POST /api/menu
// @access  Private (restaurant_owner, admin)
const createMenuItem = async (req, res) => {
  try {
    const {
      name, description, price, discountedPrice,
      restaurant, category, isVeg, tags, preparationTime,
    } = req.body;

    // Restaurant owners can only add to their own restaurant
    if (req.user.role === "restaurant_owner") {
      const rest = await Restaurant.findById(restaurant);
      if (!rest || rest.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: "Not your restaurant" });
      }
    }

    const item = await MenuItem.create({
      name,
      description,
      price,
      discountedPrice: discountedPrice || null,
      restaurant,
      category,
      isVeg,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      preparationTime,
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json({ success: true, message: "Menu item created", item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private (restaurant_owner, admin)
const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Menu item not found" });

    // Restaurant owners can only update their own items
    if (req.user.role === "restaurant_owner") {
      const rest = await Restaurant.findById(item.restaurant);
      if (!rest || rest.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: "Not your restaurant" });
      }
    }

    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;
    if (updateData.tags && typeof updateData.tags === "string") {
      updateData.tags = updateData.tags.split(",").map((t) => t.trim());
    }

    const updated = await MenuItem.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: "Menu item updated", item: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private (restaurant_owner, admin)
const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Menu item not found" });

    if (req.user.role === "restaurant_owner") {
      const rest = await Restaurant.findById(item.restaurant);
      if (!rest || rest.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: "Not your restaurant" });
      }
    }

    await item.deleteOne();
    res.json({ success: true, message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle availability
// @route   PATCH /api/menu/:id/availability
// @access  Private (restaurant_owner, admin)
const toggleAvailability = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Menu item not found" });

    item.isAvailable = !item.isAvailable;
    await item.save();

    res.json({
      success: true,
      message: `Item marked as ${item.isAvailable ? "available" : "unavailable"}`,
      isAvailable: item.isAvailable,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
};
