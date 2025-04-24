// script.js

// 1) Cevap verileri
const answersData = [
  { text: 'Tavanda zıplıyor.', votes: 24, period: 'Günlük' },
  { text: 'Kedi kostümü giyer.', votes: 18, period: 'Haftalık' },
  { text: 'Telefona gömülür.', votes: 12, period: 'Aylık' },
];

// Seçili filtre (başlangıçta Günlük)
let currentFilter = 'Günlük';

// 2) DOM’a basan fonksiyon
function renderAnswers() {
  const list = document.getElementById('answers-list');
  list.innerHTML = '';

  answersData
    .filter(a => a.period === currentFilter)
    .forEach((a, i) => {
      const li = document.createElement('li');
      li.textContent = a.text;

      // Oy sayısını gösteren span
      const span = document.createElement('span');
      span.className = 'votes';
      span.textContent = `😂 ${a.votes}`;
      span.style.cursor = 'pointer';

      // Tıklanınca oy sayısını artır
      span.addEventListener('click', () => {
        answersData[i].votes++;
        renderAnswers();
      });

      li.appendChild(span);
      list.appendChild(li);
    });
}

// 3) Geri sayım (değişmedi)
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

// 4) Filtre butonları (şimdi currentFilter güncelliyor)
function setupFilters() {
  const buttons = document.querySelectorAll('.filters button');
  buttons.forEach(btn =>
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.textContent;
      renderAnswers();
    })
  );
}

// 5) Başlangıç
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setupFilters();
  renderAnswers();
});
