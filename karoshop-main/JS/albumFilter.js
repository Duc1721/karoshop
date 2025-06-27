// albumFilter.js
import { renderPlaylist } from "./playlist.js";
import { renderAlbumCards } from "./album.js";

export let currentAlbumFilter = null;

export function filterByAlbum(albumName) {
  currentAlbumFilter = albumName;
  renderPlaylist();
  renderAlbumCards();
}

export function clearAlbumFilter() {
  currentAlbumFilter = null;
  renderPlaylist();
  renderAlbumCards();
}
