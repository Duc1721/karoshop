// album.js
import { renderPlaylist } from "./playlist.js";
import { createElement } from "./utils.js";
import { showConfirmDialog } from "./dialog.js";

export function renderAlbumCards() {
  const albumCards = document.getElementById("albumCards");
  const albumCardsMobile = document.getElementById("albumCardsMobile");

  const albums = window.albums || [];
  const songs = window.songs || [];
  const currentAlbumFilter = window.currentAlbumFilter || null;

  const renderTo = (container) => {
    if (!container) return;
    container.innerHTML = "";

    // Nút thêm album (chỉ hiển thị ở desktop)
    if (container.id === "albumCards") {
      const addCard = createElement(
        "div",
        "album-card flex items-center justify-center bg-gray-100 dark:bg-zinc-700 border border-dashed border-pink-400 dark:border-pink-500 rounded-2xl cursor-pointer text-pink-500 text-4xl select-none",
        "➕"
      );
      addCard.title = "Thêm album mới";
      addCard.onclick = async () => {
        const name = prompt("Nhập tên album mới:");
        const newAlbum = name?.trim();
        if (newAlbum) {
          if (albums.includes(newAlbum)) {
            alert("Album đã tồn tại!");
            return;
          }
          albums.push(newAlbum);
          window.albums = albums;
          localStorage.setItem("albums", JSON.stringify(albums));
          renderAlbumCards();
        }
      };
      container.appendChild(addCard);
    }

    albums.forEach((album) => {
      const card = createElement(
        "div",
        "album-card group rounded-2xl shadow transition-transform hover:-translate-y-2 cursor-pointer relative"
      );

      const songsInAlbum = songs.filter((s) => {
        if (Array.isArray(s.album)) return s.album.includes(album);
        return s.album === album;
      });

      const randomSong = songsInAlbum[Math.floor(Math.random() * songsInAlbum.length)];
      const coverImg = (randomSong && randomSong.cover) || "../IMG/6.jpg";
      card.style.backgroundImage = `url('${coverImg}')`;
      card.title = album;
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center";

      if (currentAlbumFilter === album) {
        card.classList.add("selected");
      }

      const overlay = createElement("div", "album-card-overlay text-white text-sm md:text-lg font-bold text-center p-2", album);
      card.appendChild(overlay);

      if (container.id === "albumCards") {
        const delBtn = createElement(
          "button",
          "absolute top-2 right-2 text-sm text-white hover:text-red-500 hover:scale-110 px-2 py-0.5 transition-transform z-10 opacity-0 group-hover:opacity-100",
          "❌"
        );
        delBtn.onclick = async (e) => {
          e.stopPropagation();
          const confirmed = await showConfirmDialog(`Xóa album \"${album}\"?`);
          if (confirmed) {
            const updatedAlbums = albums.filter((a) => a !== album);
            const updatedSongs = songs.map((s) => {
              if (Array.isArray(s.album)) {
                return { ...s, album: s.album.filter((a) => a !== album) };
              } else {
                return { ...s, album: s.album === album ? null : s.album };
              }
            });

            window.albums = updatedAlbums;
            window.songs = updatedSongs;
            localStorage.setItem("albums", JSON.stringify(updatedAlbums));
            localStorage.setItem("songs", JSON.stringify(updatedSongs));
            window.currentAlbumFilter = null;
            renderAlbumCards();
            renderPlaylist();
          }
        };
        card.appendChild(delBtn);
      }

      card.onclick = () => {
        window.currentAlbumFilter = album;
        renderAlbumCards();
        renderPlaylist();
      };

      container.appendChild(card);
    });
  };

  renderTo(albumCards);
  renderTo(albumCardsMobile);
}