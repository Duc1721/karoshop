import { saveSongs } from "./storage.js";
import { renderPlaylist } from "./playlist.js";
import { renderAlbumCards } from "./album.js";
import { selectSong } from "./player.js";

export function setupUploadHandler() {
  const uploadInput = document.getElementById("uploadInput");

  uploadInput.addEventListener("change", (e) => {
    const files = Array.from(e.target.files);
    const songs = window.songs || [];

    files.forEach((file, i) => {
      const url = URL.createObjectURL(file);
      const song = {
        title: file.name,
        artist: "Tải lên",
        src: url,
        lyrics: "(Không có lời bài hát)",
        cover: "../IMG/6.jpg",
        album: null, // Không còn chọn album
      };
      songs.push(song);

      if (i === files.length - 1) {
        window.songs = songs;
        saveSongs(songs);
        renderPlaylist();
        renderAlbumCards();
        selectSong(songs.length - 1); // Tự động phát bài mới nhất
      }
    });

    // Reset input để có thể chọn lại cùng file nếu muốn
    uploadInput.value = "";
  });
}
