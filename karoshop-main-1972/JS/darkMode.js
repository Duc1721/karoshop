// darkMode.js

// =========================
// THEME
// =========================

export function setupThemeToggle() {

  const body = document.body;

  if (!body) return;


  // =========================
  // LẤY THEME ĐÃ LƯU
  // =========================

  const savedTheme = localStorage.getItem("theme");

  const currentTheme =
    savedTheme === "light"
      ? "light"
      : "dark";


  // =========================
  // ÁP DỤNG THEME
  // =========================

  applyTheme(currentTheme);


  // =========================
  // HÀM GLOBAL
  // HTML onclick="toggleTheme()"
  // =========================

  window.toggleTheme = function () {

    const isDark =
      body.classList.contains("dark");

    const newTheme =
      isDark
        ? "light"
        : "dark";

    applyTheme(newTheme);
  };


  // =========================
  // ÁP DỤNG THEME
  // =========================

  function applyTheme(theme) {

    // Xóa theme cũ
    body.classList.remove(
      "dark",
      "light"
    );


    // Thêm theme mới
    body.classList.add(theme);


    // Lưu lại
    localStorage.setItem(
      "theme",
      theme
    );


    // =========================
    // CẬP NHẬT ICON NÚT THEME
    // =========================

    const themeButtons =
      document.querySelectorAll(
        '[onclick="toggleTheme()"]'
      );


    themeButtons.forEach(button => {

      if (theme === "dark") {

        button.textContent = "☀️";

        button.title =
          "Chuyển sang chế độ sáng";

      } else {

        button.textContent = "🌙";

        button.title =
          "Chuyển sang chế độ tối";
      }

    });
  }
}
