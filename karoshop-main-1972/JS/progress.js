// progress.js
export function setupProgress(audio) {
  const progressBar = document.getElementById("progressBar");
  const currentTimeDisplay = document.getElementById("currentTime");
  const totalTimeDisplay = document.getElementById("totalTime");

  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress || 0;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    totalTimeDisplay.textContent = formatTime(audio.duration || 0);
  });

  progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  });
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
