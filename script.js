// Kategori verisi
const categoryData = {
  ask: {
    question: 'Patronunuz öğle arasında…?',
    answers: [
      { text:'Tavanda zıplıyor.', daily:24, weekly:44, monthly:70, yearly:320 },
      { text:'Kedi kostümü giyer.', daily:18, weekly:33, monthly:60, yearly:210 },
      { text:'Telefona gömülür.',   daily:12, weekly:26, monthly:50, yearly:118 }
    ]
  },
  cinevizyon: {
    question: 'En garip film sahnesi…?',
    answers: [
      { text:'Zombi horoz kovalar.', daily:5, weekly:12, monthly:30, yearly:80 },
      { text:'Penguen uzayda kayıyor.', daily:8, weekly:20, monthly:45, yearly:120 },
      { text:'Patlayan köpük mermi olur.', daily:3, weekly:7, monthly:20, yearly:50 }
    ]
  },
  siyaset: {
    question: 'Siyasette en komik an…?',
    answers: [
      { text:'Mikrofon çiğnendi.', daily:2, weekly:5, monthly:15, yearly:40 },
      { text:'Konuşma yerine şiir okundu.', daily:4, weekly:9, monthly:22, yearly:60 },
      { text:'Konuk DJ oldu.', daily:1, weekly:3, monthly:10, yearly:25 }
    ]
  },
  spor: {
    question: 'Tribünde ilginç ne gördünüz…?',
    answers: [
      { text:'Yoğurt çubuğu dalgalandı.', daily:6, weekly:14, monthly:32, yearly:90 },
      { text:'Maskot yarış yaptı.', daily:5, weekly:11, monthly:28, yearly:75 },
      { text:'Sahaya salyangoz salındı.', daily:3, weekly:8, monthly:20, yearly:50 }
    ]
  },
  tarih: {
    question: 'Tarihte en absürt olay…?',
    answers: [
      { text:'Papirüs selfie’si çekildi.', daily:4, weekly:10, monthly:25, yearly:65 },
      { text:'Romalı lejyoner kâğıt uçak uçurdu.', daily:2, weekly:5, monthly:15, yearly:40 },
      { text:'Antik heykel break-dance yaptı.', daily:3, weekly:7, monthly:18, yearly:45 }
    ]
  },
  teknoloji: {
    question: 'En tuhaf buluş…?',
    answers: [
      { text:'Uçan tost makinesi.', daily:6, weekly:13, monthly:30, yearly:85 },
      { text:'Selfie çeken buzdolabı.', daily:5, weekly:11, monthly:28, yearly:75 },
      { text:'Robo-pet duş aldırıyor.', daily:4, weekly:9, monthly:22, yearly:60 }
    ]
  }
};

// URL’den kategori parametresi al
const params = new URLSearchParams(window.location.search);
const cat = params.get('cat');

let answersData = [], currentFilter = 'daily';

// Sayfa açılınca
document.addEventListener('DOMContentLoaded', () => {
  const hero       = document.getElementById('hero');
  const interactive = document.getElementById('interactive-area');

  if (!cat || !categoryData[cat]) {
    // ANASAYFA: sadece hero göster
    hero.classList.remove('hide');
    interactive.classList.add('hide');
    return;
  }

  // KATEGORİ SAYFASI: hero gizle, interaktif göster
  hero.classList.add('hide');
  interactive.classList.remove('hide');

  // kategori verisini yükle
  const data = categoryData[cat];
  document.getElementById('question-text').textContent = data.question;
  answersData = data.answers;

  // başlık olarak “GÜNÜN SORUSU” yerine kategori adı da yazılabilir:
  document.getElementById('question-title').textContent = `”${data.question}"`;

  // geriye kalan fonksiyonları başlat
  startCountdown();
  setupFilters();
  renderAnswers();
  setupCommentModal();
  setupAuthForm();
});


// --- aşağıdakiler yukarıdakiyle birebir ---

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

function startCountdown() {
  const display = document.getElementById('countdown');
  function update() {
    const now = new Date(),
          mid = new Date(now);
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

function setupFilters() {
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));
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

function setupCommentModal() {
  const modal = document.getElementById('comment-modal'),
        open  = document.getElementById('answer-btn'),
        close = document.getElementById('modal-close'),
        send  = document.getElementById('submit-comment'),
        ta    = document.getElementById('new-comment');

  open.onclick  = ()=>{ ta.value=''; modal.style.display='flex'; };
  close.onclick = ()=> modal.style.display='none';
  modal.onclick = e=>{ if(e.target===modal) modal.style.display='none'; };
  send.onclick  = ()=>{
    const txt = ta.value.trim();
    if(!txt) return alert('Lütfen bir yorum yazın!');
    answersData.push({ text:txt, daily:0, weekly:0, monthly:0, yearly:0 });
    modal.style.display='none';
    renderAnswers();
  };
}

function setupAuthForm() {
  const nav   = document.getElementById('nav-auth'),
        modal = document.getElementById('auth-modal'),
        close = document.getElementById('auth-close'),
        em    = document.getElementById('email'),
        pw    = document.getElementById('password'),
        btn   = document.getElementById('login-btn');

  nav.onclick = e=>{ e.preventDefault(); modal.style.display='flex'; };
  close.onclick = ()=> modal.style.display='none';
  modal.onclick = e=>{ if(e.target===modal) modal.style.display='none'; };
  btn.onclick = e=>{
    e.preventDefault();
    if(!em.value||!pw.value) return alert('Lütfen e-posta ve şifre girin.');
    alert('Giriş simülasyonu başarılı!');
    modal.style.display='none';
  };
}
