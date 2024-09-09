# Chess Game with Socket.IO

A real-time multiplayer chess game built with Node.js, Socket.IO, and Express. Players can drag and drop pieces to make moves, and the game updates in real-time for both players.

## Features

- Real-time chess game with socket communication.
- Drag and drop functionality for chess pieces.
- Automatically assigns players as White or Black.
- Spectator mode for additional users.
- Synchronizes moves between players.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/siddharttth/chess.com.git
    cd chess.com
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npx nodemon
    ```

   The server will be running on `http://localhost:3000`.

4. Open a browser and go to `http://localhost:3000` to start playing.

## How to Play

1. Open the game on two separate browser windows/tabs to simulate two players.
2. The first player to connect will be assigned as **White**, and the second player will be assigned as **Black**.
3. Drag and drop pieces to make moves. Only valid moves will be processed.
4. Additional players will be assigned as **Spectators** and can watch the game in real-time.

## Technologies Used

- **Node.js**: Backend server.
- **Express**: Web framework for Node.js.
- **Socket.IO**: Real-time bidirectional communication between server and clients.
- **Chess.js**: Library to handle chess move logic.
- **HTML/CSS**: Frontend for displaying the chessboard and pieces.

## File Structure

- `app.js`: Main server file where the Express server and Socket.IO are configured.
- `public/`: Contains static files (CSS, JS).
  - `chessgame.js`: Client-side logic for handling drag-and-drop moves and communicating with the server.
- `views/index.ejs`: Main HTML file rendered by Express to show the chessboard.
- `README.md`: This file.

## Known Issues

- Ensure both players are connected before starting the game, as the first player is automatically assigned **White**.
- Spectators can only view the game and not interact with it.

## Future Improvements

- Add player authentication and user profiles.
- Implement AI for single-player mode.
- Add support for different chess piece styles/themes.
- Improve error handling and move validation.

---

This `README.md` file provides clear instructions on how to install, run, and use your chess game. It also includes information on the file structure and potential improvements.
