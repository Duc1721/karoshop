// ✅ Lưu danh sách bài hát
export function saveSongs(songs) {
  localStorage.setItem("songs", JSON.stringify(songs));
}

// ✅ Lưu danh sách albums
export function saveAlbums(albums) {
  localStorage.setItem("albums", JSON.stringify(albums));
}

// ✅ Tải danh sách bài hát từ localStorage
export function loadSongs() {
  try {
    const data = localStorage.getItem("songs");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// ✅ Tải danh sách albums từ localStorage
export function loadAlbums() {
  try {
    const data = localStorage.getItem("albums");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// ✅ Tạo key duy nhất cho bài hát
function getSongKey(song) {
  return `fav_${song.title}_${song.album || "no_album"}`;
}

// ✅ Kiểm tra xem bài hát có phải yêu thích không
export function isFavorite(song) {
  return localStorage.getItem(getSongKey(song)) === "true";
}

// ✅ Đổi trạng thái yêu thích bài hát
export function toggleFavoriteStatus(song) {
  const key = getSongKey(song);
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, "true");
  }
}
