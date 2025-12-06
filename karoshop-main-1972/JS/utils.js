// ✅ Tạo phần tử HTML với class và nội dung
export function createElement(tag, className = "", textContent = "") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

// ✅ Xác nhận xoá đơn giản (dùng trong playlist)
export function confirmDelete(message) {
  return window.confirm(message);
}

// ✅ Xác nhận popup đẹp với overlay (dùng trong album)
export function showConfirmDialog(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

    const box = document.createElement("div");
    box.className = "bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl text-center max-w-sm w-full";

    const text = document.createElement("p");
    text.className = "mb-4 text-sm font-medium text-black dark:text-white";
    text.textContent = message;

    const buttons = document.createElement("div");
    buttons.className = "flex justify-center gap-4";

    const yesBtn = document.createElement("button");
    yesBtn.textContent = "Xác nhận";
    yesBtn.className = "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600";
    yesBtn.onclick = () => {
      document.body.removeChild(overlay);
      resolve(true);
    };

    const noBtn = document.createElement("button");
    noBtn.textContent = "Hủy";
    noBtn.className = "px-4 py-2 bg-gray-300 dark:bg-zinc-600 text-black dark:text-white rounded hover:bg-gray-400";
    noBtn.onclick = () => {
      document.body.removeChild(overlay);
      resolve(false);
    };

    buttons.appendChild(yesBtn);
    buttons.appendChild(noBtn);
    box.appendChild(text);
    box.appendChild(buttons);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
}

// ✅ Hiển thị danh sách album hiện có + tạo album mới
export function showAlbumSelectorDialog(albums = [], currentAlbum = "") {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

    const box = document.createElement("div");
    box.className = "bg-white dark:bg-zinc-800 p-5 rounded-xl shadow-xl w-full max-w-sm text-black dark:text-white";

    const label = document.createElement("label");
    label.textContent = "Chọn album:";
    label.className = "block mb-2 font-medium";

    const select = document.createElement("select");
    select.className = "w-full p-2 rounded mb-4 bg-white dark:bg-zinc-700 text-black dark:text-white";

    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "Tạo mới Album";
    select.appendChild(emptyOption);

    albums.forEach(album => {
      const option = document.createElement("option");
      option.value = album;
      option.textContent = album;
      if (album === currentAlbum) option.selected = true;
      select.appendChild(option);
    });

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Tên Album mới";
    input.className = "w-full p-2 rounded border mb-4 bg-white dark:bg-zinc-700 text-black dark:text-white hidden";
    input.disabled = true;

    const buttons = document.createElement("div");
    buttons.className = "flex justify-end gap-2";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Hủy";
    cancelBtn.className = "px-4 py-2 bg-gray-300 dark:bg-zinc-600 text-black dark:text-white rounded hover:bg-gray-400";
    cancelBtn.onclick = () => {
      document.body.removeChild(overlay);
      resolve(null);
    };

    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "OK";
    confirmBtn.className = "px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600";
    confirmBtn.onclick = () => {
      const selected = select.value;
      const newAlbum = input.value.trim();
      const result = selected || newAlbum || null;
      document.body.removeChild(overlay);
      resolve(result);
    };

    select.onchange = () => {
      if (select.value === "") {
        input.disabled = false;
        input.classList.remove("hidden");
      } else {
        input.disabled = true;
        input.classList.add("hidden");
      }
    };

    buttons.appendChild(cancelBtn);
    buttons.appendChild(confirmBtn);
    box.appendChild(label);
    box.appendChild(select);
    box.appendChild(input);
    box.appendChild(buttons);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
}

// ✅ Format thời gian từ giây → mm:ss
export function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
// ✅ Popup tạo album mới trong giao diện album
export function showNewAlbumDialog() {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity";

    const box = document.createElement("div");
    box.className = "bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl text-center w-full max-w-sm text-black dark:text-white animate-fadeIn";

    const title = document.createElement("h2");
    title.textContent = "Tạo album mới";
    title.className = "text-lg font-semibold mb-4";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nhập tên album";
    input.className = "w-full p-2 rounded border mb-4 bg-white dark:bg-zinc-700 text-black dark:text-white";

    const buttons = document.createElement("div");
    buttons.className = "flex justify-end gap-2";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Hủy";
    cancelBtn.className = "px-4 py-2 bg-gray-300 dark:bg-zinc-600 text-black dark:text-white rounded hover:bg-gray-400";
    cancelBtn.onclick = () => {
      document.body.removeChild(overlay);
      resolve(null);
    };

    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "Tạo";
    confirmBtn.className = "px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600";
    confirmBtn.onclick = () => {
      const name = input.value.trim();
      if (name) {
        document.body.removeChild(overlay);
        resolve(name);
      }
    };

    buttons.appendChild(cancelBtn);
    buttons.appendChild(confirmBtn);
    box.appendChild(title);
    box.appendChild(input);
    box.appendChild(buttons);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    input.focus();
  });
}
