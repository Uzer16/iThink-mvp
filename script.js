// 0) Kategori ve içerik verisi
const categoriesData = {
  "Genel": {
    question: "Patronunuz öğle arasında…?",
    answers: [
      { text: 'Tavanda zıplıyor.',   daily:24, weekly:44, monthly:70, yearly:320 },
      { text: 'Kedi kostümü giyer.',  daily:18, weekly:33, monthly:60, yearly:210 },
      { text: 'Telefona gömülür.',    daily:12, weekly:26, monthly:50, yearly:118 },
    ]
  },
  "Aşk": {
    question: "Aşk acısını nasıl unutursunuz?",
    answers: [
      { text: 'Çikolata yerim.', daily:5, weekly:12, monthly:18, yearly:45 },
      { text: 'Yeni bir flört ararım.', daily:8, weekly:20, monthly:30, yearly:80 },
      { text: 'En sevdiğim diziyi izlerim.', daily:3, weekly:9, monthly:15, yearly:40 }
    ]
  },
  "Cinevizyon": {
    question: "En unutulmaz film sahnesi sizce hangisi?",
    answers: [
      { text: 'Titanic – "I’m flying!"', daily:6, weekly:14, monthly:22, yearly:60 },
      { text: 'Matrix – İlk kırmızı hap sahnesi', daily:7, weekly:16, monthly:25, yearly:70 },
      { text: 'Inception – Yüzükle dönme sahnesi', daily:4, weekly:11, monthly:18, yearly:50 }
    ]
  },
  "Siyaset": {
    question: "Siyasette en çok hangi konu tartışılır?",
    answers: [
      { text: 'Ekonomi politikaları.', daily:10, weekly:24, monthly:35, yearly:100 },
      { text: 'Eğitim sistemi.',      daily:7,  weekly:18, monthly:28, yearly:80 },
      { text: 'Sağlık reformu.',      daily:5,  weekly:12, monthly:20, yearly:60 }
    ]
  },
  "Spor": {
    question: "Hangi spor branşını takip ediyorsunuz?",
    answers: [
      { text: 'Futbol.', daily:20, weekly:45, monthly:65, yearly:150 },
      { text: 'Basketbol.', daily:12, weekly:30, monthly:50, yearly:120 },
      { text: 'Tenis.', daily:5, weekly:15, monthly:25, yearly:60 }
    ]
  },
  "Tarih": {
    question: "Tarihte en etkileyici medeniyet?",
    answers: [
      { text: 'Antik Roma.', daily:8, weekly:20, monthly:30, yearly:80 },
      { text: 'Osmanlı İmparatorluğu.', daily:10, weekly:25, monthly:40, yearly:100 },
      { text: 'Mısır’ın Firavunları.', daily:6, weekly:15, monthly:25, yearly:70 }
    ]
  },
  "Teknoloji": {
    question: "Hangi teknolojik buluş sizi en çok etkiledi?",
    answers: [
      { text: 'İnternet.', daily:25, weekly:60, monthly:90, yearly:200 },
      { text: 'Akıllı telefon.', daily:30, weekly:70, monthly:100, yearly:250 },
      { text: 'Yapay zeka.', daily:15, weekly:35, monthly:55, yearly:130 }
    ]
  }
};

let currentCategory = "Genel";
let currentFilter   = "daily";
let answersData     = [];

// 1) Kategori yükle
function loadCategory(cat) {
  currentCategory = cat;
  // soru güncelle
  document.getElementById("question-text").textContent =
    categoriesData[cat].question;
  // oy verilerini kopyala
  answersData = JSON.parse(JSON.stringify(categoriesData[cat].answers));
  // filtre düğmesini hep "Günlük"e al
  document.querySelectorAll(".filters button")
    .forEach(b => b.classList.remove("active"));
  document.querySelector(".filters button").classList.add("active");
  currentFilter = "daily";
  renderAnswers();
}

// 2) Cevap listesini render et
function renderAnswers() {
  const ul = document.getElementById("answers-list");
  ul.innerHTML = "";
  answersData.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.text;
    const span = document.createElement("span");
    span.className = "votes";
    span.textContent = `😂 ${item[currentFilter]}`;
    span.onclick = () => {
      item[currentFilter]++;
      renderAnswers();
    };
    li.appendChild(span);
    ul.appendChild(li);
  });
}

// 3) Geri sayım
function startCountdown() {
  const display = document.getElementById("countdown");
  function update() {
    const now = new Date(), mid = new Date(now);
    mid.setHours(24,0,0,0);
    const diff = mid - now;
    const h  = String(Math.floor(diff/3600000)).padStart(2,'0'),
          m  = String(Math.floor((diff%3600000)/60000)).padStart(2,'0'),
          s  = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
    display.textContent = `${h}:${m}:${s}`;
  }
  update();
  setInterval(update,1000);
}

// 4) Filtre butonları
function setupFilters() {
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".filters button")
        .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const t = btn.textContent.trim();
      currentFilter =
        t === "Günlük" ? "daily"
      : t === "Haftalık" ? "weekly"
      : t === "Aylık"   ? "monthly"
      :                   "yearly";
      renderAnswers();
    };
  });
}

// 5) Kategori dropdown
function setupCategoryDropdown() {
  const trigger = document.getElementById("nav-categories");
  const menu    = document.getElementById("category-list");
  trigger.onclick = e => {
    e.preventDefault();
    menu.classList.toggle("show");
  };
  // liste içi tuşlar
  menu.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => {
      loadCategory(btn.dataset.cat);
      menu.classList.remove("show");
    };
  });
}

// 6) Yorum modal’i
function setupCommentModal() {
  const modal = document.getElementById("comment-modal");
  const open  = document.getElementById("answer-btn");
  const close = document.getElementById("modal-close");
  const send  = document.getElementById("submit-comment");
  const ta    = document.getElementById("new-comment");

  open.onclick  = () => { ta.value=''; modal.style.display='flex'; };
  close.onclick = () => modal.style.display='none';
  modal.onclick = e => { if(e.target===modal) modal.style.display='none'; };
  send.onclick  = () => {
    const txt = ta.value.trim();
    if(!txt) return alert("Lütfen bir yorum yazın!");
    answersData.push({ text:txt, daily:0, weekly:0, monthly:0, yearly:0 });
    modal.style.display='none';
    renderAnswers();
  };
}

// 7) Auth modal’i
function setupAuthForm() {
  const nav   = document.getElementById("nav-auth");
  const modal = document.getElementById("auth-modal");
  const close = document.getElementById("auth-close");
  const em    = document.getElementById("email");
  const pw    = document.getElementById("password");
  const btn   = document.getElementById("login-btn");

  nav.onclick      = e => { e.preventDefault(); modal.style.display='flex'; };
  close.onclick    = () => modal.style.display='none';
  modal.onclick    = e => { if(e.target===modal) modal.style.display='none'; };
  btn.onclick      = e => {
    e.preventDefault();
    if(!em.value||!pw.value) return alert("Lütfen e-posta ve şifre girin.");
    alert("Giriş başarılı! (Simülasyon)");
    modal.style.display='none';
  };
}

// 8) Başlat
document.addEventListener("DOMContentLoaded", ()=>{
  setupCategoryDropdown();
  loadCategory("Genel");
  startCountdown();
  setupFilters();
  setupCommentModal();
  setupAuthForm();
});
