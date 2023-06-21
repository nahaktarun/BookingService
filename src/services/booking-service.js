const axios = require("axios");
const { BookingRepository } = require("../repository/index");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const ServiceError = require("../utils/errors/service-error");

class BookingService {
  constructor() {
    this.BookingRepository = new BookingRepository();
  }
  async createBooking(data) {
    try {
      const flightId = data.flightId;
      // console.log("DATA", data);
      const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;
      console.log("FLIGHT", flightData);

      let priceOfTheFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in booking process",
          "Insufficient seats"
        );
      }
      const totalCost = priceOfTheFlight * data.noOfSeats;

      const bookingPayload = { ...data, totalCost };
      // console.log("BOOKING PayLOAD", bookingPayload);
      const booking = await this.BookingRepository.create(bookingPayload);
      console.log("BOOKINgiD", booking.flightId);
      const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;

      console.log(flightData.noOfSeats, booking.noOfSeats);
      await axios.patch(updateFlightRequestURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });

      const finalBooking = await this.BookingRepository.update(booking.id, {
        status: "Booked",
      });

      // console.log("RESULT", result);
      // console.log("BOOKING", booking);

      return finalBooking;
    } catch (error) {
      if (
        error.name === "RepositoryError" ||
        error.name === "ValidationError"
      ) {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
