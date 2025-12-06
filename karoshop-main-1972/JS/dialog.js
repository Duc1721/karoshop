export function showConfirmDialog(message) {
  return new Promise((resolve) => {
    // Tạo overlay
    const overlay = document.createElement("div");
    overlay.className = "confirm-overlay";

    // Tạo box
    const box = document.createElement("div");
    box.className = "confirm-box";

    const text = document.createElement("p");
    text.className = "confirm-message";
    text.textContent = message;

    const buttons = document.createElement("div");
    buttons.className = "confirm-buttons";

    const yesBtn = document.createElement("button");
    yesBtn.textContent = "Xác nhận";
    yesBtn.className = "confirm-yes";
    yesBtn.onclick = () => close(true);

    const noBtn = document.createElement("button");
    noBtn.textContent = "Hủy";
    noBtn.className = "confirm-no";
    noBtn.onclick = () => close(false);

    buttons.appendChild(noBtn);
    buttons.appendChild(yesBtn);
    box.appendChild(text);
    box.appendChild(buttons);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    function close(result) {
      box.classList.add("animate-fadeOut");
      overlay.classList.add("bg-fadeOut");
      setTimeout(() => {
        document.body.removeChild(overlay);
        resolve(result);
      }, 200); // khớp với thời gian animation
    }
  });
}
