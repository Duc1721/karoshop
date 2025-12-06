// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { renderPlaylist } from "./playlist.js";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB0NZSaxCTawmZ-3r0NTJP10I-_0KKHcJ0",
    authDomain: "music-84f87.firebaseapp.com",
    projectId: "music-84f87",
    storageBucket: "music-84f87.firebasestorage.app",
    messagingSenderId: "272671259900",
    appId: "1:272671259900:web:626ec1ff31ff9c74c52b79",
    measurementId: "G-4DLWT1MD3S",
    databaseURL: "https://music-84f87-default-rtdb.firebaseio.com/"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Hàm upload bài hát lên Realtime Database
export function uploadSongToFirebase(song) {
  const songRef = push(ref(db, 'songs'));
  set(songRef, song)
    .then(() => {
      console.log("Đã upload bài hát lên Firebase thành công");
    })
    .catch((error) => {
      console.error("Lỗi khi upload bài hát:", error);
    });
}

// Hàm tải danh sách bài hát từ Firebase về local
export function fetchSongsFromFirebase() {
  const songsRef = ref(db, 'songs');
  onValue(songsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const songs = Object.values(data);
      window.songs = songs;
      localStorage.setItem("songs", JSON.stringify(songs));
      renderPlaylist();
    }
  });
}
