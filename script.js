// 1) Başlangıç verisi (4 periyot için)
// — Auth referansını al (Firebase snippet içindeki app ve auth)
// const auth = getAuth(app);  // zaten import ettiğin satır

const answersData = [
  { text: 'Tavanda zıplıyor.',   daily: 24, weekly: 44, monthly: 70, yearly: 320 },
  { text: 'Kedi kostümü giyer.',  daily: 18, weekly: 33, monthly: 60, yearly: 210 },
  { text: 'Telefona gömülür.',    daily: 12, weekly: 26, monthly: 50, yearly: 118 }
];
// başlangıç filtresi
let currentFilter = 'daily';


// 2) Listeyi render et
function renderAnswers() {
  const list = document.getElementById('answers-list');
  list.innerHTML = '';
  answersData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;

    const span = document.createElement('span');
    span.className = 'votes';
    // currentFilter => daily|weekly|monthly|yearly
    span.textContent = `😂 ${item[currentFilter]}`;
    // oy arttırma
    span.addEventListener('click', () => {
      item[currentFilter]++;
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
  setInterval(update, 1000);
}


// 4) Filtre butonları
function setupFilters() {
  const buttons = document.querySelectorAll('.filters button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // önce hepsinden active kaldır
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // buton metnini filtre anahtarına çevir
      const txt = btn.textContent.trim();
      if      (txt === 'Günlük')   currentFilter = 'daily';
      else if (txt === 'Haftalık') currentFilter = 'weekly';
      else if (txt === 'Aylık')    currentFilter = 'monthly';
      else if (txt === 'Yıllık')   currentFilter = 'yearly';
      renderAnswers();
    });
  });
}


// 5) Modal mantığı ve yeni yorum ekleme
function setupCommentModal() {
  const modal     = document.getElementById('comment-modal');
  const btnOpen   = document.getElementById('answer-btn');
  const btnClose  = document.getElementById('modal-close');
  const btnSubmit = document.getElementById('submit-comment');
  const textarea  = document.getElementById('new-comment');

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
    // yeni cevabı 0’dan başlat
    answersData.push({
      text: text,
      daily:   0,
      weekly:  0,
      monthly: 0,
      yearly:  0
    });
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
  setupAuthForm();    // ← buraya ekle
});

  // 7) Giriş & Kayıt işlemleri
function setupAuthForm() {
  const form     = document.getElementById('auth-form');
  const emailIn  = document.getElementById('email');
  const passIn   = document.getElementById('password');
  const loginBtn = document.getElementById('login-btn');
  const regBtn   = document.getElementById('register-btn');

  // Giriş
  loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,
        emailIn.value, passIn.value);
      alert('Giriş başarılı!');
    } catch(err) {
      alert('Giriş hatası: ' + err.message);
    }
  });

  // Kayıt
  regBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth,
        emailIn.value, passIn.value);
      alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
    } catch(err) {
      alert('Kayıt hatası: ' + err.message);
    }
  });
}

});
