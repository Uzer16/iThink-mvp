// 1) Kategorilere özel başlangıç verisi
const categoriesData = {
  'Aşk': {
    question: 'Aşk kategorisinden sorunuz…?',
    answers: [
      { text: 'Kalbim patladı.', daily:10, weekly:30, monthly:50, yearly:200 },
      { text: 'Gözlerimde yıldızlar.', daily:8, weekly:25, monthly:45, yearly:180 }
    ]
  },
  'Cinevizyon': {
    question: 'Film tutkunu patron…?',
    answers: [
      { text: 'Popcorn bulutuna gömülür.', daily:12, weekly:40, monthly:60, yearly:220 },
      { text: 'Senaryo yazıyor.', daily:7, weekly:20, monthly:35, yearly:130 }
    ]
  },
  'Siyaset': {
    question: 'Politika arenası…?',
    answers: [
      { text: 'Stand-up sahnesi kurar.', daily:5, weekly:15, monthly:25, yearly:90 },
      { text: 'Bayrak dalgalandırır.', daily:3, weekly:10, monthly:20, yearly:80 }
    ]
  },
  'Spor': {
    question: 'Kahraman sporcu patron…?',
    answers: [
      { text: 'Top yerine palyaço burnu fırlatır.', daily:6, weekly:18, monthly:30, yearly:100 },
      { text: 'Tribünde salıncak kurar.', daily:4, weekly:12, monthly:22, yearly:85 }
    ]
  },
  'Tarih': {
    question: 'Zaman makinesinde…?',
    answers: [
      { text: 'Dinozorları oyun parkına davet eder.', daily:9, weekly:28, monthly:48, yearly:190 },
      { text: 'Piramitleri kaydırak yapar.', daily:2, weekly:8, monthly:18, yearly:75 }
    ]
  },
  'Teknoloji': {
    question: 'Gelecek kodları…?',
    answers: [
      { text: 'Robot dans gösterisi düzenler.', daily:11, weekly:35, monthly:55, yearly:210 },
      { text: 'Bulutlara selfie çeker.', daily:7, weekly:22, monthly:42, yearly:170 }
    ]
  }
};

let currentFilter = 'daily';
let answersData = [];    // oylama verisi
let currentCategory = null;

// 2) Kategoriyi yükle
function loadCategory(cat) {
  currentCategory = cat;
  const { question, answers } = categoriesData[cat];
  // soru kartını güncelle
  document.querySelector('.speech-bubble h1').textContent = `KATEGORİ: ${cat}`;
  document.querySelector('.speech-bubble p').textContent = question;
  // geri sayım gizle
  document.getElementById('countdown').style.display = 'none';
  // yanındaki iki butonu gizle
  document.querySelector('.actions').style.display = 'none';
  // filtreleri göster
  document.querySelector('.filters').style.display = 'flex';
  // cevap listesini güncelle
  answersData = answers.map(a=> ({ ...a }));
  currentFilter = 'daily';
  document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));
  document.querySelector('.filters button').classList.add('active');
  renderAnswers();
}

// 3) Cevap listesini render et
function renderAnswers() {
  const ul = document.getElementById('answers-list');
  ul.innerHTML = '';
  answersData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;
    const span = document.createElement('span');
    span.className = 'votes';
    span.textContent = `😂 ${item[currentFilter]}`;
    span.onclick = () => {
      item[currentFilter]++;
      renderAnswers();
    };
    li.append(span);
    ul.append(li);
  });
}

// 4) Geri sayım (gün sonuna kadar)
function startCountdown() {
  const display = document.getElementById('countdown');
  function update() {
    const now = new Date(), mid = new Date(now);
    mid.setHours(24,0,0,0);
    const diff = mid - now;
    const h = String(Math.floor(diff/3600000)).padStart(2,'0');
    const m = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
    const s = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
    display.textContent = `${h}:${m}:${s}`;
  }
  update();
  setInterval(update,1000);
}

// 5) Filtre butonları
function setupFilters() {
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.textContent.trim();
      currentFilter =
           t==='Günlük'  ? 'daily'
         : t==='Haftalık'? 'weekly'
         : t==='Aylık'   ? 'monthly'
         : 'yearly';
      renderAnswers();
    };
  });
}

// 6) Yorum modal’i
function setupCommentModal() {
  const modal = document.getElementById('comment-modal'),
        open  = document.getElementById('answer-btn'),
        close = document.getElementById('modal-close'),
        send  = document.getElementById('submit-comment'),
        ta    = document.getElementById('new-comment');
  open.onclick    = ()=>{ ta.value=''; modal.style.display='flex'; };
  close.onclick   = ()=> modal.style.display='none';
  modal.onclick   = e=>{ if(e.target===modal) modal.style.display='none'; };
  send.onclick    = ()=>{
    const txt = ta.value.trim();
    if(!txt) return alert('Lütfen bir yorum yazın!');
    answersData.push({ text: txt, daily:0, weekly:0, monthly:0, yearly:0 });
    modal.style.display='none';
    renderAnswers();
  };
}

// 7) Auth modal’i
function setupAuthForm() {
  const nav   = document.getElementById('nav-auth'),
        modal = document.getElementById('auth-modal'),
        close = document.getElementById('auth-close'),
        em    = document.getElementById('email'),
        pw    = document.getElementById('password'),
        btn   = document.getElementById('login-btn');
  nav.onclick    = e=>{ e.preventDefault(); modal.style.display='flex'; };
  close.onclick  = ()=> modal.style.display='none';
  modal.onclick  = e=>{ if(e.target===modal) modal.style.display='none'; };
  btn.onclick    = e=> {
    e.preventDefault();
    if(!em.value||!pw.value) return alert('Lütfen e-posta ve şifre girin.');
    alert('Giriş başarılı! (Simülasyon)');
    modal.style.display='none';
  };
}

// 8) Kategori linklerini hazırla
function setupCategories() {
  document.querySelectorAll('[data-category]').forEach(el=>{
    el.onclick = e=>{
      e.preventDefault();
      loadCategory(el.dataset.category);
    };
  });
}

// 9) Başlat
document.addEventListener('DOMContentLoaded', ()=>{
  startCountdown();
  setupFilters();
  renderAnswers();
  setupCommentModal();
  setupAuthForm();
  setupCategories();
});
