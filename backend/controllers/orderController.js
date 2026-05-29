const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const Restaurant = require("../models/Restaurant");

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private (customer)
const placeOrder = async (req, res) => {
  try {
    const { restaurantId, items, deliveryAddress, paymentMethod, instructions } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order must have at least one item" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ success: false, message: "Restaurant not found" });
    if (!restaurant.isOpen) return res.status(400).json({ success: false, message: "Restaurant is currently closed" });

    // Validate items & calculate totals
    let subtotal = 0;
    const resolvedItems = [];

    for (const orderItem of items) {
      const menuItem = await MenuItem.findById(orderItem.menuItem);
      if (!menuItem || !menuItem.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `Item "${menuItem?.name || orderItem.menuItem}" is not available`,
        });
      }
      if (menuItem.restaurant.toString() !== restaurantId) {
        return res.status(400).json({ success: false, message: "All items must be from the same restaurant" });
      }

      const price = menuItem.discountedPrice || menuItem.price;
      subtotal += price * orderItem.quantity;
      resolvedItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        price,
        quantity: orderItem.quantity,
      });
    }

    const deliveryFee = restaurant.deliveryFee || 0;
    const totalAmount = subtotal + deliveryFee;

    if (totalAmount < restaurant.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ₹${restaurant.minOrderAmount}`,
      });
    }

    const order = await Order.create({
      customer: req.user._id,
      restaurant: restaurantId,
      items: resolvedItems,
      deliveryAddress,
      paymentMethod: paymentMethod || "cash_on_delivery",
      instructions,
      subtotal,
      deliveryFee,
      totalAmount,
      statusHistory: [{ status: "pending" }],
    });

    const populatedOrder = await Order.findById(order._id)
      .populate("customer", "name email phone")
      .populate("restaurant", "name address");

    res.status(201).json({ success: true, message: "Order placed successfully", order: populatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get orders for logged-in customer
// @route   GET /api/orders/my-orders
// @access  Private (customer)
const getMyOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = { customer: req.user._id };
    if (status) query.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate("restaurant", "name image")
        .populate("items.menuItem", "name image")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Order.countDocuments(query),
    ]);

    res.json({ success: true, total, page: Number(page), pages: Math.ceil(total / Number(limit)), orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get a single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("restaurant", "name address phone")
      .populate("deliveryAgent", "name phone")
      .populate("items.menuItem", "name image");

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    // Allow only relevant users to view
    const isCustomer = order.customer._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";
    const isDeliveryAgent = order.deliveryAgent?._id?.toString() === req.user._id.toString();
    const isRestaurantOwner =
      req.user.role === "restaurant_owner" &&
      order.restaurant._id.toString() === req.user.restaurantId?.toString();

    if (!isCustomer && !isAdmin && !isDeliveryAgent && !isRestaurantOwner) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Private (restaurant_owner, delivery_agent, admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    const validTransitions = {
      restaurant_owner: ["confirmed", "preparing", "ready", "cancelled"],
      delivery_agent: ["picked_up", "out_for_delivery", "delivered"],
      admin: ["pending", "confirmed", "preparing", "ready", "picked_up", "out_for_delivery", "delivered", "cancelled"],
    };

    const allowed = validTransitions[req.user.role] || [];
    if (!allowed.includes(status)) {
      return res.status(403).json({ success: false, message: `Your role cannot set status to '${status}'` });
    }

    order.status = status;
    order.statusHistory.push({ status, note: note || "" });

    if (status === "delivered") {
      order.deliveredAt = new Date();
      order.isPaid = order.paymentMethod === "cash_on_delivery" ? true : order.isPaid;
    }

    await order.save();

    res.json({ success: true, message: `Order status updated to '${status}'`, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel order (by customer)
// @route   PATCH /api/orders/:id/cancel
// @access  Private (customer)
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    if (order.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not your order" });
    }

    const cancellableStatuses = ["pending", "confirmed"];
    if (!cancellableStatuses.includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order in '${order.status}' status`,
      });
    }

    order.status = "cancelled";
    order.statusHistory.push({ status: "cancelled", note: "Cancelled by customer" });
    await order.save();

    res.json({ success: true, message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders (admin) or restaurant's orders (restaurant_owner) or agent's orders
// @route   GET /api/orders
// @access  Private (admin, restaurant_owner, delivery_agent)
const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) query.status = status;

    if (req.user.role === "restaurant_owner") {
      query.restaurant = req.user.restaurantId;
    } else if (req.user.role === "delivery_agent") {
      query.deliveryAgent = req.user._id;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate("customer", "name phone")
        .populate("restaurant", "name")
        .populate("deliveryAgent", "name phone")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Order.countDocuments(query),
    ]);

    res.json({ success: true, total, page: Number(page), pages: Math.ceil(total / Number(limit)), orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Assign delivery agent to order
// @route   PATCH /api/orders/:id/assign-agent
// @access  Private (admin)
const assignDeliveryAgent = async (req, res) => {
  try {
    const { agentId } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { deliveryAgent: agentId },
      { new: true }
    ).populate("deliveryAgent", "name phone");

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, message: "Delivery agent assigned", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
  assignDeliveryAgent,
};
