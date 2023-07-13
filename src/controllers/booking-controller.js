const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const bookingService = new BookingService();
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
class BookingController {
  constructor() {}

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "This is a notification from queue",
        content: "Some Queue will subscribe this",
        receipientEmail: "tarunnahak@yahoo.com",
      },
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json({
      message: "Successfully published the event",
    });
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        message: "Successfully completed booking",
        success: true,
        error: {},
        data: response,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }
}

module.exports = BookingController;
