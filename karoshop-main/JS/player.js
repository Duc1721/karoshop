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

let currentIndex = -1;
let isRepeat = false;
let isShuffle = false;
let shuffleQueue = [];

export function setupPlayerControls() {
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("play", updateUI);
  audio.addEventListener("pause", updateUI);
  audio.addEventListener("ended", onEnded);
  progressBar.addEventListener("input", seek);

  playPauseBtn.onclick = togglePlayPause;
  document.getElementById("rewindBtn")?.addEventListener("click", rewind10s);
  document.getElementById("forwardBtn")?.addEventListener("click", forward10s);
  document.getElementById("nextBtn")?.addEventListener("click", playNext);
  document.getElementById("prevBtn")?.addEventListener("click", playPrev);
  repeatBtn.onclick = toggleRepeat;
  shuffleBtn.onclick = toggleShuffle;
  favoriteBtn.onclick = toggleFavorite;
}

function togglePlayPause() {
  if (!audio.src) return;
  audio.paused ? audio.play() : audio.pause();
}

function updateUI() {
  playPauseBtn.textContent = audio.paused ? "▶️" : "⏸";
  visualizer.style.display = audio.paused ? "none" : "flex";
  coverArt.classList.toggle("rotating", !audio.paused);
  coverArt.classList.toggle("rotating-pause", audio.paused);
}

function updateProgress() {
  const currentTimeDisplay = document.getElementById("currentTime");
  const totalTimeDisplay = document.getElementById("totalTime");
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  totalTimeDisplay.textContent = formatTime(audio.duration || 0);
}

function seek() {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("text-orange-500", isRepeat);
  repeatBtn.title = isRepeat ? "Lặp lại: Bật" : "Lặp lại: Tắt";
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("text-orange-500", isShuffle);
  shuffleBtn.title = isShuffle ? "Trộn: Bật" : "Trộn: Tắt";
  if (isShuffle) {
    prepareShuffleQueue();
  } else {
    shuffleQueue = [];
  }
}

function prepareShuffleQueue() {
  const songs = getCurrentSongList();
  const total = songs.length;
  if (total <= 1) {
    shuffleQueue = [];
    return;
  }
  const indices = [...Array(total).keys()].filter(i => i !== currentIndex);
  shuffleQueue = shuffleArray(indices);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function onEnded() {
  isRepeat ? audio.play() : playNext();
}

function forward10s() {
  if (audio) audio.currentTime += 10;
}

function rewind10s() {
  if (audio) audio.currentTime -= 10;
}

export function playNext() {
  const songs = getCurrentSongList();
  if (!songs || songs.length === 0) return;

  if (isShuffle) {
    if (shuffleQueue.length === 0) prepareShuffleQueue();
    currentIndex = shuffleQueue.shift();
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
  }

  selectSong(currentIndex);
}

export function playPrev() {
  const songs = getCurrentSongList();
  if (!songs || songs.length === 0) return;

  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  selectSong(currentIndex);
}

export function selectSong(index) {
  const songs = getCurrentSongList();
  if (!songs[index]) return;

  currentIndex = index;
  const song = songs[index];

  audio.src = song.src;
  document.getElementById("songTitle").textContent = song.title;
  document.getElementById("songArtist").textContent = song.artist;
  document.getElementById("songNow").textContent = `${song.title} - ${song.artist}`;
  document.getElementById("lyrics").textContent = song.lyrics || "Chưa có lời bài hát.";
  document.getElementById("songAlbum").textContent = song.album || "---";
  coverArt.src = song.cover || "../IMG/6.jpg";

  updateFavoriteIcon();
  setTimeout(() => audio.play(), 50);
}

function toggleFavorite() {
  const songs = window.songs;
  if (currentIndex === -1 || !songs[currentIndex]) return;

  toggleFavoriteStatus(songs[currentIndex]);
  updateFavoriteIcon();
  saveSongs(songs);
  renderPlaylist();
}

function updateFavoriteIcon() {
  const songs = window.songs;
  if (currentIndex === -1 || !songs[currentIndex]) return;
  favoriteBtn.textContent = isFavorite(songs[currentIndex]) ? "❤️" : "🤍";
}

function getCurrentSongList() {
  return window.currentAlbumFilter
    ? window.songs.filter(s => s.album === window.currentAlbumFilter)
    : window.songs;
}

// Xuất ra toàn cục
window.playNext = playNext;
window.playPrev = playPrev;
window.forward10s = forward10s;
window.rewind10s = rewind10s;
window.toggleShuffle = toggleShuffle;
window.toggleRepeat = toggleRepeat;
window.togglePlayPause = togglePlayPause;
