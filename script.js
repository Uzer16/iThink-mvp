// Firebase + Auth setup
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, user => console.log("Auth durum:", user));

// Initial data & filter state
const answersData = [
  { text: 'Tavanda zıplıyor.', daily:24, weekly:44, monthly:70, yearly:320 },
  { text: 'Kedi kostümü giyer.',  daily:18, weekly:33, monthly:60, yearly:210 },
  { text: 'Telefona gömülür.',    daily:12, weekly:26, monthly:50, yearly:118 }
];
let currentFilter = 'daily';

// Render answers list
function renderAnswers() {
  const list = document.getElementById('answers-list');
  list.innerHTML = '';
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
    li.appendChild(span);
    list.appendChild(li);
  });
}

// Countdown to midnight
function startCountdown() {
  const disp = document.getElementById('countdown');
  const update = () => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(24,0,0,0);
    let diff = end - now;
    const h = String(Math.floor(diff/3600000)).padStart(2,'0');
    diff %= 3600000;
    const m = String(Math.floor(diff/60000)).padStart(2,'0');
    const s = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
    disp.textContent = `${h}:${m}:${s}`;
  };
  update();
  setInterval(update, 1000);
}

// Filter buttons logic
function setupFilters() {
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const txt = btn.textContent.trim();
      currentFilter = txt === 'Günlük'
        ? 'daily'
        : txt === 'Haftalık'
        ? 'weekly'
        : txt === 'Aylık'
        ? 'monthly'
        : 'yearly';
      renderAnswers();
    };
  });
}

// Comment modal logic
function setupCommentModal() {
  const modal = document.getElementById('comment-modal');
  const open  = document.getElementById('answer-btn');
  const close = modal.querySelector('.modal-close');
  const submit= document.getElementById('submit-comment');
  const ta    = document.getElementById('new-comment');

  open.onclick = () => { ta.value=''; modal.style.display='flex'; };
  close.onclick= () => modal.style.display='none';
  modal.onclick= e => e.target===modal && (modal.style.display='none');
  submit.onclick= () => {
    const v = ta.value.trim();
    if (!v) return alert('Lütfen bir yorum yazın!');
    answersData.push({ text:v, daily:0, weekly:0, monthly:0, yearly:0 });
    modal.style.display='none';
    renderAnswers();
  };
}

// Auth modal logic
function setupAuthForm() {
  const nav   = document.getElementById('nav-auth');
  const modal = document.getElementById('auth-modal');
  const close = modal.querySelector('.modal-close');
  const email = document.getElementById('email');
  const pw    = document.getElementById('password');
  const btn   = document.getElementById('login-btn');

  nav.onclick    = e => { e.preventDefault(); modal.style.display='flex'; };
  close.onclick  = () => modal.style.display='none';
  modal.onclick  = e => e.target===modal && (modal.style.display='none');
  btn.onclick    = async e => {
    e.preventDefault();
    if (!email.value || !pw.value) return alert('Lütfen e-posta ve şifre girin.');
    try {
      await signInWithEmailAndPassword(auth, email.value, pw.value);
      alert('Giriş başarılı!');
      modal.style.display='none';
    } catch(err) {
      alert('Giriş hatası: ' + err.message);
    }
  };
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setupFilters();
  renderAnswers();
  setupCommentModal();
  setupAuthForm();
});
