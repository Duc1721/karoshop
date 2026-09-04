import { formatTime } from "./utils.js";
import { isFavorite, toggleFavoriteStatus, saveSongs } from "./storage.js";
import { renderPlaylist } from "./playlist.js";

let audio = document.getElementById("audioPlayer");
let progressBar = document.getElementById("progressBar");
let playPauseBtn = document.getElementById("playPauseBtn");
let repeatBtn = document.getElementById("repeatBtn");
let shuffleBtn = document.getElementById("shuffleBtn");
let favoriteBtn = document.getElementById("favoriteBtn");
let coverArt = document.getElementById("coverArt");
let visualizer = document.getElementById("visualizer");

// =========================
// ÂM LƯỢNG
// =========================
let volumeBar = document.getElementById("volumeBar");
let volumeValue = document.getElementById("volumeValue");
let muteBtn = document.getElementById("muteBtn");

let lastVolume = 1;

// =========================
// PLAYER STATE
// =========================
let currentIndex = -1;
let isRepeat = false;
let isShuffle = false;
let shuffleQueue = [];

// =========================
// SETUP PLAYER
// =========================
export function setupPlayerControls() {
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("play", updateUI);
  audio.addEventListener("pause", updateUI);
  audio.addEventListener("ended", onEnded);

  progressBar.addEventListener("input", seek);

  playPauseBtn.onclick = togglePlayPause;

  document
    .getElementById("rewindBtn")
    ?.addEventListener("click", rewind10s);

  document
    .getElementById("forwardBtn")
    ?.addEventListener("click", forward10s);

  document
    .getElementById("nextBtn")
    ?.addEventListener("click", playNext);

  document
    .getElementById("prevBtn")
    ?.addEventListener("click", playPrev);

  repeatBtn.onclick = toggleRepeat;
  shuffleBtn.onclick = toggleShuffle;
  favoriteBtn.onclick = toggleFavorite;

  // Khởi tạo âm lượng
  setupVolumeControls();
}

// =========================
// ĐIỀU KHIỂN ÂM LƯỢNG
// =========================
function setupVolumeControls() {
  if (!volumeBar) return;

  // Âm lượng mặc định 100%
  audio.volume = Number(volumeBar.value || 1);

  updateVolumeUI();

  // Kéo thanh âm lượng
  volumeBar.addEventListener("input", () => {
    audio.volume = Number(volumeBar.value);

    if (audio.volume > 0) {
      lastVolume = audio.volume;
    }

    updateVolumeUI();
  });
}

// Cập nhật giao diện âm lượng
function updateVolumeUI() {
  if (!volumeBar || !volumeValue || !muteBtn) return;

  volumeBar.value = audio.volume;

  volumeValue.textContent =
    Math.round(audio.volume * 100) + "%";

  muteBtn.textContent =
    audio.volume === 0 ? "🔇" : "🔊";
}

// Tăng âm lượng 10%
function increaseVolume() {
  audio.volume = Math.min(
    1,
    audio.volume + 0.1
  );

  if (audio.volume > 0) {
    lastVolume = audio.volume;
  }

  updateVolumeUI();
}

// Giảm âm lượng 10%
function decreaseVolume() {
  audio.volume = Math.max(
    0,
    audio.volume - 0.1
  );

  if (audio.volume > 0) {
    lastVolume = audio.volume;
  }

  updateVolumeUI();
}

// Tắt / bật tiếng
function toggleMute() {
  if (audio.volume > 0) {
    lastVolume = audio.volume;
    audio.volume = 0;
  } else {
    audio.volume = lastVolume || 1;
  }

  updateVolumeUI();
}

// =========================
// PLAY / PAUSE
// =========================
function togglePlayPause() {
  if (!audio.src) return;

  audio.paused
    ? audio.play()
    : audio.pause();
}

// =========================
// UPDATE UI
// =========================
function updateUI() {
  playPauseBtn.textContent =
    audio.paused ? "▶️" : "⏸";

  visualizer.style.display =
    audio.paused ? "none" : "flex";

  coverArt.classList.toggle(
    "rotating",
    !audio.paused
  );

  coverArt.classList.toggle(
    "rotating-pause",
    audio.paused
  );
}

// =========================
// PROGRESS
// =========================
function updateProgress() {
  const currentTimeDisplay =
    document.getElementById("currentTime");

  const totalTimeDisplay =
    document.getElementById("totalTime");

  progressBar.value =
    (audio.currentTime / audio.duration) * 100 || 0;

  currentTimeDisplay.textContent =
    formatTime(audio.currentTime);

  totalTimeDisplay.textContent =
    formatTime(audio.duration || 0);
}

// =========================
// SEEK
// =========================
function seek() {
  audio.currentTime =
    (progressBar.value / 100) * audio.duration;
}

// =========================
// REPEAT
// =========================
let repeatMode = 0;
// 0 = Tắt
// 1 = Lặp tất cả
// 2 = Lặp 1 bài

