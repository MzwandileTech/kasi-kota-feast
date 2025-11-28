exports.createOrder = (req, res) => res.json({ message: "Create order" });
exports.getOrderById = (req, res) => res.json({ message: "Get order by ID" });
exports.getUserOrders = (req, res) => res.json({ message: "Get user orders" });
exports.updateOrderStatus = (req, res) =>
  res.json({ message: "Update order status" });
exports.getAllOrders = (req, res) =>
  res.json({ message: "Get all orders (admin)" });
