const WAVEFORMS = ["sine", "square", "sawtooth", "triangle"];
const NOTES = {
  C: 261.63,
  CSharp: 277.18,
  D: 293.66,
  DSharp: 311.13,
  E: 329.63,
  F: 349.23,
  FSharp: 369.99,
  G: 392.00,
  GSharp: 415.30,
  A: 440.00,
  ASharp: 466.16,
  B: 493.88,
};

const AudioContext = window.AudioContext || window.webkitAudioContext;
if (!AudioContext) {
  alert("Your browser does not support the Web Audio API.");
}

const sliderValue = document.querySelectorAll(".waveform");

let waveFormVal = "sine";

sliderValue.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    waveFormVal = e.target.value;
  });
});

document.querySelector("#play").addEventListener("click", () => {
  const actx = new AudioContext();
  if (!actx) throw "Not supported!";
  const osc = actx.createOscillator();
  osc.type = waveFormVal;
  osc.frequency.value = 440; // Hz middle A
  osc.connect(actx.destination); // soundcard output
  osc.start();
  osc.stop(actx.currentTime + 2);
});

const sliderNote = document.querySelector('#oscillator');

sliderNote.addEventListener('input', (e) => {
  const val = e.target.value;
  console.log(`Oscillator frequency multiplier: ${val}`);
  // Update oscillator frequency dynamically
  const actx = new AudioContext();
  const osc = actx.createOscillator();
  osc.type = waveFormVal;
  osc.frequency.value = NOTES.A * val; // Adjust frequency
  osc.connect(actx.destination);
  osc.start();
  osc.stop(actx.currentTime + 2);
});

document.querySelectorAll(".note").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const note = e.target.dataset.note;
    updateStatus(note);
    playNoteWithADSR(NOTES[note]);
  });
});

const KEY_NOTE_MAP = {
  a: "C",
  s: "CSharp",
  d: "D",
  f: "DSharp",
  g: "E",
  h: "F",
  j: "FSharp",
  k: "G",
  l: "GSharp",
  ñ: "A",
  "{": "ASharp",
  "}": "B",
};

// Listen for keydown events to play notes
document.addEventListener("keydown", (e) => {
  const note = KEY_NOTE_MAP[e.key.toLowerCase()];
  if (note) {
    updateStatus(note);
    playNoteWithADSR(NOTES[note]);

    // Highlight the corresponding button
    const button = document.querySelector(`.note[data-note="${note}"]`);
    if (button) {
      button.classList.add("active");
      setTimeout(() => button.classList.remove("active"), 200); // Remove highlight after 200ms
    }
  }
});

function playNote(frequency) {
  const actx = new AudioContext();
  const osc = actx.createOscillator();
  osc.type = waveFormVal;
  osc.frequency.value = frequency;
  osc.connect(actx.destination);
  osc.start();
  osc.stop(actx.currentTime + 1); // Play for 1 second
}

function playNoteWithADSR(frequency) {
  const actx = new AudioContext();
  const osc = actx.createOscillator();
  const gainNode = actx.createGain();

  const attack = parseFloat(document.querySelector("#attack").value);
  const decay = parseFloat(document.querySelector("#decay").value);
  const sustain = parseFloat(document.querySelector("#sustain").value);
  const release = parseFloat(document.querySelector("#release").value);

  osc.type = waveFormVal;
  osc.frequency.value = frequency;
  osc.connect(gainNode);
  gainNode.connect(actx.destination);

  const now = actx.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(1, now + attack); // Attack
  gainNode.gain.linearRampToValueAtTime(sustain, now + attack + decay); // Decay
  gainNode.gain.setValueAtTime(sustain, now + attack + decay + 0.5); // Sustain
  gainNode.gain.linearRampToValueAtTime(0, now + attack + decay + 0.5 + release); // Release

  osc.start();
  osc.stop(now + attack + decay + 0.5 + release);
}

function updateStatus(note) {
  document.querySelector("#status").textContent = `Current Note: ${note} | Waveform: ${waveFormVal}`;
}
