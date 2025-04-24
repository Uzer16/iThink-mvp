// script.js

// 1) Cevap verilerini tanımlıyoruz:
const answersData = [
  { text: 'Tavanda zıplıyor.', votes: 24, period: 'Günlük' },
  { text: 'Kedi kostümü giyer.', votes: 18, period: 'Haftalık' },
  { text: 'Telefona gömülür.', votes: 12, period: 'Aylık' },
  // İleride isterseniz daha çok veri ekleyebilirsiniz...
];

// 2) DOM’a basan fonksiyon:
function renderAnswers(filter = 'Günlük') {
  const list = document.getElementById('answers-list');
  list.innerHTML = ''; // önce temizle

  answersData
    .filter(a => a.period === filter)
    .forEach(a => {
      const li = document.createElement('li');
      li.textContent = a.text;
      const span = document.createElement('span');
      span.className = 'votes';
      span.textContent = `😂 ${a.votes}`;
      li.appendChild(span);
      list.appendChild(li);
    });
}

// 3) Sayaç fonksiyonu (önceden eklenmişti):
function startCountdown() {
  const display = document.getElementById('countdown');
  function update() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;
    const hrs  = String(Math.floor(diff/3600000)).padStart(2,'0');
    const mins = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
    const secs = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
    display.textContent = `${hrs}:${mins}:${secs}`;
  }
  update();
  setInterval(update, 1000);
}

// 4) Filtre butonları:
function setupFilters() {
  const buttons = document.querySelectorAll('.filters button');
  buttons.forEach(btn =>
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAnswers(btn.textContent); // period olarak buton metnini gönder
    })
  );
}

// 5) Başlangıç:
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setupFilters();
  renderAnswers(); // default Günlük ile başlasın
});
