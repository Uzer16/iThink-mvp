// KATEGORİ & SORU VERİLERİ
const categoriesData = {
  'Aşk': {
    question: 'En ABZÜRT aşk itirafı ne olurdu?',
    answers: [
      { text:'Gül yutup pembe tükürüğümle ilan ederim.', daily:5, weekly:10, monthly:15, yearly:20 },
      { text:'Kalbimi emanet ederim, borç çıkar mı?', daily:3, weekly:6, monthly:9, yearly:12 },
      { text:'Senden başka galakside kimsem yok!', daily:2, weekly:4, monthly:6, yearly:8 },
    ]
  },
  'Cinevizyon': {
    question: 'En ABZÜRT film sahnesi ne olurdu?',
    answers: [
      { text:'Hacker kaplanla düello yapar.', daily:7, weekly:14, monthly:21, yearly:28 },
      { text:'Uzay zombi disko partisi.', daily:4, weekly:8, monthly:12, yearly:16 },
      { text:'Dedektif patates kılığına girer.', daily:3, weekly:6, monthly:9, yearly:12 },
    ]
  },
  'Siyaset': {
    question: 'ABZÜRT bir politik skandal ne olurdu?',
    answers: [
      { text:'Bakanların çoraplarından raket fırlatması.', daily:6, weekly:12, monthly:18, yearly:24 },
      { text:'Seçim sandıkları çikolata yemedikçe açılmaz.', daily:4, weekly:8, monthly:12, yearly:16 },
      { text:'Meclis jimnastik kulübü kurar.', daily:2, weekly:4, monthly:6, yearly:8 },
    ]
  },
  'Spor': {
    question: 'Tarihin en absürt spor müsabakası nedir?',
    answers: [
      { text:'Kurbağa sprint yarışması.', daily:5, weekly:10, monthly:15, yearly:20 },
      { text:'Masaj topu hokeyi.', daily:3, weekly:6, monthly:9, yearly:12 },
      { text:'Uçan halıyla golf.', daily:2, weekly:4, monthly:6, yearly:8 },
    ]
  },
  'Tarih': {
    question: 'Tarihteki en tuhaf kraliyet ritüeli ne olurdu?',
    answers: [
      { text:'Kral sabah uyanınca flamingo okşar.', daily:4, weekly:8, monthly:12, yearly:16 },
      { text:'Kraliçe günde üç kez güvercin yarıştırır.', daily:3, weekly:6, monthly:9, yearly:12 },
      { text:'Şövalyeler mısır patlatma turnuvası yapar.', daily:2, weekly:4, monthly:6, yearly:8 },
    ]
  },
  'Teknoloji': {
    question: 'Gelecekteki en saçma teknoloji icadı ne olurdu?',
    answers: [
      { text:'Teleporton diye portatif böcek fırlatıcı.', daily:6, weekly:12, monthly:18, yearly:24 },
      { text:'Yürüyen masa sandalye kombosu.', daily:4, weekly:8, monthly:12, yearly:16 },
      { text:'Zihin okuyup kâğıt mendil çıkaran şapka.', daily:2, weekly:4, monthly:6, yearly:8 },
    ]
  }
};

let answersData = [];
let currentFilter = 'daily';

// Açıklanan fonksiyonlar renderAnswers, startCountdown, setupFilters, setupCommentModal, setupAuthForm
// —(aynı kaldı, başta yükleniyoruz)—

// KATEGORİ SEÇİMİ + GÖSTER-BAĞLA
function loadCategory(cat){
  const data = categoriesData[cat];
  document.getElementById('qc-text').textContent = data.question;
  answersData = JSON.parse(JSON.stringify(data.answers));
  renderAnswers();
}

function setupCategoryModal(){
  const modal = document.getElementById('category-modal');
  document.getElementById('nav-categories')
    .addEventListener('click', e=>{
      e.preventDefault();
      modal.style.display = 'flex';
    });
  document.getElementById('category-close')
    .addEventListener('click', ()=> modal.style.display='none');
  modal.addEventListener('click', e=>{ if(e.target===modal) modal.style.display='none'; });

  document.querySelectorAll('#category-list button').forEach(btn=>{
    btn.onclick = ()=>{
      const cat = btn.dataset.cat;
      loadCategory(cat);
      modal.style.display='none';
      document.getElementById('hero-container').classList.add('hidden');
      document.getElementById('main-content').classList.remove('hidden');
    };
  });
}

// Başlatıyoruz
document.addEventListener('DOMContentLoaded', ()=>{
  setupCategoryModal();
  startCountdown();
  setupFilters();
  setupCommentModal();
  setupAuthForm();
  // ilk açılışta hiç soru yok, içerik gizli:
  document.getElementById('main-content').classList.add('hidden');
});
