// 0) Kategoriler ve sorular verisi
const categories = [
  { key:'ask',       label:'Aşk',         question:'Romantik bir buluşmada…?',
    answers:['Gül dalında uyudu.','Kalbe mum yakardı.','Kalpten kalbe şalter atardı.']
  },
  { key:'cinevizyon',label:'Cinevizyon',  question:'Sinema salonunda…?',
    answers:['Patlamış mısırı piyano yaptı.','Film afişini dans ettirdi.','Projeksiyona stand-up yaptı.']
  },
  { key:'siyaset',   label:'Siyaset',     question:'Siyasetçi muhalifine…?',
    answers:['Atkı fırlattı.','Projeyi tweetledi.','Kabineyi çay partisine davet etti.']
  },
  { key:'spor',      label:'Spor',        question:'Futbol takımın maçında…?',
    answers:['Kramponunu uçurdu.','Takımı soyunma odasına kitletti.','Tribünleri disco yaptı.']
  },
  { key:'tarih',     label:'Tarih',       question:'Tarihte ilk…?',
    answers:['Taş devrinde fotoğraf çekti.','Piramitleri tik-tok’ladı.','Antik mezarı karaoke stüdyosuna çevirdi.']
  },
  { key:'teknoloji', label:'Teknoloji',   question:'Yapay zeka…?',
    answers:['Klavyeyi robot yaptı.','Beyni wifi’ye bağladı.','Drone’a salsa dansı öğretti.']
  }
];

// 1) Kategori listesini doldur
function setupCategories() {
  const ul = document.getElementById('category-list');
  categories.forEach(cat => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href = '#'; a.textContent = cat.label;
    a.onclick = e => { e.preventDefault(); selectCategory(cat.key); };
    li.append(a);
    ul.append(li);
  });
}

// 2) Kategori seçildiğinde
let answersData = [];
let currentFilter = 'daily';
function selectCategory(key) {
  // Hero’yu gizle
  document.getElementById('category-select').style.display = 'none';
  // Kategori bilgisi
  const cat = categories.find(c=>c.key===key);
  // Günün sorusu güncelle
  document.getElementById('question-title').textContent = `“${cat.label.toUpperCase()}” SORUSU`;
  document.getElementById('question-text').textContent  = cat.question;
  // Cevap verilerini yenile
  answersData = cat.answers.map(txt=>({ text:txt, daily:0, weekly:0, monthly:0, yearly:0 }));
  renderAnswers();
  // Bölümleri göster
  document.getElementById('question-card').style.display = '';
  document.getElementById('filters').style.display       = '';
  document.getElementById('answers').style.display       = '';
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
    span.onclick = () => { item[currentFilter]++; renderAnswers(); };
    li.append(span);
    ul.append(li);
  });
}

// 4) Geri sayım (gün sonuna kadar)
function startCountdown() {
  const display = document.getElementById('countdown');
  function update() {
    const now = new Date(), end = new Date(now);
    end.setHours(24,0,0,0);
    const diff = end - now;
    const h = String(Math.floor(diff/3600000)).padStart(2,'0'),
          m = String(Math.floor((diff%3600000)/60000)).padStart(2,'0'),
          s = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
    display.textContent = `${h}:${m}:${s}`;
  }
  update(); setInterval(update,1000);
}

// 5) Filtre butonları
function setupFilters() {
  document.querySelectorAll('#filters button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#filters button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.textContent.trim();
      currentFilter = t==='Günlük'?'daily': t==='Haftalık'?'weekly': t==='Aylık'?'monthly':'yearly';
      renderAnswers();
    };
  });
}

// 6) Yorum modal’i
function setupCommentModal() {
  const modal = document.getElementById('comment-modal');
  const open  = document.getElementById('answer-btn');
  const close = document.getElementById('modal-close');
  const send  = document.getElementById('submit-comment');
  const ta    = document.getElementById('new-comment');
  open.onclick  = ()=>{ ta.value=''; modal.style.display='flex'; };
  close.onclick = ()=> modal.style.display='none';
  modal.onclick = e=>{ if(e.target===modal) modal.style.display='none'; };
  send.onclick = ()=>{
    const txt = ta.value.trim();
    if(!txt) return alert('Lütfen bir yorum yazın!');
    answersData.push({ text: txt, daily:0, weekly:0, monthly:0, yearly:0 });
    modal.style.display = 'none'; renderAnswers();
  };
}

// 7) Auth modal’i
function setupAuthForm() {
  const nav   = document.getElementById('nav-auth');
  const modal = document.getElementById('auth-modal');
  const close = document.getElementById('auth-close');
  const email = document.getElementById('email');
  const pass  = document.getElementById('password');
  const btn   = document.getElementById('login-btn');
  nav.onclick = e=>{ e.preventDefault(); modal.style.display='flex'; };
  close.onclick = ()=> modal.style.display='none';
  modal.onclick = e=>{ if(e.target===modal) modal.style.display='none'; };
  btn.onclick = e=>{
    e.preventDefault();
    if(!email.value||!pass.value) return alert('Lütfen e-posta ve şifre girin.');
    alert('Giriş başarılı! (Simülasyon)');
    modal.style.display = 'none';
  };
}

// 8) Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', ()=>{
  setupCategories();
  startCountdown();
  setupFilters();
  setupCommentModal();
  setupAuthForm();
  // Başlangıçta soru ve listeyi gizle
  document.getElementById('question-card').style.display = 'none';
  document.getElementById('filters').style.display       = 'none';
  document.getElementById('answers').style.display       = 'none';
});
