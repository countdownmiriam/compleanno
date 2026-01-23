// DATA COMPLEANNO
const BIRTHDAY = "2026-01-31";

// GIORNI PRIMA
const DAYS_BEFORE = 8;

// ✍️ SCRIVI QUI LE FRASI
const PHRASES = [
  "Volevo fare qualcosa di carino per rendere più speciale la tua ultima settimana prima di diventare maggiorenne... e ho pensato, dato che non so suonare il piano, perchè non fare qualcosa in cui sono bravo???, ogni giorno questo sito si aggiornerà, preparati al cringe e all'emotional.. ti servirà MUHAHAAH ",
  "Giorno 1: scrivi qui",
  "Giorno 2: scrivi qui",
  "Giorno 3: scrivi qui",
  "Giorno 4: scrivi qui",
  "Giorno 5: scrivi qui",
  "Giorno 6: scrivi qui",
  "Giorno 7: scrivi qui",
];

function parseLocalDate(d) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day);
}

const birthdayDate = parseLocalDate(BIRTHDAY);
const startUnlockDate = new Date(birthdayDate);
startUnlockDate.setDate(startUnlockDate.getDate() - DAYS_BEFORE);

// COUNTDOWN
function updateCountdown() {
  const now = new Date();
  let diff = birthdayDate - now;
  if (diff < 0) diff = 0;

  const s = Math.floor(diff / 1000);
  document.getElementById("d").textContent = Math.floor(s / 86400);
  document.getElementById("h").textContent = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
  document.getElementById("m").textContent = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  document.getElementById("s").textContent = String(s % 60).padStart(2, "0");
}

// FRASE GIORNALIERA
function renderPhrases() {
  const list = document.getElementById("phrases");
  list.innerHTML = "";

  const today = new Date();
  const today0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const daysFromStart = Math.floor((today0 - startUnlockDate) / 86400000);
  const unlocked = Math.max(0, Math.min(PHRASES.length, daysFromStart + 1));

  PHRASES.forEach((text, i) => {
    const li = document.createElement("li");
    const open = i < unlocked;
    li.className = "phrase" + (open ? "" : " locked");

    const openDate = new Date(startUnlockDate);
    openDate.setDate(openDate.getDate() + i);

    li.innerHTML = `
      <div class="title">
        <span>${i === 0 ? "Preludio" : "Giorno " + i}</span>
        <span class="badge ${open ? "open" : ""}">
          ${open ? "Sbloccata" : openDate.toLocaleDateString("it-IT")}
        </span>
      </div>
      <div>${open ? text : "Bloccata."}</div>
    `;
    list.appendChild(li);
  });
}

// MUSICA
const bgm = document.getElementById("bgm");
const playBtn = document.getElementById("playBtn");
bgm.volume = 0.15;

async function fadeIn() {
  bgm.volume = 0;
  await bgm.play().catch(() => {});
  const t = setInterval(() => {
    bgm.volume = Math.min(0.15, bgm.volume + 0.01);
    if (bgm.volume >= 0.15) clearInterval(t);
  }, 80);
}

playBtn.addEventListener("click", async () => {
  if (bgm.paused) {
    await fadeIn();
    playBtn.textContent = "Pausa";
  } else {
    bgm.pause();
    playBtn.textContent = "Play";
  }
});

updateCountdown();
renderPhrases();
setInterval(updateCountdown, 1000);
setInterval(renderPhrases, 60000);

