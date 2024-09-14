const WAVEFORMS = ["sine", "square", "sawtooth", "triangle"];
const NOTES = {
  A: 440,
  C: 571.23,
};

const sliderValue = document.querySelectorAll(".waveform");

let waveFormVal = "sine";

sliderValue.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e.target.value);
    waveFormVal = e.target.value;
  });
});

document.querySelector("#play").addEventListener("click", () => {
  console.log("you pressed play and selected waveform is " + waveFormVal);
  const actx = new (AudioContext || webkitAudioContext)();
  if (!actx) throw "Not supported!";
  const osc = actx.createOscillator();
  osc.type = waveFormVal;
  osc.frequency.value = 440; // Hz middle A
  osc.connect(actx.destination); // soundcard output
  osc.start();
  osc.stop(actx.currentTime + 2);
});

// -----------------------------------------

// const sliderNote = document.querySelector('input[type="range"]')

// sliderNote.addEventListener('input', (e) => {
//   const val = e.target.value;
//   osc.frequency.value = val * 400;
// })

// -----------------------------------------

// const unisonWidth = 10;

// const oscBank = new Array(3);

// const createOscillators = (freq, detune) => {
//   const osc = actx.createOscillator();
//   osc.type = "sawtooth";
//   osc.frequency.value = freq;
//   osc.detune.value = detune;
//   osc.connect(actx.destination);
//   osc.start();
//   return osc;
// };

// const noteOn = (note) => {
//   const freq = NOTES[note];
//   oscBank[0] = createOscillator(freq, 0);
//   oscBank[1] = createOscillator(freq, -unisonWidth);
//   oscBank[2] = createOscillator(freq, unisonWidth);
// };

//  ----------------------------

// AudioParam.value = value;
// AudioParam.setValueAtTime();
// AudioParam.linearRampToValueAtTime();
// AudioParam.exponentialRampToValueAtTime();
// AudioParam.setTargetAtTime();
// AudioParam.setValueCurveAtTime();
// AudioParam.cancelScheduledValues();

//  -----------------------------

// const ADSR = { attack: 0.2, decay: 0, sustain: 1, release: 0.3 };

// const STAGE_MAX_TIME = 2; // seconds

// const noteOn = (freq) => {
//   gainNode.gain.cancelScheduledValues();

//   const osc = createOscillator(freq); //etc
//   osc.connect(gainNode);

//   // ATTACK -> DECAY -> SUSTAIN
//   const now = actx.currentTime;
//   const atkDuration = ADSR.attack * STAGE_MAX_TIME;
//   const atkEndTime = now + atkDuration;
//   const decayDuration = ADSR.decay * STAGE_MAX_TIME;

//   gainNode.gain.setValueAtTime(0, actx.currentTime);
//   gainNode.gain.linearRampToValueAtTime(1, atkEndTime);
//   gainNode.gain.setTargetAtTime(ADSR.sustain, atkEndTime, decayDuration);
// };

// const noteOff = () => {
//   gainNode.gain.cancelScheduledValues();

//   // SUSTAIN -> RELEASE
//   const now = actx.currentTime;
//   const relDuration = ASDR.release * STAGE_MAX_TIME;
//   const relEndTime = now + relDuration;
//   gainNode.gain.setValueAtTime(gainNode.gain.value, now);
//   asdrNode.gain.linearRampToValueAtTime(0, relEndTime);
// }

//  --------------------------

// const maxFilterFreq = actx.sampleRate / 2;

// const filter =  actx.createBiquadFilter();
// filter.type = 'lowpass';
// filter.frequency.value = frequencySlider * maxFilterFreq;
// filter.Q.value = qSlider * 30;

// oscillator.connect(filter);
// filter.connect(actx.destination);

//  ------ ECHO -------------
// ------ time / feedback ---------

// const echo = {
//   time: 0.2,
//   feedback: 0.2,
//   maxDuration: 2 // sexonds
// }

// const oscillator = createOscillator(); // etc.
// oscillator.connect(actx.destination);

// const delayNode = actx.createDelay();
// delayNode.delayTime.value = echo.time * maxDuration;
// delayNode.connect(actx.destination);

// const gainNode = actx.createGain();
// gainNode.gain.value = echo.feedback;

// oscillator.connect(delayNode);
// delayNode.connect(gainNode);
// gainNode.connect(delayNode);
