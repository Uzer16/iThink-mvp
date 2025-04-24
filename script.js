// script.js

function startCountdown() {
  const display = document.getElementById('countdown');
  function update() {
    const now = new Date();
    // Gece yarısını al
    const midnight = new Date(now);
    midnight.setHours(24,0,0,0);
    const diff = midnight - now;
    const hrs = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    display.textContent = `${hrs}:${mins}:${secs}`;
  }
  update();
  setInterval(update, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
});
// script.js devamı

const filters = document.querySelectorAll('.filters button');
filters.forEach(btn =>
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // TODO: Burada seçilen filtreye göre cevapları filtrele
  })
);
