# Simon-says
A browser-based Simon memory game built with vanilla HTML, CSS, and JavaScript. Features difficulty levels, sound effects, animations, and a local high score leaderboard , no frameworks or dependencies required.
🎮 Simon Game
A modern, arcade-styled take on the classic Simon memory sequence game — built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies.

build with -html,css,js

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/ee8c96f1-dd1b-4faf-a0aa-11a23134c79e" />

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/57055734-c577-4291-8a23-97571d3c8ebe" />

🕹️ How to Play
Open simon.html in any modern browser
Press any key (or click the board) to start
Watch the sequence of colored button flashes
Repeat the sequence by clicking the buttons in the same order
Each round adds one more step — see how far you can go!
✨ Features
🎵 Sound Effects
Each button plays a unique musical tone via the Web Audio API
Wrong answer triggers a buzzer sound
Level milestone (every 5 levels) plays a 3-note chime
🎨 Animations
Buttons glow with a colored halo on press
Board shakes on game over
Gold pulse ring expands on each new level
Level number pops up on screen every round
⚡ Difficulty Levels
Mode	Flash Duration	Gap Between Presses
Easy	500ms	300ms
Medium	350ms	200ms
Hard	200ms	120ms
Difficulty locks during gameplay and resets after game over.

🏆 High Score Leaderboard
Top 7 scores saved locally via localStorage
Each entry shows date, difficulty badge, and score
"NEW HIGH SCORE!" flash animation on beating #1
Clear scores anytime with the CLEAR button
📊 Progress Tracker
Dot indicators below the board show your position in the current sequence in real time
📁 Project Structure
simon-game/
│
├── simon.html     # Main game file (self-contained)
├── style.css      # Stylesheet
├── game.js        # Game logic
└── README.md      # You're reading this
🚀 Getting Started
No install or build step needed.

# Clone the repo
Open your folder in command prompt and paste this url
git clone https://github.com/afthabBaadshah/SimonSays_Game.git
---

## 🛠️ Built With

- **HTML5** — structure
- **CSS3** — animations, transitions, custom properties
- **Vanilla JavaScript** — game logic, Web Audio API, localStorage
- **Google Fonts** — Orbitron, Share Tech Mono

