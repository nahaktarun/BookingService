const express = require("express");
const { BookingController } = require("../../controllers/index");
// const { createChannel } = require("../../utils/messageQueue");
const router = express.Router();

// const channel = await createChannel();

const bookingController = new BookingController();

router.get("/info", (req, res) => {
  return res.json({ message: "response from routes" });
});
router.post("/bookings", bookingController.create);
router.post("/publish", bookingController.sendMessageToQueue);

module.exports = router;
