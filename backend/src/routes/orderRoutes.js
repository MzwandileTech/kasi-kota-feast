const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middlewares/authMiddleware");
const {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orderController");

router.post("/", protect, createOrder);
router.get("/:id", protect, getOrderById);
router.get("/", protect, admin, getAllOrders);
router.get("/myorders", protect, getUserOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;
