// darkMode.js
export function setupThemeToggle() {
  const body = document.getElementById("body");
  const toggleBtn = document.querySelector("[title='Chế độ sáng/tối']");

  let isDark = body.classList.contains("dark");
  applyTheme();

  toggleBtn.addEventListener("click", () => {
    isDark = !isDark;
    applyTheme();
  });

  function applyTheme() {
    body.classList.toggle("dark", isDark);
    body.classList.toggle("light", !isDark);
  }
}