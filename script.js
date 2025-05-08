// 0) Sayfa tipini kontrol et
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');               // ?cat=ask vs. ana sayfa
  const hero = document.getElementById('hero');
  const main = document.getElementById('main-content');

  if (cat) {
    hero.style.display = 'none';
    main.style.display = 'block';
    // isteğe bağlı: kategoriye göre soru metni
    const qtext = {
      ask: 'Sevdiğin kişiye nasıl süpriz yaparsın?',
      cine: 'En komik film sahnesi hangisidir?',
      siyaset: 'Politikacıların en ABZÜRT repliği nedir?',
      spor: 'Maçta en absürd gol nasıl olur?',
      tarih: 'Tarihteki en tuhaf icat hangisidir?',
      tech: 'Gelecekte hangi çılgın teknoloji olur?'
    }[cat] || 'Patronunuz öğle arasında…?';
    document.getElementById('question-text').textContent = qtext;
  } else {
    hero.style.display = 'block';
    main.style.display = 'none';
  }

  if (cat) {
    startCountdown();
    setupFilters();
    renderAnswers();
    setupCommentModal();
  }
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
