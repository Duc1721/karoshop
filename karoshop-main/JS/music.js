// music.js
 localStorage.clear(); // Chỉ bật nếu cần reset
import { loadSongs, loadAlbums, saveSongs, saveAlbums } from "./storage.js";
import { renderPlaylist } from "./playlist.js";
import { renderAlbumCards } from "./album.js";
import { setupPlayerControls } from "./player.js";
import { setupUploadHandler } from "./upload.js";
import { setupSearch } from "./search.js";
import { setupImportExport } from "./importExport.js";
import { setupThemeToggle } from "./darkMode.js";
import { renderFavoritesList } from "./favorite.js";
import { setupProgress } from "./progress.js";
import { currentAlbumFilter } from "./albumFilter.js";

let songs = loadSongs();
let albums = loadAlbums();

if (songs.length === 0) {
  songs = [
    {
      title: "US-UK Nhẹ Nhàng",
      artist: "Unknown",
      src: "../MUSIC/musicen.mp3",
      lyrics: "Lời bài hát 1\nNội dung đang cập nhật...",
      cover: "../IMG/6.jpg",
      album: "Chill Vibes"
    },
    {
      title: "Chúc các cậu sẽ chạm tay tới ước mơ!!",
      artist: "Unknown",
      src: "../MUSIC/vove.mp3",
      lyrics: "Lời bài hát 2\nNội dung đang cập nhật...",
      cover: "../IMG/7.jpg",
      album: "Motivation"
    },
    {
      title: "Thay vì chờ đợi một ai đó chữa lành, cậu có thể tự mình làm điều đó!",
      artist: "Unknown",
      src: "../MUSIC/doicho.mp3",
      lyrics: "Lời bài hát 3\nNội dung đang cập nhật...",
      cover: "../IMG/3.jpg",
      album: "Motivation"
    },
    {
      title: "Đừng khóc trước khi đi ngủ cậu nhé..!",
      artist: "Unknown",
      src: "../MUSIC/dungkhoc.mp3",
      lyrics: "Lời bài hát 4\nNội dung đang cập nhật...",
      cover: "../IMG/5.jpg",
      album: "Chill Vibes"
    },
    {
      title: "Hoa Nở Không Màu - Acoustic Version",
      artist: "Hoài Lâm",
      src: "../MUSIC/hoanokhongmau.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/9.jpg",
      album: "Ballad"
    },
     {
      title: "Lời xin lỗi vụng về",
      artist: "QUÂN A.P",
      src: "../MUSIC/loixinloivungve.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
    {
      title: "Suýt nữa thì",
      artist: "ANDIEZ",
      src: "../MUSIC/suytnuathi.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
    {
      title: "Đừng như thói quen",
      artist: "JayKii FT Sara Lưu",
      src: "../MUSIC/dungnhuthoiquen.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
    {
      title: "Anh đừng đi",
      artist: "LYLY FT ANDIEZ",
      src: "../MUSIC/anhdungdi.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/2.jpg",
      album: "Ballad"
    },
    {
      title: "Rất buồn",
      artist: "Hoài Lâm",
      src: "../MUSIC/ratbuon.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
    {
      title: "Người ấy",
      artist: "Trịnh Thăng Bình",
      src: "../MUSIC/nguoiay.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
    {
      title: "Sai người sai thời điểm",
      artist: "Thanh Hưng",
      src: "../MUSIC/sainguoisaithoidiem.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
    {
      title: "Sao em nỡ",
      artist: "JayKii",
      src: "../MUSIC/saoemno.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
    {
      title: "Buồn không em",
      artist: "Đạt G",
      src: "../MUSIC/buonkhongem.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
    {
      title: "Em một mình quen rồi",
      artist: "Dương Hoàng Yến ft Thanh Hưng",
      src: "../MUSIC/emmotminhquenroi.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
    {
      title: "Không phải em đúng không",
      artist: "Dương Hoàng Yến",
      src: "../MUSIC/khongphaiemdungkhong.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
    {
      title: "Tự nắm tay mình",
      artist: "Dương Hoàng Yến ft Quân A.P",
      src: "../MUSIC/tunamtayminh.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
    {
      title: "Đổi thay",
      artist: "Chi Dân",
      src: "../MUSIC/doithay.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
    {
      title: "3107 full album",
      artist: "W/n ft 267, Nâu, Dươngg",
      src: "../MUSIC/3107.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/10.jpg",
      album: "Ballad"
    },
     {
      title: "3107 full album",
      artist: "W/n ft 267, Nâu, Dươngg",
      src: "../MUSIC/3107.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
      {
      title: "Bầu trời mới",
      artist: "Da LAB ft. Minh Tốc & Lam",
      src: "../MUSIC/bautroimoi.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
      {
      title: "Là anh",
      artist: "Phạm Lịch x Quanvrox",
      src: "../MUSIC/laanh.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
      {
      title: "Ngã Tư Không Đèn",
      artist: "Trang x Khoa Vũ",
      src: "../MUSIC/ngatukhongden.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
      {
      title: "Khi em Lớn",
      artist: "Orange x Hoàng Dũng",
      src: "../MUSIC/khiemlon.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
      {
      title: "Có em đời bỗng vui",
      artist: "Chillies",
      src: "../MUSIC/coemdoibongvui.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
      {
      title: "Từ ngày em đến",
      artist: "Da LAB",
      src: "../MUSIC/tungayemden.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
      {
      title: "Vì anh đâu có biết",
      artist: "Madihu (Feat. Vũ.)",
      src: "../MUSIC/vianhdaucobiet.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
      {
      title: "Có em",
      artist: "Madihu (Feat. Low G)",
      src: "../MUSIC/coem.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
      {
      title: "Thức giắc",
      artist: "Da LAB",
      src: "../MUSIC/thucgiac.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
      {
      title: "Em đừng khóc",
      artist: "Chillies",
      src: "../MUSIC/emdungkhoc.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
      {
      title: "Mascara",
      artist: "Chillies x BLAZE",
      src: "../MUSIC/mascara.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
      {
      title: "Chuyện đôi ta",
      artist: "Emcee L (Da LAB) ft Muộii",
      src: "../MUSIC/chuyendoita.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
         {
      title: "Chạy khỏi thế hiới này",
      artist: "Da LAB ft. Phương Ly",
      src: "../MUSIC/chaykhoithegioinay.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
        {
      title: "Phép màu (Đàn Cá Gỗ OST)",
      artist: "Mounter x MAYDAYs, Minh Tốc",
      src: "../MUSIC/phepmau.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
    {
      title: "Có một mùa hè",
      artist: "Phạm Toàn Thắng",
      src: "../MUSIC/comotmuahe.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
    {
      title: "Tựa đêm nay",
      artist: "The Cassette",
      src: "../MUSIC/tuademnay.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/CEO & CO FOUNDER.jpg",
      album: "Nghe nhạc cùng Vitero"
    },
    //
     {
      title: "Hôm nay nụ cười cà phê của bạn có vị gì?",
      artist: "Unknown",
      src: "../MUSIC/loficoffee1.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/6.jpg",
      album: "Lofi"
    },
     {
      title: "Hôm nay nụ cười cà phê của bạn có vị gì 2?",
      artist: "Unknown",
      src: "../MUSIC/loficoffee2.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/6.jpg",
      album: "Lofi"
    },
    //
    {
      title: "Top 24 nhạc trẻ 2024",
      artist: "Unknown",
      src: "../MUSIC/top24.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/3.jpg",
      album: "Top 100 nhạc trẻ"
    },
        //
    {
      title: "Nhạc trữ tình quê hương chọn lọc",
      artist: "Unknown",
      src: "../MUSIC/quehuong.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/8.jpg",
      album: "Quê hương"
    },
        //
    {
      title: "Nhạc Remix TikTok triệu view 2025",
      artist: "Unknown",
      src: "../MUSIC/remix.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/7.jpg",
      album: "Remix"
    },
     {
      title: "Top 15 bản Remix TikTok hay nhất 2025",
      artist: "Unknown",
      src: "../MUSIC/remix1.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/7.jpg",
      album: "Remix"
    },
    //
      {
      title: "Rise",
      artist: "Ampyx",
      src: "../MUSIC/rise.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/7.jpg",
      album: "EDM"
    },
       {
      title: "EDM mix cực phiêu",
      artist: "Unknown",
      src: "../MUSIC/edm.mp3",
      lyrics: "Lời bài hát đang cập nhật...",
      cover: "../IMG/7.jpg",
      album: "EDM"
    },
  ];
  
  albums = ["Nghe nhạc cùng Vitero", "Ballad", "Lofi", "Remix", "EDM", "Chill Vibes", "Motivation", "Top 100 nhạc trẻ", "Top 100 Âu Mỹ", "Quê hương", "Postcast", "Study"];
  saveSongs(songs);
  saveAlbums(albums);
}

window.songs = songs; 
window.albums = albums;

renderPlaylist();
renderAlbumCards();
renderFavoritesList(songs);
setupPlayerControls();
setupUploadHandler();
setupSearch();
setupImportExport();
setupThemeToggle();
setupProgress(document.getElementById("audioPlayer"));
