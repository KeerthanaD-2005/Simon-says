const DIFFICULTIES = {
    easy: { flashDur: 500, pauseDur: 300, playbackSpeed: 1 },
    medium: { flashDur: 350, pauseDur: 200, playbackSpeed: 1 },
    hard: { flashDur: 200, pauseDur: 120, playbackSpeed: 1 },
};

const NOTES = {
    red: [261.63, 0.18],
    green: [329.63, 0.18],
    yellow: [392.00, 0.18],
    blue: [523.25, 0.18],
    wrong: [110.00, 0.5],
};

let audioCtx = null;
function getAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

function playTone(freq, dur, type = 'square', vol = 0.15) {
    try {
        const ctx = getAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.start(); osc.stop(ctx.currentTime + dur);
    } catch (e) { }
}

function playColor(color) {
    const [freq, dur] = NOTES[color];
    playTone(freq, dur);
}

function playWrong() {
    playTone(NOTES.wrong[0], NOTES.wrong[1], 'sawtooth', 0.1);
}

function playLevelUp() {
    [523.25, 659.25, 783.99].forEach((f, i) => {
        setTimeout(() => playTone(f, 0.15, 'square', 0.12), i * 100);
    });
}

// Game state
let buttonColors = ['red', 'green', 'yellow', 'blue'];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;
let score = 0;
let playing = false;
let currentDiff = 'easy';
let newEntryIndex = -1;

const board = document.getElementById('board');
const statusEl = document.getElementById('status');
const levelEl = document.getElementById('level-display');
const scoreEl = document.getElementById('score-display');
const bestEl = document.getElementById('best-display');
const progressEl = document.getElementById('progress-row');
const overlay = document.getElementById('start-overlay');
const comboFlash = document.getElementById('combo-flash');

// Difficulty buttons
document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (started) return;
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDiff = btn.dataset.diff;
    });
});

// Leaderboard
function getScores() {
    try { return JSON.parse(localStorage.getItem('simon_scores') || '[]'); } catch { return []; }
}
function saveScore(s, diff) {
    const scores = getScores();
    scores.push({ score: s, diff, date: new Date().toLocaleDateString() });
    scores.sort((a, b) => b.score - a.score);
    const top = scores.slice(0, 7);
    localStorage.setItem('simon_scores', JSON.stringify(top));
    return top.findIndex(e => e.score === s && e.diff === diff);
}
function renderLeaderboard(highlightIdx = -1) {
    const scores = getScores();
    const list = document.getElementById('lb-list');
    list.innerHTML = '';
    if (!scores.length) {
        list.innerHTML = '<li class="lb-empty">No scores yet — play a game!</li>';
        return;
    }
    scores.forEach((entry, i) => {
        const li = document.createElement('li');
        li.className = 'lb-item' + (i === highlightIdx ? ' new-entry' : '');
        li.innerHTML = `
    <span class="lb-rank ${i < 3 ? 'top' : ''}">#${i + 1}</span>
    <span>${entry.date}</span>
    <span class="lb-diff-badge ${entry.diff}">${entry.diff.toUpperCase()}</span>
    <span class="lb-score">${entry.score}</span>`;
        list.appendChild(li);
    });

    const best = scores[0]?.score ?? 0;
    bestEl.textContent = best;
}
renderLeaderboard();

document.getElementById('lb-clear-btn').addEventListener('click', () => {
    localStorage.removeItem('simon_scores');
    renderLeaderboard();
    bestEl.textContent = '0';
});

function updateBest() {
    const scores = getScores();
    bestEl.textContent = scores[0]?.score ?? 0;
}
updateBest();

// Progress dots
function renderProgress() {
    progressEl.innerHTML = '';
    const len = gamePattern.length;
    const userLen = userPattern.length;
    for (let i = 0; i < len; i++) {
        const d = document.createElement('div');
        d.className = 'progress-dot';
        if (i < userLen) d.classList.add('done');
        else if (i === userLen) d.classList.add('current');
        progressEl.appendChild(d);
    }
}

// Animation
function flashButton(color) {
    return new Promise(resolve => {
        const btn = document.getElementById('btn-' + color);
        btn.classList.add('pressed');
        playColor(color);
        const { flashDur } = DIFFICULTIES[currentDiff];
        setTimeout(() => {
            btn.classList.remove('pressed');
            setTimeout(resolve, DIFFICULTIES[currentDiff].pauseDur);
        }, flashDur);
    });
}

function animatePress(color) {
    const btn = document.getElementById('btn-' + color);
    btn.classList.add('pressed');
    playColor(color);
    setTimeout(() => btn.classList.remove('pressed'), 180);
}

// Sequence playback
async function playSequence() {
    playing = true;
    statusEl.textContent = 'WATCH...';
    await sleep(400);
    for (const color of gamePattern) {
        await flashButton(color);
    }
    statusEl.textContent = 'YOUR TURN';
    playing = false;
    renderProgress();
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Combo popup
function showCombo(text) {
    comboFlash.textContent = text;
    comboFlash.classList.remove('show');
    void comboFlash.offsetWidth;
    comboFlash.classList.add('show');
}

function addPulseRing() {
    const ring = document.createElement('div');
    ring.className = 'pulse-ring';
    board.appendChild(ring);
    setTimeout(() => ring.remove(), 600);
}

// Next level
async function nextSequence() {
    userPattern = [];
    level++;
    score = level - 1;
    levelEl.textContent = level;
    scoreEl.textContent = score;

    const rand = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(rand);

    if (level > 1) addPulseRing();
    showCombo('LEVEL ' + level);
    if (level % 5 === 0) { playLevelUp(); await sleep(500); }

    await playSequence();
}

// Check answer
function checkAnswer(idx) {
    if (gamePattern[idx] !== userPattern[idx]) {
        playWrong();
        board.classList.add('shake');
        setTimeout(() => board.classList.remove('shake'), 450);
        statusEl.textContent = 'GAME OVER! PRESS ANY KEY';
        levelEl.textContent = '—';
        scoreEl.textContent = '—';

        const hi = saveScore(score, currentDiff);
        renderLeaderboard(hi);
        updateBest();
        if (hi === 0) showCombo('NEW HIGH SCORE!');

        startOver();
        return;
    }
    renderProgress();
    if (userPattern.length === gamePattern.length) {
        playing = true;
        setTimeout(() => { playing = false; nextSequence(); }, 900);
    }
}

function startOver() {
    level = 0; score = 0;
    gamePattern = []; userPattern = [];
    started = false; playing = false;
    progressEl.innerHTML = '';
    overlay.classList.remove('hidden');
}

// Button clicks
['red', 'green', 'yellow', 'blue'].forEach(color => {
    document.getElementById('btn-' + color).addEventListener('click', () => {
        if (!started || playing) return;
        animatePress(color);
        userPattern.push(color);
        checkAnswer(userPattern.length - 1);
    });
});

// Start
function startGame() {
    if (started) return;
    started = true;
    overlay.classList.add('hidden');
    level = 0; score = 0;
    gamePattern = []; userPattern = [];
    progressEl.innerHTML = '';
    levelEl.textContent = '1';
    scoreEl.textContent = '0';
    nextSequence();
}

document.addEventListener('keypress', () => { if (!started) startGame(); });
overlay.addEventListener('click', startGame);
