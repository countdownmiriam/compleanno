// DATA COMPLEANNO
const BIRTHDAY = "2026-01-31";

// GIORNI PRIMA
const DAYS_BEFORE = 8;

// ✍️ SCRIVI QUI LE FRASI
const PHRASES = [
  "Volevo fare qualcosa di carino per rendere più speciale la tua ultima settimana prima di diventare maggiorenne... e ho pensato, dato che non so suonare il piano, perchè non fare qualcosa in cui sono bravo???, ogni giorno questo sito si aggiornerà, preparati al cringe e all'emotional.. ti servirà MUHAHAAH...... ps. visto l'orso (occhiolino occhiolino) e poi se vedi in basso a sinistra sta il tasto play che fa partire Nayt :) ",
  "Iniziamo subito dai.... MANCA ESATTAMENTE 1 SETTIMANA AL TUO COMPLEANNO.... per il primo giorno volevo porti una semplice riflessione ma allo stesso tempo particolarmente profonda. Hai notato che da quando abbiamo iniziato a parlare non ti ho mai detto nemmeno una volta,seriamente non in maniera ironica, ti voglio bene? Ci ho fatto caso solo ultimamente, forse perchè è scontato e non c'è bisogno  di scriverlo o forse perchè risponderesti con emoji del nerd con dentoni e occhiali🤓... vabbè comunque quale momento migliore per rimediare se non questo? Quindi si.. TI VOGLIO BENEEE ma TANTO TANTO BENE 🤗  ",
  "OOOOOOOO Eccoci al secondo giorno, dopo ieri serve qualcosa di chill, di meme. Edit:hai appena detto che preferisci i meme va bene ok allora non mi impegno neanche piu a scrivere cose emotional, ah e hai appena mandato triplo pollice e risata ok ok capito tutto ci sta. Allora...inevitabilmente le nostre lunghe conversazioni ci prendono taaaaanto tempo, a me ovviamente non dispiace ma c'è sempre qualcuno che da bravo bambino bisognoso di attenzione si sente messo in disparte 🤣🤣🤣, volevo renderti partecipe di quello che subisco ogni giorno con una breve compilation (editata magistralmente) di scleri ingiustificati di Vinz che coinvolge anche te 🤣 BUONA VISIONE ",
  "Uuuuu SIAMO AL TERZOOOOO il tuo compleanno si avvicina TIC TAC TIC TAC...oggi, anche per celebrare un pò la svolta che c'è stata riguardo al tanto atteso viaggio in Giappone ho preparato una piccola playlist con tutte le esperienze più belle che FAREMO. Ci aspetta un viaggio unico attraverso il Giappone: l’energia di Shibuya, le luci di Shinjuku, la creatività di Harajuku e la tradizione di Asakusa, la spiritualità di Kyoto, la natura di Kamakura, l’incontro con i cervi a Nara, la vitalità di Osaka e la modernità di Yokohama.✨✨✨ Dire di non stare più nella pelle è poco...Il piano iniziale era fare un tour con l'IA ma l'hai presa maluccio quindi...Ma sono sicuro che avere a portata di mano le cose piu belle che faremo non sarà del tutto inutile 😂😂😂 ",
  "Quarto giorno...superata la metà di questo countdown....Come vola il tempo...sai che giorno è? LA GIORNATA DELLA MEMORIA!!!!! Ma invece di ricordare gli ebrei.... oggi voglio proporti i miei momenti preferiti delle nostre conversazioni online con una piccola top 10 che ti permetterà di ricordare per l'appunto,.... era questo il senso della giornata della memoria no ? 😂😂😂😂 Spero che apprezzerai e ..... BUONA VISIONE 🥺",
  "Giorno 5: scrivi qui",
  "Giorno 6: scrivi qui",
  "Giorno 7: scrivi qui",
];

const VIDEO_LINKS = [
  null, // Preludio
  null,
  "https://youtube.com/shorts/ivKfEZ6S2T4?si=u8UniM1cspiHfEIX",
  "https://youtube.com/playlist?list=PLH37V3pJWAIPXO_Nvbhsay8LZFgQ6eg8D&si=dycSxQcPDQ0ZJG70",
  "https://youtube.com/shorts/VY2vjBEoWuk?si=hpS0B6Zlg8IJJPgJ",
  null,
  null,
  null
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

    // CONTENUTO DEL GIORNO
    let content = `<div>${open ? text : "Bloccata."}</div>`;

    // PULSANTE VIDEO (solo se sbloccato e solo se esiste il link)
    if (open && VIDEO_LINKS[i]) {
      content += `
        <div style="margin-top:10px">
          <a
            href="${VIDEO_LINKS[i]}"
            target="_blank"
            rel="noopener"
            class="video-btn"
          >
            Guarda il video
          </a>
        </div>
      `;
    }

    li.innerHTML = `
      <div class="title">
        <span>${i === 0 ? "Preludio" : "Giorno " + i}</span>
        <span class="badge ${open ? "open" : ""}">
          ${open ? "Sbloccata" : openDate.toLocaleDateString("it-IT")}
        </span>
      </div>
      ${content}
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

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

function isBeforeDay(a, b) {
  const a0 = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const b0 = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return a0 < b0;
}

// Effetto "carino" PRIMA del compleanno: particelle leggere
function preBirthdayParticles() {
  const now = new Date();
  if (!isBeforeDay(now, birthdayDate)) return; // solo prima del 31

  const count = 18; // sobrio
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDelay = (Math.random() * 1.8) + "s";
    p.style.animationDuration = (4 + Math.random() * 2) + "s";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 6500);
  }
}

// Coriandoli SOLO il 31 gennaio
function birthdayConfetti() {
  const now = new Date();
  if (!sameDay(now, birthdayDate)) return;

  const count = 90;

  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";

    // Colori leggeri (senza esagerare)
    const colors = [
      "rgba(255,255,255,.9)",
      "rgba(110,231,255,.9)",
      "rgba(255,90,165,.75)"
    ];
    c.style.background = colors[Math.floor(Math.random() * colors.length)];

    c.style.animationDelay = (Math.random() * 0.8) + "s";
    c.style.transform = `translateY(0) rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }
}

// Avvio effetti
preBirthdayParticles();
birthdayConfetti();










