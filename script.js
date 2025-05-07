// kategoriye özel sorular ve cevaplar
const categoryData = {
  ask: {
    question: "Aşkın en ABZÜRT hali sizce nedir?",
    answers: [
      { text: "Sevgilime pizza siparişi atmak", daily:5, weekly:12, monthly:20, yearly:100 },
      { text: "Günde 100 kere 'seni seviyorum' demek", daily:8, weekly:20, monthly:30, yearly:200 }
    ]
  },
  cinevizyon: {
    question: "En ABZÜRT film fikri ne olurdu?",
    answers: [
      { text: "Uzayda halı secimi yapan kahramanlar", daily:3, weekly:8, monthly:15, yearly:80 },
      { text: "Şarap kavgası turnuvası", daily:2, weekly:5, monthly:10, yearly:50 }
    ]
  },
  siyaset: {
    question: "Siyasette yaptığınız en ABZÜRT vaat nedir?",
    answers: [
      { text: "Herkese bedava dondurma", daily:7, weekly:15, monthly:25, yearly:120 },
      { text: "Günde 3 saat şekerleme hakkı", daily:4, weekly:10, monthly:18, yearly:90 }
    ]
  },
  spor: {
    question: "Sporun en ABZÜRT kuralları neler olurdu?",
    answers: [
      { text: "Top yerine balon kullanmak", daily:6, weekly:14, monthly:22, yearly:110 },
      { text: "Şut yerine dans etme puanı", daily:5, weekly:11, monthly:19, yearly:95 }
    ]
  },
  tarih: {
    question: "Geçmişte hangi ABZÜRT icadı görmek isterdiniz?",
    answers: [
      { text: "Zamanda yolculuk yapan kahve makinesi", daily:2, weekly:6, monthly:12, yearly:60 },
      { text: "Dinozor gezdirme servisi", daily:3, weekly:7, monthly:14, yearly:70 }
    ]
  },
  teknoloji: {
    question: "Teknolojideki en ABZÜRT yenilik ne olurdu?",
    answers: [
      { text: "Düşünceyle pizza siparişi", daily:9, weekly:18, monthly:28, yearly:140 },
      { text: "Uyku yapay zekası", daily:4, weekly:9, monthly:16, yearly:85 }
    ]
  }
};

let currentFilter = 'daily';
let currentCategory = null;
let answersData = [];

// 1) kategori menüsü
function setupCategoryMenu() {
  document.querySelectorAll('.category').forEach(a=>{
    a.onclick = e => {
      e.preventDefault();
      currentCategory = a.dataset.category;
      const data = categoryData[currentCategory];
      // soru ve cevap verilerini yükle
      document.getElementById('question-text').textContent = data.question;
      answersData = JSON.parse(JSON.stringify(data.answers));
      // görünürlük
      document.getElementById('hero-container').classList.add('hidden');
      document.getElementById('poll-container').classList.remove('hidden');
      // başlat
      renderAnswers();
      startCountdown();
    };
  });
  // ana sayfa linki
  document.getElementById('home-link').onclick = e => {
    e.preventDefault();
    document.getElementById('poll-container').classList.add('hidden');
    document.getElementById('hero-container').classList.remove('hidden');
  };
}

// 2) Cevap listesini render et
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
      item[currentFilter]++; renderAnswers();
    };
    li.append(span); ul.append(li);
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
  update(); clearInterval(window._countdown);
  window._countdown = setInterval(update,1000);
}

// 4) filtre butonları
function setupFilters() {
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.textContent.trim();
      currentFilter = t==='Günlük'?'daily': t==='Haftalık'?'weekly': t==='Aylık'?'monthly':'yearly';
      renderAnswers();
    };
  });
}

// 5) yorum modal
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

// 6) auth modal
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
    if(!em.value||!pw.value) return alert('Lütfen e-posta ve şifre girin.');
    alert('Giriş simülasyonu başarılı!');
    modal.style.display='none';
  };
}

// 7) başlat
document.addEventListener('DOMContentLoaded', () => {
  setupCategoryMenu();
  setupFilters();
  setupCommentModal();
  setupAuthForm();
});
