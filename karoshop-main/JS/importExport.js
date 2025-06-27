// importExport.js
import { saveSongs } from "./storage.js";
import { renderPlaylist } from "./playlist.js";

export function setupImportExport() {
  const importInput = document.getElementById("importInput");
  importInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const imported = JSON.parse(reader.result);
          window.songs = imported;
          saveSongs(imported);
          renderPlaylist();
        } catch {
          alert("Tệp không hợp lệ!");
        }
      };
      reader.readAsText(file);
    }
  });

  document.querySelector("[title='Xuất danh sách']").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(window.songs)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "playlist.json";
    a.click();
  });
}
