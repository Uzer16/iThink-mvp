// script.js
// Firebase Auth fonksiyonlarını import edin
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Auth örneğini alın (index.html içinde initializeApp ile başlatılan app'i kullanır)
const auth = getAuth();

// 1) Başlangıç verisi (4 periyot için)
const answersData = [
  { text: 'Tavanda zıplıyor.',   daily: 24, weekly: 44, monthly: 70, yearly: 320 },
  { text: 'Kedi kostümü giyer.',  daily: 18, weekly: 33, monthly: 60, yearly: 210 },
  { text: 'Telefona gömülür.',    daily: 12, weekly: 26, monthly: 50, yearly: 118 }
];
let currentFilter = 'daily';

// 2) Cevap listesini render et
function renderAnswers() {
  const list = document.getElementById('answers-list');
  list.innerHTML = '';
  answersData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;

    const span = document.createElement('span');
    span.className = 'votes';
    span.textContent = `😂 ${item[currentFilter]}`;
    span.addEventListener('click', () => {
      // oy artırma
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
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const txt = btn.textContent.trim();
      if      (txt === 'Günlük')  currentFilter = 'daily';
      else if (txt === 'Haftalık') currentFilter = 'weekly';
      else if (txt === 'Aylık')    currentFilter = 'monthly';
      else if (txt === 'Yıllık')   currentFilter = 'yearly';

      renderAnswers();
    });
  });
}

// 5) Yeni yorum modal’ı
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
    answersData.push({
      text:    text,
      daily:   0,
      weekly:  0,
      monthly: 0,
      yearly:  0
    });
    modal.style.display = 'none';
    renderAnswers();
  });
}

// 6) Auth modal’ı (Giriş/Kayıt)
function setupAuthModal() {
  const navAuth   = document.getElementById('nav-auth');
  const authModal = document.getElementById('auth-modal');
  const authClose = document.getElementById('auth-close');

  navAuth.addEventListener('click', e => {
    e.preventDefault();
    authModal.style.display = 'flex';
  });
  authClose.addEventListener('click', () => authModal.style.display = 'none');
  authModal.addEventListener('click', e => {
    if (e.target === authModal) authModal.style.display = 'none';
  });
}

// 7) Giriş ve Kayıt işlemleri
function setupAuthForm() {
  const emailIn  = document.getElementById('email');
  const passIn   = document.getElementById('password');
  const loginBtn = document.getElementById('login-btn');
  const regBtn   = document.getElementById('register-btn');

  loginBtn.addEventListener('click', async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailIn.value, passIn.value);
      alert('Giriş başarılı!');
      document.getElementById('auth-modal').style.display = 'none';
    } catch(err) {
      alert('Giriş hatası: ' + err.message);
    }
  });

  regBtn.addEventListener('click', async e => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, emailIn.value, passIn.value);
      alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
    } catch(err) {
      alert('Kayıt hatası: ' + err.message);
    }
  });

  // Opsiyonel: giriş durumu değiştiğinde konsola yazdır
  onAuthStateChanged(auth, user => {
    console.log('Auth durumu:', user);
  });
}

// 8) Sayfa hazır olduğunda hepsini başlat
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setupFilters();
  renderAnswers();
  setupCommentModal();
  setupAuthModal();
  setupAuthForm();
});
