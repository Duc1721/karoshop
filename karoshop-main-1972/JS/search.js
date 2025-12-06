// search.js
export function setupSearch() {
  const input = document.getElementById("searchInput");
  const list = document.getElementById("playlist");

  input.addEventListener("input", () => {
    const keyword = input.value.toLowerCase();
    const items = list.getElementsByTagName("li");
    Array.from(items).forEach((li) => {
      const text = li.innerText.toLowerCase();
      li.style.display = text.includes(keyword) ? "" : "none";
    });
  });
}
