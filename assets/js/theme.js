const toggleBtn = document.getElementById("toggle-theme");

// Carregar preferência salva
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
  toggleBtn.textContent = "☀️";
}

// Alternar tema ao clicar
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    toggleBtn.textContent = "☀️"; 
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
