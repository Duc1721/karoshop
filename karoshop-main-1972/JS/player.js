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

let volumeBar = document.getElementById("volumeBar");
let volumeValue = document.getElementById("volumeValue");
let muteBtn = document.getElementById("muteBtn");

let lastVolume = 1;

let currentIndex = -1;

// 0 = Tắt
// 1 = Lặp 1 bài
// 2 = Lặp toàn bộ
let repeatMode = 0;

let isShuffle = false;
let shuffleQueue = [];

// =========================
// SETUP PLAYER
// =========================
export function setupPlayerControls() {
if (!audio) return;

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("play", updateUI);
audio.addEventListener("pause", updateUI);
audio.addEventListener("ended", onEnded);

audio.addEventListener("error", () => {
console.error("Audio error:", audio.error);
updateUI();
});

if (progressBar) {
progressBar.addEventListener("input", seek);
}

if (playPauseBtn) {
playPauseBtn.onclick = togglePlayPause;
}

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

if (repeatBtn) {
repeatBtn.onclick = toggleRepeat;
}

if (shuffleBtn) {
shuffleBtn.onclick = toggleShuffle;
}

if (favoriteBtn) {
favoriteBtn.onclick = toggleFavorite;
}

setupVolumeControls();

updateRepeatButton();
updateShuffleButton();
}

// =========================
// ÂM LƯỢNG
// =========================
function setupVolumeControls() {
if (!volumeBar) return;

audio.volume = Number(volumeBar.value || 1);

updateVolumeUI();

volumeBar.addEventListener("input", () => {
audio.volume = Number(volumeBar.value);

```
if (audio.volume > 0) {
  lastVolume = audio.volume;
}

updateVolumeUI();
```

});
}

function updateVolumeUI() {
if (!volumeBar || !volumeValue || !muteBtn) return;

volumeBar.value = audio.volume;

volumeValue.textContent =
Math.round(audio.volume * 100) + "%";

muteBtn.textContent =
audio.volume === 0 ? "🔇" : "🔊";
}

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
async function togglePlayPause() {
if (!audio) return;

if (!audio.src && !audio.currentSrc) {
console.warn("Chưa có bài hát để phát.");
return;
}

if (!audio.paused) {
audio.pause();
return;
}

try {
await audio.play();
} catch (error) {
console.error(
"Không thể phát bài hát:",
error
);
}
}

// =========================
// UPDATE UI
// =========================
function updateUI() {
if (playPauseBtn) {
playPauseBtn.textContent =
audio.paused ? "▶️" : "⏸";
}

if (visualizer) {
visualizer.style.display =
audio.paused ? "none" : "flex";
}

if (coverArt) {
coverArt.classList.toggle(
"rotating",
!audio.paused
);

```
coverArt.classList.toggle(
  "rotating-pause",
  audio.paused
);
```

}
}

// =========================
// PROGRESS
// =========================
function updateProgress() {
const currentTimeDisplay =
document.getElementById("currentTime");

const totalTimeDisplay =
document.getElementById("totalTime");

if (progressBar) {
progressBar.value =
(audio.currentTime / audio.duration) * 100 || 0;
}

if (currentTimeDisplay) {
currentTimeDisplay.textContent =
formatTime(audio.currentTime);
}

if (totalTimeDisplay) {
totalTimeDisplay.textContent =
formatTime(audio.duration || 0);
}
}

// =========================
// SEEK
// =========================
function seek() {
if (!audio.duration || !progressBar) return;

audio.currentTime =
(progressBar.value / 100) * audio.duration;
}

// =========================
// REPEAT
// =========================
function toggleRepeat() {
repeatMode++;

if (repeatMode > 2) {
repeatMode = 0;
}

updateRepeatButton();
}

function updateRepeatButton() {
if (!repeatBtn) return;

repeatBtn.classList.remove(
"text-orange-500",
"text-green-500"
);

if (repeatMode === 0) {
repeatBtn.textContent = "↻";
repeatBtn.title = "Lặp lại: Tắt";
}

if (repeatMode === 1) {
repeatBtn.textContent = "🔂";
repeatBtn.title = "Lặp lại: Một bài";
repeatBtn.classList.add("text-orange-500");
}

if (repeatMode === 2) {
repeatBtn.textContent = "🔁";
repeatBtn.title = "Lặp lại: Toàn bộ";
repeatBtn.classList.add("text-green-500");
}
}

