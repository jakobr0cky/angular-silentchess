# Silentchess: Play Blindfolded and Improve Your Skills

Welcome to Silentchess, an Angular website where you can challenge the Stockfish chess engine, enhance your skills with blind chess mode, and even play against a friend in multiplayer mode!

Deployed on Github Pages: https://jakobr0cky.github.io/angular-silentchess/ (Multiplayer currently only works on localhost)

Backend: https://github.com/jakobr0cky/express-server-chess

## Features:

### Single Player Mode:
- **Challenge Stockfish:** Test your skills against the powerful Stockfish chess engine.
- **Blind Chess Mode:** Enhance your abilities by playing in blind mode, where pieces are invisible, and moves are entered via an input field. The opponent's moves are conveyed through text-to-speech.

### Multiplayer Mode:
- **Play with a Friend:** Invite a friend to play chess with you over the url link.
- **Blind Chess Mode:** Enable blind mode for an extra challenge. In this mode, both players can't see the pieces, making the game more challenging and exciting.

## Technologies Used:
- Angular: Frontend framework for building the website.
- Stockfish: Powerful chess engine for single-player mode.
- Text-to-Speech: Utilized for conveying opponent moves in blind chess mode.
- Socket.io: For Real-time connection in multiplayer mode

## How to Run:
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Run the development server using `ng serve`.
5. Access the website in your browser at `http://localhost:4200`.

## Contribution:
Contributions are welcome! If you have any ideas for improvement or want to report bugs, please feel free to open an issue or submit a pull request.
