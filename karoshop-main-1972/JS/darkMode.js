// darkMode.js
export function setupThemeToggle() {
  const body = document.getElementById("body");

  if (!body) return;

  // Lấy theme đã lưu (nếu có)
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    body.classList.remove("dark");
    body.classList.add("light");
  } else {
    body.classList.add("dark");
    body.classList.remove("light");
  }

  // TẠO HÀM GLOBAL cho onclick trong HTML
  window.toggleTheme = function () {
    const isDark = body.classList.contains("dark");

    if (isDark) {
      body.classList.remove("dark");
      body.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.add("dark");
      body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };
}