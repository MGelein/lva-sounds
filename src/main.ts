import "./style.css";

const sounds = ["buzzer.wav", "deurbel A.wav", "deurbel B.wav", "telefoon.mp3"];
const app = document.querySelector("#app");
const audios: HTMLAudioElement[] = [];

const init = () => {
  sounds.forEach(createSoundButton);
};

const createSoundButton = (soundUrl: string) => {
  if (!app) return;
  const audio = document.createElement("audio");
  audio.appendChild(createSource(soundUrl));
  audio.id = crypto.randomUUID().replace(/-/gi, "");
  audios.push(audio);

  app.appendChild(audio);

  const button = document.createElement("button");
  button.innerHTML = urlToLabel(soundUrl);
  button.classList.toggle("disabled", true);
  button.addEventListener("click", () => playSound(audio.id, button));
  app.appendChild(button);

  audio.addEventListener("canplay", () => {
    button.classList.toggle("disabled", false);
    button.setAttribute("style", `--duration: ${audio.duration}s`);
  });
};

const playSound = (audioId: string, button: HTMLButtonElement) => {
  const audio = audios.find((audio) => audio.id === audioId);
  if (!audio) return;
  console.log(button);

  if (audio.paused) {
    audio.currentTime = 0;
    audio.play();
    audio.addEventListener("ended", () => {
      button.classList.toggle("playing", false);
    });
    button.classList.toggle("playing", true);
  } else {
    audio.pause();
    button.classList.toggle("playing", false);
  }
};

const urlToLabel = (soundUrl: string) => {
  return soundUrl.substring(0, soundUrl.lastIndexOf("."));
};

const createSource = (soundUrl: string) => {
  const source = document.createElement("source");
  source.src = `./sounds/${soundUrl}`;
  source.type = urlToAudioType(soundUrl);
  return source;
};

const urlToAudioType = (soundUrl: string) => {
  if (soundUrl.includes(".wav")) return "audio/wav";
  if (soundUrl.includes(".ogg")) return "audio/ogg";
  return "audio/mpeg";
};

document.addEventListener("DOMContentLoaded", init);
