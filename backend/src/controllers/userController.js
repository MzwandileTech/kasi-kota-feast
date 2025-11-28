exports.registerUser = (req, res) => res.json({ message: "Register user" });
exports.loginUser = (req, res) => res.json({ message: "Login user" });
exports.getUserProfile = (req, res) =>
  res.json({ message: "Get user profile" });
exports.updateUserProfile = (req, res) =>
  res.json({ message: "Update user profile" });
