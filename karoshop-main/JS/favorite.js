// favorite.js
export function toggleFavorite(currentIndex, songs) {
  if (currentIndex === -1) return;
  const key = "fav_" + songs[currentIndex].title;
  localStorage.getItem(key)
    ? localStorage.removeItem(key)
    : localStorage.setItem(key, "true");
}

export function isFavorite(index, songs) {
  const key = "fav_" + songs[index].title;
  return localStorage.getItem(key) !== null;
}

export function updateFavoriteIcon(favoriteBtn, index, songs) {
  if (index === -1) return;
  favoriteBtn.textContent = isFavorite(index, songs) ? "❤️" : "🤍";
}

export function renderFavoritesList(songs) {
  const list = document.getElementById("favoriteList");
  list.innerHTML = "";
  songs.forEach((song, i) => {
    const key = "fav_" + song.title;
    if (localStorage.getItem(key)) {
      const li = document.createElement("li");
      li.textContent = `${song.title} - ${song.artist}`;
      li.className = "hover-highlight cursor-pointer";
      li.onclick = () => window.selectSong(i);
      list.appendChild(li);
    }
  });
}