exports.getCart = (req, res) => res.json({ message: "Get cart" });
exports.addToCart = (req, res) => res.json({ message: "Add item to cart" });
exports.updateCartItem = (req, res) =>
  res.json({ message: "Update cart item" });
exports.removeFromCart = (req, res) =>
  res.json({ message: "Remove item from cart" });
