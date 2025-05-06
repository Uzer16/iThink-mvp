// kategoriye göre soru+cevap verisi
const categoryData = {
  "default": {
    question: "Patronunuz öğle arasında…?",
    answers: [
      { text: "Tavanda zıplıyor.",   daily:24, weekly:44, monthly:70, yearly:320 },
      { text: "Kedi kostümü giyer.",  daily:18, weekly:33, monthly:60, yearly:210 },
      { text: "Telefona gömülür.",    daily:12, weekly:26, monthly:50, yearly:118 }
    ]
  },
  "Aşk": {
    question: "Aşk kategorisi: En romantik jest hangisidir?",
    answers: [
      { text: "Çiçek almak.", daily:0, weekly:0, monthly:0, yearly:0 },
      { text: "Şiir yazmak.", daily:0, weekly:0, monthly:0, yearly:0 },
      { text: "Sürpriz yapmak.", daily:0, weekly:0, monthly:0, yearly:0 }
    ]
  },
  "Cinevizyon": {
    question: "Cinevizyon: Favori film türünüz nedir?",
    answers: [
      { text: "Aksiyon", daily:0, weekly:0, monthly:0, yearly:0 },
      { text: "Komedi",  daily:0, weekly:0, monthly:0, yearly:0 },
      { text: "Drama",   daily:0, weekly:0, monthly:0, yearly:0 }
    ]
  },
  "Siyaset": {
    question: "Siyaset: Etkili protesto yöntemi hangisi?",
    answers: [
      { text: "Miting",   daily:0, weekly:0, monthly:0, yearly:0 },
      { text: "İmza kampanyası", daily:0, weekly:0, monthly:0, yearly:0 },
      { text: "Sosyal medya", daily:0, weekly:0, monthly:0, yearly:0 }
    ]
  },
  "Spor": {
    question: "Spor: En sevdiğiniz spor dalı?",
    answers: [
      { text: "Futbol", daily:0, weekly:0, monthly:0, yearly:0 },
      { text: "Basketbol", daily:0, weekly:0, monthly:0, yearly:0 },
      { text: "Yüzme", daily:0, weekly:0, monthly:0, yearly:0 }
    ]
  },
  "Tarih": {
    question: "Tarih: En etkileyici tarihi dönem?",
    answers: [
      { text: "Antik Yunan", daily:0, weekly:0, monthly:0, yearly:0 },
      { text: "Orta Çağ",   daily:0, weekly:0, monthly:0, yearly:0 },
      { text: "Rönesans",   daily:0, weekly:0, monthly:0, yearly:0 }
    ]
  },
  "Teknoloji": {
    question: "Teknoloji: Günlük yaşamı en çok kolaylaştıran teknoloji?",
    answers: [
      { text: "Akıllı telefon", daily:0, weekly:0, monthly:0, yearly:0 },
      { text: "İnternet",        daily:0, weekly:0, monthly:0, yearly:0 },
      { text: "Yapay zeka",      daily:0, weekly:0, monthly:0, yearly:0 }
    ]
  }
};

let currentCategory = "default";
let currentFilter   = "daily";

// DOM elemanları
const qText   = document.getElementById("question-text");
const answersUl = document.getElementById("answers-list");

// kategoriyi yükle: soru ve cevapları set et
function loadCategory(cat) {
  currentCategory = cat;
  const data = categoryData[cat] || categoryData["default"];
  qText.textContent = data.question;
  renderAnswers();
}

// cevapları render et
function renderAnswers() {
  const data = categoryData[currentCategory] || categoryData["default"];
  answersUl.innerHTML = "";
  data.answers.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.text;
    const span = document.createElement("span");
    span.className = "votes";
    span.textContent = `😂 ${ item[currentFilter] }`;
    span.onclick = () => {
      item[currentFilter]++;
      renderAnswers();
    };
    li.appendChild(span);
    answersUl.appendChild(li);
  });
}

// geri sayım
function startCountdown() {
  const display = document.getElementById("countdown");
  function update() {
    const now = new Date(),
          mid = new Date(now);
    mid.setHours(24,0,0,0);
    const diff = mid - now;
    const h = String(Math.floor(diff/3600000)).padStart(2,"0"),
          m = String(Math.floor((diff%3600000)/60000)).padStart(2,"0"),
          s = String(Math.floor((diff%60000)/1000)).padStart(2,"0");
    display.textContent = `${h}:${m}:${s}`;
  }
  update();
  setInterval(update,1000);
}

// filtre butonları
function setupFilters() {
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const t = btn.textContent.trim();
      currentFilter = t==="Günlük" ? "daily"
                   : t==="Haftalık"? "weekly"
                   : t==="Aylık"   ? "monthly"
                   : "yearly";
      renderAnswers();
    };
  });
}

// yorum modal
function setupCommentModal() {
  const modal = document.getElementById("comment-modal"),
        o     = document.getElementById("answer-btn"),
        c     = document.getElementById("modal-close"),
        s     = document.getElementById("submit-comment"),
        ta    = document.getElementById("new-comment");
  o.onclick = ()=> { ta.value=""; modal.style.display="flex"; };
  c.onclick = ()=> modal.style.display="none";
  modal.onclick = e=> { if(e.target===modal) modal.style.display="none"; };
  s.onclick = ()=> {
    const txt = ta.value.trim();
    if(!txt) return alert("Lütfen bir yorum yazın!");
    categoryData[currentCategory].answers.push({
      text: txt, daily:0, weekly:0, monthly:0, yearly:0
    });
    modal.style.display="none";
    renderAnswers();
  };
}

// auth modal (simülasyon)
function setupAuthForm() {
  const nav   = document.getElementById("nav-auth"),
        modal = document.getElementById("auth-modal"),
        c     = document.getElementById("auth-close"),
        em    = document.getElementById("email"),
        pw    = document.getElementById("password"),
        btn   = document.getElementById("login-btn");
  nav.onclick = e=>{ e.preventDefault(); modal.style.display="flex"; };
  c.onclick   = ()=> modal.style.display="none";
  modal.onclick = e=>{ if(e.target===modal) modal.style.display="none"; };
  btn.onclick = e=>{
    e.preventDefault();
    if(!em.value||!pw.value) return alert("Lütfen e-posta ve şifre girin.");
    alert("Giriş başarılı! (Simülasyon)");
    modal.style.display="none";
  };
}

// kategori menüsüne tıklama
function setupCategories() {
  document.querySelectorAll(".category").forEach(a=>{
    a.onclick = e=>{
      e.preventDefault();
      loadCategory(a.dataset.cat);
    };
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  loadCategory("default");
  startCountdown();
  setupFilters();
  renderAnswers();
  setupCommentModal();
  setupAuthForm();
  setupCategories();
});
