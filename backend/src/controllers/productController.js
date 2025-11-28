exports.getProducts = (req, res) => res.json({ message: "Get all products" });
exports.getProductById = (req, res) =>
  res.json({ message: "Get product by ID" });
exports.createProduct = (req, res) => res.json({ message: "Create product" });
exports.updateProduct = (req, res) => res.json({ message: "Update product" });
exports.deleteProduct = (req, res) => res.json({ message: "Delete product" });
