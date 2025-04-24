// script.js

// Gün sonuna kadar kalan zamanı hesaplayıp ekranda gösterir
function startCountdown() {
  const display = document.getElementById('countdown');

  function update() {
    const now = new Date();
    // Gece yarısı (bir sonraki günün 00:00)
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;

    const hrs = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');

    display.textContent = `${hrs}:${mins}:${secs}`;
  }

  update();              // İlk anı hızlıca güncelle
  setInterval(update, 1000);  // Her saniye güncelle
}

// Filtre butonlarının aktif-state’i yönetir
function setupFilters() {
  const buttons = document.querySelectorAll('.filters button');
  buttons.forEach(btn =>
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // TODO: Buraya 'btn.textContent' değerine göre listeyi filtreleme kodunu ekleyebilirsiniz
    })
  );
}

document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setupFilters();
});
Add real-time countdown & filter logic
