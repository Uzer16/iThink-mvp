// script.js
// başlangıç verisi
let answersData = [
  { text: 'Tavanda zıplıyor.', daily:24, weekly:44, monthly:70, yearly:320 },
  { text: 'Kedi kostümü giyer.', daily:18, weekly:33, monthly:60, yearly:210 },
  { text: 'Telefona gömülür.',   daily:12, weekly:26, monthly:50, yearly:118 }
];
let currentFilter = 'daily';
let currentCategory = 'default';

//  kategoriye özel placeholder veri (sonradan güncelle)
const categoryData = {
  'default': {
    question: 'Patronunuz öğle arasında…?',
    answers: answersData
  },
  'Aşk': {
    question: 'Aşk kategorisinden günün sorusu nedir?',
    answers: JSON.parse(JSON.stringify(answersData))
  },
  'Cinevizyon': {
    question: 'Cinevizyon kategorisinden günün sorusu nedir?',
    answers: JSON.parse(JSON.stringify(answersData))
  },
  'Siyaset': {
    question: 'Siyaset kategorisinden günün sorusu nedir?',
    answers: JSON.parse(JSON.stringify(answersData))
  },
  'Spor': {
    question: 'Spor kategorisinden günün sorusu nedir?',
    answers: JSON.parse(JSON.stringify(answersData))
  },
  'Tarih': {
    question: 'Tarih kategorisinden günün sorusu nedir?',
    answers: JSON.parse(JSON.stringify(answersData))
  },
  'Teknoloji': {
    question: 'Teknoloji kategorisinden günün sorusu nedir?',
    answers: JSON.parse(JSON.stringify(answersData))
  }
};

// DOM referansları
const questionTitle = document.getElementById('question-title');
const questionText  = document.getElementById('question-text');
const categoriesMenu = document.getElementById('categories-menu');
const navCategories  = document.getElementById('nav-categories');

// kategori menüsünü aç/kapat
navCategories.onclick = e => {
  e.preventDefault();
  categoriesMenu.style.display = 
    categoriesMenu.style.display === 'block' ? 'none' : 'block';
};
// kategori seçimi
categoriesMenu.querySelectorAll('button').forEach(btn => {
  btn.onclick = () => {
    currentCategory = btn.dataset.cat;
    // soru ve cevapları resetle
    const cd = categoryData[currentCategory] || categoryData['default'];
    questionText.textContent = cd.question;
    answersData = cd.answers;
    // menüyü kapat
    categoriesMenu.style.display = 'none';
    // yenile
    renderAnswers();
  };
});

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

// 3) Geri sayım
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

// 6) Auth modal’i
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

// 7) Başlat
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setupFilters();
  renderAnswers();
  setupCommentModal();
  setupAuthForm();
});
