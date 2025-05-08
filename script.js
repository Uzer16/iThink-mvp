// 0) Kategoriler ve sorular verisi
const categories = [
  { key:'ask',     label:'Aşk',
    question:'Romantik bir buluşmada…?',
    answers:['Gül dalında uyudu.','Kalbe mum yakardı.','Kalpten kalbe şalter atardı.']
  },
  { key:'siyaset', label:'Siyaset',
    question:'Siyasetçi muhalifine…?',
    answers:['Atkı fırlattı.','Projeyi tweetledi.','Kabineyi çay partisine davet etti.']
  },
  { key:'spor',    label:'Spor',
    question:'Futbol takımın maçında…?',
    answers:['Kramponunu uçurdu.','Takımı soyunma odasına kitletti.','Tribünleri disco yaptı.']
  },
  // istediğiniz diğer kategorileri de buraya ekleyin
];

// 1) Kategori listesini doldur
function setupCategories() {
  const ul = document.getElementById('category-list');
  categories.forEach(cat=>{
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href = '#';
    a.textContent = cat.label;
    a.onclick = e=>{
      e.preventDefault();
      selectCategory(cat.key);
    };
    li.append(a);
    ul.append(li);
  });
}

// 2) Kategori seçildiğinde
function selectCategory(key) {
  // 2.a) Hero görseli gizle
  document.getElementById('category-select').style.display = 'none';

  // 2.b) Günün sorusunu ve cevapları göster
  const cat = categories.find(c=>c.key===key);
  document.getElementById('question-text').textContent = cat.question;
  // Varsayılan başlık
  document.getElementById('question-title').textContent = `“${cat.label.toUpperCase()}” SORUSU`;

  // Mevcut cevaplarData’yı resetle
  answersData.length = 0;
  cat.answers.forEach(txt=>{
    answersData.push({ text:txt, daily:0, weekly:0, monthly:0, yearly:0 });
  });
  renderAnswers();

  // tüm bölümleri görünür yap
  ['question-card','filters','answers-list','answers'].forEach(id=>{
    const el = document.getElementById(id) || document.querySelector(`.${id}`);
    if(el) el.style.display = '';
  });
}

// 3) Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', ()=>{
  setupCategories();
  // başlangıçta hero’yu göster, diğerlerini gizle
  document.getElementById('category-select').style.display = '';
  ['question-card','filters', 'answers', 'actions'].forEach(sel=>{
    document.querySelector(sel).style.display = 'none';
  });

  // önceki setup’lar
  setupFilters();
  setupCommentModal();
  setupAuthForm();
});


// 1) Başlangıç verisi & filtre durumu
const answersData = [
  { text: 'Tavanda zıplıyor.', daily:24, weekly:44, monthly:70, yearly:320 },
  { text: 'Kedi kostümü giyer.',  daily:18, weekly:33, monthly:60, yearly:210 },
  { text: 'Telefona gömülür.',    daily:12, weekly:26, monthly:50, yearly:118 }
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
    span.textContent = `😂 ${item[currentFilter]}`;
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
  const d = document.getElementById('countdown');
  function u() {
    const n=new Date(), m=new Date(n);
    m.setHours(24,0,0,0);
    const diff = m-n;
    const h=String(Math.floor(diff/3600000)).padStart(2,'0'),
          mm=String(Math.floor((diff%3600000)/60000)).padStart(2,'0'),
          s=String(Math.floor((diff%60000)/1000)).padStart(2,'0');
    d.textContent = `${h}:${mm}:${s}`;
  }
  u(); setInterval(u,1000);
}

// 4) Filtre butonları
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

// 5) Yorum modal’i
function setupCommentModal() {
  const modal = document.getElementById('comment-modal');
  const o = document.getElementById('answer-btn'),
        c = document.getElementById('modal-close'),
        s = document.getElementById('submit-comment'),
        ta= document.getElementById('new-comment');
  o.onclick = ()=>{ ta.value=''; modal.style.display='flex'; };
  c.onclick = ()=> modal.style.display='none';
  modal.onclick = e=>{ if(e.target===modal) modal.style.display='none'; };
  s.onclick = ()=>{
    const t=ta.value.trim();
    if(!t) return alert('Lütfen bir yorum yazın!');
    answersData.push({ text:t, daily:0, weekly:0, monthly:0, yearly:0 });
    modal.style.display='none';
    renderAnswers();
  };
}

// 6) Auth modal’i
function setupAuthForm() {
  const nav = document.getElementById('nav-auth'),
        modal = document.getElementById('auth-modal'),
        c = document.getElementById('auth-close'),
        e = document.getElementById('email'),
        p = document.getElementById('password'),
        l = document.getElementById('login-btn');
  nav.onclick = ev=>{ ev.preventDefault(); modal.style.display='flex'; };
  c.onclick   = ()=> modal.style.display='none';
  modal.onclick = ev=>{ if(ev.target===modal) modal.style.display='none'; };
  l.onclick   = ev=>{
    ev.preventDefault();
    if(!e.value||!p.value) return alert('Lütfen e-posta ve şifre girin.');
    alert('Giriş başarılı! (Simülasyon)');
    modal.style.display='none';
  };
}
