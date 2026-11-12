/* ===== Fix tinggi layar iPhone/Android (100vh) ===== */
function setVH(){
  document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
}
setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

/* ===== Navigasi 3 tab ===== */
const buttons = document.querySelectorAll('nav button');
const pages   = document.querySelectorAll('.page');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.page).classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  });
});

/* ===== Countdown ke 15 Nov 2026 ===== */
const target = new Date('2026-11-15T00:00:00+07:00').getTime();
const cd = document.getElementById('countdown');

function tick(){
  const diff = target - Date.now();
  if(diff <= 0){
    cd.innerHTML = '<div style="padding:12px 22px"><b>🎉 Hari ini hari spesialmu! 🎉</b></div>';
    return;
  }
  const d = Math.floor(diff/86400000);
  const h = Math.floor(diff/3600000)%24;
  const m = Math.floor(diff/60000)%60;
  const s = Math.floor(diff/1000)%60;
  cd.innerHTML =
    `<div><b>${d}</b><small>Hari</small></div>
     <div><b>${h}</b><small>Jam</small></div>
     <div><b>${m}</b><small>Menit</small></div>
     <div><b>${s}</b><small>Detik</small></div>`;
}
tick(); setInterval(tick, 1000);

/* ===== Hati & konfeti ===== */
function spawn(emoji, count){
  for(let i=0;i<count;i++){
    const el = document.createElement('span');
    el.className = 'float';
    el.textContent = emoji[Math.floor(Math.random()*emoji.length)];
    el.style.left = Math.random()*100 + 'vw';
    el.style.fontSize = (16 + Math.random()*24) + 'px';
    el.style.animationDuration = (4 + Math.random()*4) + 's';
    el.style.animationDelay = (Math.random()*1.5) + 's';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 9000);
  }
}
spawn(['💖','💗','💕'], 8);
setInterval(()=>spawn(['💖','💗','💕','✨'], 2), 3000);

/* ===== Tombol kejutan ===== */
const surprises = [
  "Kamu itu hadiah terindah yang pernah aku punya. 💝",
  "Selamat ulang tahun, calon perawat paling hebat! 🩺",
  "Jangan nangis ya... eh, boleh deh, aku peluk. 🥺🤗",
  "Semoga semua masakanmu selalu enak, dan aku yang pertama mencicipi. 🍳",
  "I love you, 21 tahun terbaikmu baru dimulai! 🎂",
  "Yang harus kamu tau!! aku sayangg sama kamu apapun halangan itu",
];
document.getElementById('surpriseBtn').addEventListener('click', () => {
  document.getElementById('randomQuote').textContent =
    surprises[Math.floor(Math.random()*surprises.length)];
  spawn(['🎉','🎊','🎂','💖','✨','🎈'], 40);
});

/* ===== Foto: emoji pengganti jika file foto belum ada ===== */
document.querySelectorAll('.photo img').forEach(img => {
  img.addEventListener('error', () => {
    img.parentNode.textContent = img.dataset.fallback || '📷';
  });
});

/* ===== Lightbox foto ===== */
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
document.querySelectorAll('.photo').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    if(!img) return;
    lbImg.src = img.src;
    lb.classList.add('show');
  });
});
lb.addEventListener('click', () => lb.classList.remove('show'));

/* ===== Musik + layar pembuka ===== */
const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('musicBtn');
const intro = document.getElementById('intro');

document.getElementById('openBtn').addEventListener('click', () => {
  intro.classList.add('hide');
  bgm.play().catch(() => {});
  musicBtn.classList.add('playing');
  spawn(['🎉','🎊','🎂','💖','✨','🎈'], 40);
});

musicBtn.addEventListener('click', () => {
  if (bgm.paused) {
    bgm.play();
    musicBtn.classList.add('playing');
    musicBtn.textContent = '⏸️';
  } else {
    bgm.pause();
    musicBtn.classList.remove('playing');
    musicBtn.textContent = '🎵';
  }
});