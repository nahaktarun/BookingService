const { Booking } = require("../models/index");
const { validationError, AppError } = require("../utils/errors/index");
const { StatusCodes } = require("http-status-codes");
class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new validationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot create Booking",
        "There was some issue creating the booking please again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async update(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (data.status) {
        booking.status = data.status;
      }
      await booking.save();
      return booking;
    } catch (error) {
      throw new AppError(
        "RepositoryError",
        "Cannot update Booking",
        "There was some issue update the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
