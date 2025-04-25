// 1) Başlangıç verisi
const answersData = [
  { text: 'Tavanda zıplıyor.', votes: 24, period: 'Günlük' },
  { text: 'Kedi kostümü giyer.', votes: 18, period: 'Haftalık' },
  { text: 'Telefona gömülür.', votes: 12, period: 'Aylık' },
];
let currentFilter = 'Günlük';

// 2) Listeyi render et
function renderAnswers() {
  const list = document.getElementById('answers-list');
  list.innerHTML = '';
  answersData
    .filter(a => a.period === currentFilter)
    .forEach((a, i) => {
      const li = document.createElement('li');
      li.textContent = a.text;
      const span = document.createElement('span');
      span.className = 'votes';
      span.textContent = `😂 ${a.votes}`;
      span.addEventListener('click', () => {
        answersData[i].votes++;
        renderAnswers();
      });
      li.appendChild(span);
      list.appendChild(li);
    });
}

// 3) Geri sayım
function startCountdown() {
  const display = document.getElementById('countdown');
  function update() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24,0,0,0);
    const diff = midnight - now;
    const hrs  = String(Math.floor(diff/3600000)).padStart(2,'0');
    const mins = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
    const secs = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
    display.textContent = `${hrs}:${mins}:${secs}`;
  }
  update();
  setInterval(update,1000);
}

// 4) Filtre butonları
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

// 5) Modal mantığı
function setupCommentModal() {
  const modal = document.getElementById('comment-modal');
  const btnOpen = document.getElementById('answer-btn');
  const btnClose = document.getElementById('modal-close');
  const btnSubmit = document.getElementById('submit-comment');
  const textarea = document.getElementById('new-comment');

  btnOpen.addEventListener('click', () => {
    textarea.value = '';
    modal.style.display = 'flex';
  });
  btnClose.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });
  btnSubmit.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text) return alert('Lütfen bir yorum yazın!');
    answersData.push({ text, votes: 0, period: currentFilter });
    modal.style.display = 'none';
    renderAnswers();
  });
}

// 6) Her şeyi başlat
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setupFilters();
  renderAnswers();
  setupCommentModal();
});
