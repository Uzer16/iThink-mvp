// ============================================
// 0) Firebase Auth import & başlatma
// ============================================
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, user => {
  console.log("Auth durum:", user);
});

// ============================================
// 1) Cevap verisi & filtre durumu
// ============================================
const answersData = [
  { text: 'Tavanda zıplıyor.',   daily: 24, weekly: 44, monthly: 70, yearly: 320 },
  { text: 'Kedi kostümü giyer.',  daily: 18, weekly: 33, monthly: 60, yearly: 210 },
  { text: 'Telefona gömülür.',    daily: 12, weekly: 26, monthly: 50, yearly: 118 }
];
let currentFilter = 'daily';

// ============================================
// 2) Cevap listesini render et
// ============================================
function renderAnswers() {
  const list = document.getElementById('answers-list');
  list.innerHTML = '';
  answersData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;

    const span = document.createElement('span');
    span.className = 'votes';
    span.textContent = `😂 ${ item[currentFilter] }`;
    span.addEventListener('click', () => {
      item[currentFilter]++;
      renderAnswers();
    });

    li.appendChild(span);
    list.appendChild(li);
  });
}

// ============================================
// 3) Geri sayım (gün sonuna kadar)
// ============================================
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

// ============================================
// 4) Filtre butonları
// ============================================
function setupFilters() {
  const buttons = document.querySelectorAll('.filters button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const txt = btn.textContent.trim();
      if      (txt === 'Günlük')   currentFilter = 'daily';
      else if (txt === 'Haftalık') currentFilter = 'weekly';
      else if (txt === 'Aylık')    currentFilter = 'monthly';
      else if (txt === 'Yıllık')   currentFilter = 'yearly';
      renderAnswers();
    });
  });
}

// ============================================
// 5) Yeni yorum modal’i
// ============================================
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
    answersData.push({ text, daily:0, weekly:0, monthly:0, yearly:0 });
    modal.style.display = 'none';
    renderAnswers();
  });
}

// ============================================
// 6) Auth (Giriş) modal’i
// ============================================
function setupAuthForm() {
  const navAuth   = document.getElementById('nav-auth');
  const modal     = document.getElementById('auth-modal');
  const btnClose  = document.getElementById('auth-close');
  const emailIn   = document.getElementById('email');
  const passIn    = document.getElementById('password');
  const loginBtn  = document.getElementById('login-btn');

  // Modal aç/kapa
  navAuth.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'flex';
  });
  btnClose.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Giriş yap
  loginBtn.addEventListener('click', async e => {
    e.preventDefault();
    const email = emailIn.value.trim();
    const pass  = passIn.value.trim();
    if (!email || !pass) {
      return alert('Lütfen e-posta ve şifre girin.');
    }
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) {
      return alert('Lütfen geçerli bir e-posta girin.');
    }
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      alert('Giriş başarılı!');
      modal.style.display = 'none';
    } catch(err) {
      alert('Giriş hatası: ' + err.message);
    }
  });
}

// ============================================
// 7) Uygulamayı başlat
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setupFilters();
  renderAnswers();
  setupCommentModal();
  setupAuthForm();
});
