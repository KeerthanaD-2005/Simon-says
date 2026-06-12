# Simon-says
A browser-based Simon memory game built with vanilla HTML, CSS, and JavaScript. Features difficulty levels, sound effects, animations, and a local high score leaderboard , no frameworks or dependencies required.
🎮 Simon Game
A modern, arcade-styled take on the classic Simon memory sequence game — built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies.

build with -html,css,js

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/ee8c96f1-dd1b-4faf-a0aa-11a23134c79e" />

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/57055734-c577-4291-8a23-97571d3c8ebe" />

# 🎮 Simon Says Game

An interactive browser-based Simon Says memory game built using HTML, CSS, and JavaScript. Test your memory skills by repeating increasingly longer sequences of colors and sounds. The game features multiple difficulty levels, sound effects, animations, a local leaderboard, and real-time progress tracking.

---

## 🕹️ How to Play

1. Open `simon.html` in any modern web browser.
2. Press any key (or click the game board) to start.
3. Watch the sequence of colored button flashes.
4. Repeat the sequence by clicking the buttons in the same order.
5. Each round adds one more step to the sequence.
6. Keep going and see how far you can reach!

---

## ✨ Features

### 🎵 Sound Effects

* Unique musical tone for each button using the Web Audio API.
* Buzzer sound on incorrect input.
* Special 3-note chime every 5 levels.

### 🎨 Animations

* Colored glow effect on button press.
* Board shake animation on game over.
* Expanding golden pulse ring for each new level.
* Animated level indicator for every round.

### ⚡ Difficulty Levels

| Difficulty | Flash Duration | Gap Between Presses |
| ---------- | -------------- | ------------------- |
| Easy       | 500ms          | 300ms               |
| Medium     | 350ms          | 200ms               |
| Hard       | 200ms          | 120ms               |

> Difficulty selection is locked during gameplay and resets after game over.

### 🏆 High Score Leaderboard

* Top 7 scores stored using Local Storage.
* Displays score, date, and difficulty level.
* "NEW HIGH SCORE!" animation when beating the top score.
* Option to clear all saved scores.

### 📊 Progress Tracker

* Real-time progress indicators below the game board.
* Helps track your position in the current sequence.

---

## 📁 Project Structure

```text
simon-game/
│
├── simon.html     # Main game file
├── style.css      # Styling and animations
├── game.js        # Game logic
└── README.md      # Project documentation
```

---

## 🚀 Getting Started

No installation or build process is required.

### Clone the Repository

Open your project folder in Command Prompt and run:

```bash
git clone https://github.com/KeerthanaD/SimonSays_Game.git
```

Then open `simon.html` in your browser and start playing.

---

## 🛠️ Built With

* HTML5 — Structure and layout
* CSS3 — Styling, animations, and transitions
* Vanilla JavaScript — Game logic and interactivity
* Web Audio API — Sound effects
* Local Storage API — High score persistence
* Google Fonts — Orbitron, Share Tech Mono

---

## 🎯 Objective

Challenge your memory by following the sequence correctly for as many levels as possible. Every new level increases the sequence length, making the game progressively more difficult.

Good luck and have fun! 🎉
* — Orbitron, Share Tech Mono

