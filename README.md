# Node.js MySQL Flight Booking System - Microservice Architecture

This project is a Flight Booking System built using Node.js and MySQL, following a microservice architecture. It consists of multiple microservices such as authentication, API gateway, booking service, flight and search service, and reminder service. The communication between the microservices is facilitated by RabbitMQ, which acts as the message queue.

## Microservices

1. [Authentication Service](https://github.com/nahaktarun/AuthService)

   - Responsible for user authentication and authorization.
   - Manages user accounts, login, and registration.
   - Generates and verifies JSON Web Tokens (JWT) for secure API access.

2. [API Gateway](https://github.com/nahaktarun/API_Gateway)

   - Serves as the entry point for external requests to the system.
   - Provides a unified API interface for clients to communicate with various microservices.
   - Performs request validation, rate limiting, and routing to the appropriate microservice.

3. [Booking Service](https://github.com/nahaktarun/BookingService)

   - Handles flight bookings and related operations.
   - Allows users to search for available flights, select seats, and make reservations.
   - Manages booking details and communicates with the flight and search service.

4. [Flight and Search Service](https://github.com/nahaktarun/flightsAndSearchService)

   - Manages flight information, including available seats, prices, and schedules.
   - Provides search functionality for users to find flights based on criteria such as origin, destination, and date.
   - Sends notifications to the booking service about flight availability and updates.

5. [Reminder Service](https://github.com/nahaktarun/ReminderService)

   - Sends reminders and notifications to users about upcoming flights, check-in details, and booking updates.
   - Integrates with external notification systems (e.g., email, SMS) to deliver messages.

# Booking Service

The Booking Service is responsible for flight bookings and related operations in the Flight Booking System.

## API Endpoints

- **Create a new booking**

  ```
  POST /api/bookings
  ```

  Create a new flight booking.

  Request Body:

  ```json
  {
    "flightId": "12345",
    "userId": "67890",
    "passengerName": "John Doe",
    "seatNumber": "A12"
  }
  ```

  Response:

  ```json
  {
    "bookingId": "54321",
    "flightId": "12345",
    "userId": "67890",
    "passengerName": "John Doe",
    "seatNumber": "A12",
    "status": "confirmed"
  }
  ```

- **Get booking details by booking ID**

  ```
  GET /api/bookings/:bookingId
  ```

  Retrieve details of a specific flight booking by booking ID.

  Response:

  ```json
  {
    "bookingId": "54321",
    "flightId": "12345",
    "userId": "67890",
    "passengerName": "John Doe",
    "seatNumber": "A12",
    "status": "confirmed"
  }
  ```

- **Get all bookings for a user**

  ```
  GET /api/bookings/users/:userId
  ```

  Retrieve all flight bookings for a specific user.

  Response:

  ```json
  [
    {
      "bookingId": "54321",
      "flightId": "12345",
      "userId": "67890",
      "passengerName": "John Doe",
      "seatNumber": "A12",
      "status": "confirmed"
    },
    {
      "bookingId": "98765",
      "flightId": "54321",
      "userId": "67890",
      "passengerName": "Jane Smith",
      "seatNumber": "B23",
      "status": "confirmed"
    }
  ]
  ```

## Database

The Booking Service interacts with the MySQL database to store and retrieve flight booking information. The necessary database tables and their structure can be found in the `database` folder.

Ensure that you have set up the database connection details correctly in the configuration file of the Booking Service.

## RabbitMQ Integration

The Booking Service integrates with RabbitMQ, the message queue system, to receive notifications and updates from other microservices, such as the Flight and Search Service. This enables real-time communication and synchronization between different components of the Flight Booking System.

Make sure to configure the RabbitMQ connection details in the Booking Service's configuration file to establish a connection and listen to the relevant message queues.

## Setup and Configuration

To set up and run the Booking Service, follow these steps:

1. Install Node.js and MySQL if they are not already installed.

2. Clone the repository:

   ```
   git clone https://github.com/your-username/booking-service.git
   ```

3. Install the dependencies:

   ```
   cd booking-service
   npm install
   ```

4. Set up the MySQL database by creating the required tables. Refer to the SQL scripts in the `database` folder for table creation.

5. Configure the database connection details in the configuration file (`config.js`) of the Booking Service.

6. Configure the RabbitMQ connection details in the configuration file (`config.js`) of the Booking Service.

7. Start the Booking Service:

   ```
   npm start
   ```

The Booking Service should now be running and ready to handle flight bookings and related operations.

## Contributing

Contributions to the Booking Service are welcome. If you find any issues or want to add new features, please open an issue or submit a pull request. Ensure that your code follows the established coding style and is well-documented.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

We would like to acknowledge the following resources and libraries that contributed to the development of the Booking Service:

- Node.js: https://nodejs.org/
- MySQL: https://www.mysql.com/
- RabbitMQ: https://www.rabbitmq.com/
- Express.js: https://expressjs.com/
- Other dependencies mentioned in the `package.json` file.
