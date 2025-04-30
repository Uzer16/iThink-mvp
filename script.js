// 1) Başlangıç verisi & filtre durumu
const answersData = [
  { text: 'Tavanda zıplıyor.', daily:24, weekly:44, monthly:70, yearly:320 },
  { text: 'Kedi kostümü giyer.', daily:18, weekly:33, monthly:60, yearly:210 },
  { text: 'Telefona gömülür.',   daily:12, weekly:26, monthly:50, yearly:118 }
];
let currentFilter = 'daily';

// 2) Cevap listesini render et
function renderAnswers() {
  const ul = document.getElementById('answers-list');
  ul.innerHTML = '';
  answersData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;
    const span = document.createElement('span');
    span.className = 'votes';
    span.textContent = `😂 ${ item[currentFilter] }`;
    span.onclick = () => {
      item[currentFilter]++;
      renderAnswers();
    };
    li.append(span);
    ul.append(li);
  });
}

// 3) Geri sayım (gün sonuna kadar)
function startCountdown() {
  const display = document.getElementById('countdown');
  function update() {
    const now = new Date(), mid = new Date(now);
    mid.setHours(24,0,0,0);
    const diff = mid - now;
    const h = String(Math.floor(diff/3600000)).padStart(2,'0'),
          m = String(Math.floor((diff%3600000)/60000)).padStart(2,'0'),
          s = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
    display.textContent = `${h}:${m}:${s}`;
  }
  update();
  setInterval(update,1000);
}

// 4) Filtre butonları
function setupFilters() {
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.filters button')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.textContent.trim();
      currentFilter = t==='Günlük'?'daily'
                    : t==='Haftalık'?'weekly'
                    : t==='Aylık'?'monthly'
                    : 'yearly';
      renderAnswers();
    };
  });
}

// 5) Yorum modal’i
function setupCommentModal() {
  const modal = document.getElementById('comment-modal');
  const open  = document.getElementById('answer-btn');
  const close = document.getElementById('modal-close');
  const send  = document.getElementById('submit-comment');
  const ta    = document.getElementById('new-comment');

  open.onclick  = () => { ta.value=''; modal.style.display='flex'; };
  close.onclick = () => modal.style.display='none';
  modal.onclick = e => { if(e.target===modal) modal.style.display='none'; };
  send.onclick = () => {
    const txt = ta.value.trim();
    if(!txt) return alert('Lütfen bir yorum yazın!');
    answersData.push({ text: txt, daily:0, weekly:0, monthly:0, yearly:0 });
    modal.style.display='none';
    renderAnswers();
  };
}

// 6) Auth modal’i (simülasyon)
function setupAuthForm() {
  const nav   = document.getElementById('nav-auth');
  const modal = document.getElementById('auth-modal');
  const close = document.getElementById('auth-close');
  const em    = document.getElementById('email');
  const pw    = document.getElementById('password');
  const btn   = document.getElementById('login-btn');

  nav.onclick = e => { e.preventDefault(); modal.style.display='flex'; };
  close.onclick = () => modal.style.display='none';
  modal.onclick = e => { if(e.target===modal) modal.style.display='none'; };
  btn.onclick = e => {
    e.preventDefault();
    if(!em.value || !pw.value) return alert('Lütfen e-posta ve şifre girin.');
    alert('Giriş başarılı! (Simülasyon)');
    modal.style.display='none';
  };
}

// 7) Uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setupFilters();
  renderAnswers();
  setupCommentModal();
  setupAuthForm();
});
