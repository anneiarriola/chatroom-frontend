# Chatroom with Vue.js, Node.js, Socket.io, MongoDB, and Vuetify

This project is an interactive chatroom built using modern technologies like Vue.js, Node.js, Socket.io for real-time communication, MongoDB as the database to store messages, and Vuetify for design.

## Technologies Used

- **Vue.js:** A progressive framework for building interactive user interfaces. In this project, Vue.js is used to create the chatroom's user interface, providing a smooth and responsive user experience.

- **Node.js:** A server-side JavaScript runtime environment that allows building scalable and efficient real-time web applications. In this project, Node.js acts as the chatroom server.

- **Socket.io:** A JavaScript library for real-time web applications. Socket.io enables bidirectional real-time communication between clients and servers through WebSockets. It is used to send and receive messages in real-time in the chatroom.

- **MongoDB:** A NoSQL database that allows flexible and scalable data storage. In this project, MongoDB is used to store chat messages, providing reliable and efficient data persistence.

- **Vuetify:** A component framework for Vue.js based on Material Design. Vuetify provides a wide range of pre-designed components, making it easy to create an attractive and consistent user interface for the chatroom.

## Key Features

1. **User Registration and Authentication:**
   - Users can register and log in to access the chatroom.

2. **Real-Time Chat:**
   - Users can send and receive messages in real-time using Socket.io for instant and smooth communication.

3. **Message Storage:**
   - All messages sent in the chatroom are stored in MongoDB, allowing users to view the message history even after closing the application.


## Project Setup

1. **Install Dependencies:**
   - Make sure you have Node.js and MongoDB installed on your system.
   - Run `npm install` in the project directory to install server dependencies.

2. **Database Configuration:**
   - Configure the MongoDB connection in the server configuration file.

3. **Run the Server:**
   - Run `nodemon server.js` to start the chatroom server.

4. **Client Configuration:**
   - Configure the client's connection via Socket.io in the client configuration file (e.g., `src/socket.js`).

5. **Run the Client:**
   - Run `npm run serve` to start the chatroom client application.

## Contribution

We hope you enjoy using this chatroom built with Vue.js, Node.js, Socket.io, MongoDB, and Vuetify!