function toggleRepeat() {
  repeatMode = (repeatMode + 1) % 3;

  repeatBtn.innerHTML = "↻";

  // Xóa số 1 cũ
  const oldOne = repeatBtn.querySelector(".repeat-one");
  if (oldOne) oldOne.remove();

  if (repeatMode === 0) {
    repeatBtn.classList.remove("text-orange-500");
    repeatBtn.title = "Lặp lại: Tắt";
  }

  if (repeatMode === 1) {
    repeatBtn.classList.add("text-orange-500");
    repeatBtn.title = "Lặp lại: Bật";
  }

  if (repeatMode === 2) {
    repeatBtn.classList.add("text-orange-500");
    repeatBtn.title = "Lặp 1 bài";

    const one = document.createElement("span");
    one.className = "repeat-one";
    one.textContent = "1";

    repeatBtn.appendChild(one);
  }
}
// =========================
// SHUFFLE
// =========================
function toggleShuffle() {
  isShuffle = !isShuffle;

  shuffleBtn.textContent = "⇄";
  shuffleBtn.classList.toggle("text-orange-500", isShuffle);

  shuffleBtn.title = isShuffle
    ? "Ngẫu nhiên: Bật"
    : "Ngẫu nhiên: Tắt";
}

function prepareShuffleQueue() {
  const songs = getCurrentSongList();

  const total = songs.length;

  if (total <= 1) {
    shuffleQueue = [];
    return;
  }

  const indices =
    [...Array(total).keys()]
      .filter(i => i !== currentIndex);

  shuffleQueue =
    shuffleArray(indices);
}

function shuffleArray(array) {
  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [array[i], array[j]] =
      [array[j], array[i]];
  }

  return array;
}

// =========================
// KHI BÀI HÁT KẾT THÚC
// =========================
function onEnded() {
  isRepeat
    ? audio.play()
    : playNext();
}

// =========================
// TUA NHẠC
// =========================
function forward10s() {
  if (audio) {
    audio.currentTime += 10;
  }
}

function rewind10s() {
  if (audio) {
    audio.currentTime -= 10;
  }
}

// =========================
// NEXT
// =========================
export function playNext() {
  const songs =
    getCurrentSongList();

  if (!songs || songs.length === 0)
    return;

  if (isShuffle) {
    if (shuffleQueue.length === 0) {
      prepareShuffleQueue();
    }

    currentIndex =
      shuffleQueue.shift();
  } else {
    currentIndex =
      (currentIndex + 1) %
      songs.length;
  }

  selectSong(currentIndex);
}

// =========================
// PREVIOUS
// =========================
export function playPrev() {
  const songs =
    getCurrentSongList();

  if (!songs || songs.length === 0)
    return;

  currentIndex =
    (currentIndex - 1 + songs.length) %
    songs.length;

  selectSong(currentIndex);
}

// =========================
// CHỌN BÀI HÁT
// =========================
export function selectSong(index) {
  const songs =
    getCurrentSongList();

  if (!songs[index]) return;

  currentIndex = index;

  const song =
    songs[index];

  audio.src = song.src;

  document.getElementById(
    "songTitle"
  ).textContent = song.title;

  document.getElementById(
    "songArtist"
  ).textContent = song.artist;

  document.getElementById(
    "songNow"
  ).textContent =
    `${song.title} - ${song.artist}`;

  document.getElementById(
    "lyrics"
  ).textContent =
    song.lyrics ||
    "Chưa có lời bài hát.";

  document.getElementById(
    "songAlbum"
  ).textContent =
    song.album || "---";

  coverArt.src =
    song.cover ||
    "../IMG/6.jpg";

  updateFavoriteIcon();

  setTimeout(() => {
    audio.play();
  }, 50);
}

// =========================
// YÊU THÍCH
// =========================
function toggleFavorite() {
  const songs =
    window.songs;

  if (
    currentIndex === -1 ||
    !songs[currentIndex]
  ) return;

  toggleFavoriteStatus(
    songs[currentIndex]
  );

  updateFavoriteIcon();

  saveSongs(songs);

  renderPlaylist();
}

function updateFavoriteIcon() {
  const songs =
    window.songs;

  if (
    currentIndex === -1 ||
    !songs[currentIndex]
  ) return;

  favoriteBtn.textContent =
    isFavorite(
      songs[currentIndex]
    )
      ? "❤️"
      : "🤍";
}

// =========================
// LẤY DANH SÁCH BÀI HÁT
// =========================
function getCurrentSongList() {
  return window.currentAlbumFilter
    ? window.songs.filter(
        s =>
          s.album ===
          window.currentAlbumFilter
      )
    : window.songs;
}

// =========================
// ĐƯA HÀM RA TOÀN CỤC
// =========================
window.playNext = playNext;
window.playPrev = playPrev;

window.forward10s =
  forward10s;

window.rewind10s =
  rewind10s;

window.toggleShuffle =
  toggleShuffle;

window.toggleRepeat =
  toggleRepeat;

window.togglePlayPause =
  togglePlayPause;

// Âm lượng
window.increaseVolume =
  increaseVolume;

window.decreaseVolume =
  decreaseVolume;

window.toggleMute =
  toggleMute;