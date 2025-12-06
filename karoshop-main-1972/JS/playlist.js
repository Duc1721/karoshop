import { isFavorite } from "./storage.js";
import { selectSong } from "./player.js";
import { saveSongs } from "./storage.js";
import { createElement, confirmDelete, showAlbumSelectorDialog } from "./utils.js";

export function renderPlaylist() {
  const list = document.getElementById("playlist");
  const songs = window.songs;
  const currentAlbumFilter = window.currentAlbumFilter || null;

  list.innerHTML = "";

  if (currentAlbumFilter) {
    const exitFilter = createElement("li", "text-pink-500 font-semibold cursor-pointer", "← Thoát chế độ Album");
    exitFilter.onclick = () => {
      window.currentAlbumFilter = null;
      renderPlaylist();
    };
    list.appendChild(exitFilter);
  }

  const filtered = currentAlbumFilter ? songs.filter(s => s.album === currentAlbumFilter) : songs;

  const seenSources = new Set(); // <- dùng để kiểm tra trùng
  filtered.forEach((song, i) => {
    if (seenSources.has(song.src)) return; // bỏ qua bài đã gặp
    seenSources.add(song.src); // đánh dấu bài đã hiển thị

    const li = createElement("li", "hover-highlight cursor-pointer flex justify-between items-center gap-2");

    const span = createElement("span", "flex-1", `${song.title} - ${song.artist}`);

    span.onclick = () => {
      const filteredSongs = currentAlbumFilter
        ? window.songs.filter(s => s.album === currentAlbumFilter)
        : window.songs;

      const realIndex = filteredSongs.findIndex(s => s === song);
      if (realIndex !== -1) {
        window.__playingFilteredSongs__ = filteredSongs;
        window.__filteredIndex__ = realIndex;
        selectSong(realIndex, filteredSongs);
      }
    };

    const buttons = createElement("div", "flex gap-2 items-center");

    if (!currentAlbumFilter) {
      const addBtn = createElement("button", "text-sm hover:text-green-500", "➕");
      addBtn.title = "Thêm vào album";
      addBtn.onclick = async (e) => {
        e.stopPropagation();
        const albumName = await showAlbumSelectorDialog(window.albums, song.album);
        if (albumName) {
          song.album = albumName;
          if (!window.albums.includes(albumName)) {
            window.albums.push(albumName);
            localStorage.setItem("albums", JSON.stringify(window.albums));
          }
          saveSongs(window.songs);
          renderPlaylist();
        }
      };
      buttons.appendChild(addBtn);
    }

    const delBtn = createElement("button", "text-sm hover:text-red-500", "🗑️");
    delBtn.title = currentAlbumFilter ? "Xóa khỏi album" : "Xóa khỏi danh sách";
    delBtn.onclick = async (e) => {
      e.stopPropagation();
      const confirmed = await confirmDelete(
        currentAlbumFilter
          ? `Xóa "${song.title}" khỏi album "${currentAlbumFilter}"?`
          : `Xóa hoàn toàn "${song.title}" khỏi danh sách?`
      );
      if (confirmed) {
        if (currentAlbumFilter) {
          song.album = null;
        } else {
          window.songs.splice(window.songs.indexOf(song), 1);
        }
        saveSongs(window.songs);
        renderPlaylist();
      }
    };
    buttons.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(buttons);
    list.appendChild(li);
  });

  renderFavoriteList();
}

function renderFavoriteList() {
  const list = document.getElementById("favoriteList");
  const songs = window.songs;

  list.innerHTML = "";
  songs.forEach((song, i) => {
    if (isFavorite(song)) {
      const li = createElement("li", "hover-highlight cursor-pointer", `${song.title} - ${song.artist}`);
      li.onclick = () => {
        selectSong(i);
      };
      list.appendChild(li);
    }
  });
}