// =========================
// SHUFFLE
// =========================
function toggleShuffle() {
isShuffle = !isShuffle;

updateShuffleButton();

if (isShuffle) {
prepareShuffleQueue();
} else {
shuffleQueue = [];
}
}

function updateShuffleButton() {
if (!shuffleBtn) return;

shuffleBtn.classList.remove(
"text-purple-500"
);

shuffleBtn.textContent = "🔀";

if (isShuffle) {
shuffleBtn.title = "Hòa trộn: Bật";
shuffleBtn.classList.add("text-purple-500");
} else {
shuffleBtn.title = "Hòa trộn: Tắt";
}
}

// =========================
// TẠO HÀNG ĐỢI HÒA TRỘN
// =========================
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

```
[array[i], array[j]] =
  [array[j], array[i]];
```

}

return array;
}

// =========================
// KHI BÀI HÁT KẾT THÚC
// =========================
async function onEnded() {

// LẶP 1 BÀI
if (repeatMode === 1) {
audio.currentTime = 0;

```
try {
  await audio.play();
} catch (error) {
  console.error(
    "Không thể phát lại bài:",
    error
  );
}

return;
```

}

// LẶP TOÀN BỘ
if (repeatMode === 2) {
playNext();
return;
}

// KHÔNG LẶP
playNext();
}

// =========================
// TUA NHẠC
// =========================
function forward10s() {
if (audio) {
audio.currentTime =
Math.min(
audio.duration || Infinity,
audio.currentTime + 10
);
}
}

function rewind10s() {
if (audio) {
audio.currentTime =
Math.max(
0,
audio.currentTime - 10
);
}
}

// =========================
// NEXT
// =========================
export function playNext() {
const songs =
getCurrentSongList();

if (!songs || songs.length === 0) {
return;
}

if (isShuffle) {

```
if (shuffleQueue.length === 0) {
  prepareShuffleQueue();
}

if (shuffleQueue.length === 0) {
  return;
}

currentIndex =
  shuffleQueue.shift();
```

} else {

```
currentIndex =
  (currentIndex + 1) %
  songs.length;
```

}

selectSong(currentIndex);
}

// =========================
// PREVIOUS
// =========================
export function playPrev() {
const songs =
getCurrentSongList();

if (!songs || songs.length === 0) {
return;
}

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

if (!songs[index]) {
return;
}

const song =
songs[index];

if (!song.src) {
console.error(
"Bài hát không có source:",
song
);
return;
}

currentIndex = index;

const songTitle =
document.getElementById("songTitle");

const songArtist =
document.getElementById("songArtist");

const songNow =
document.getElementById("songNow");

const lyrics =
document.getElementById("lyrics");

const songAlbum =
document.getElementById("songAlbum");

if (songTitle) {
songTitle.textContent =
song.title;
}

if (songArtist) {
songArtist.textContent =
song.artist;
}

if (songNow) {
songNow.textContent =
`${song.title} - ${song.artist}`;
}

if (lyrics) {
lyrics.textContent =
song.lyrics ||
"Chưa có lời bài hát.";
}

if (songAlbum) {
songAlbum.textContent =
song.album ||
"---";
}

if (coverArt) {
coverArt.src =
song.cover ||
"../IMG/6.jpg";
}

updateFavoriteIcon();

// Dừng bài hiện tại
audio.pause();

// Gán source bài mới
audio.src = song.src;

// Tải source mới
audio.load();

// Chờ audio sẵn sàng rồi phát
const playWhenReady = async () => {
try {
await audio.play();
} catch (error) {
console.error(
"Không thể phát bài:",
error,
"Source:",
audio.currentSrc || audio.src
);
}
};

if (audio.readyState >= 3) {
playWhenReady();
} else {
audio.addEventListener(
"canplay",
playWhenReady,
{ once: true }
);
}
}

// =========================
// YÊU THÍCH
// =========================
function toggleFavorite() {
const songs =
window.songs;

if (
currentIndex === -1 ||
!songs ||
!songs[currentIndex]
) {
return;
}

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
!songs ||
!songs[currentIndex]
) {
return;
}

if (favoriteBtn) {
favoriteBtn.textContent =
isFavorite(
songs[currentIndex]
)
? "❤️"
: "🤍";
}
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
window.playNext =
playNext;

window.playPrev =
playPrev;

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

window.increaseVolume =
increaseVolume;

window.decreaseVolume =
decreaseVolume;

window.toggleMute =
toggleMute;
