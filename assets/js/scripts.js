
// FAKE VIEWERS
let viewers = Math.floor(1553 + Math.random() * 50);
const viewersEl = document.getElementById('viewers');
setInterval(() => {
  viewers += Math.floor(Math.random() * 3 - 1); // +/- 1
  viewersEl.textContent = viewers;
}, 3000);
viewersEl.textContent = viewers;

let stock = 90;
const minStock = 7;
const stockEl = document.getElementById('stock');
stockEl.textContent = stock;


// FAKE COUNTDOWN STOCK
document.addEventListener('DOMContentLoaded', () => {
  const stockEl = document.getElementById('stock');
  if (!stockEl) {
    console.warn('Elemento #stock não encontrado!');
    return;
  }

  let stock = 90;
  const minStock = 7;
  stockEl.textContent = stock;

  function updateVisualStock(value) {
    stock = value;
    stockEl.textContent = stock;
  }

  function burstDrop(amount, speed, callback) {
    let target = stock - amount;
    if (target < minStock) target = minStock;

    const interval = setInterval(() => {
      if (stock > target) {
        updateVisualStock(stock - 1);
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, speed);
  }

  function startControlledCountdown() {
    setInterval(() => {
      if (stock <= minStock) return;

      const chance = Math.random();
      let reduction = 0;

      if (chance < 0.2) {
        reduction = 1;
      } else if (chance < 0.3) {
        reduction = 3;
      }

      if (reduction && stock - reduction >= minStock) {
        updateVisualStock(stock - reduction);
      }
    }, 4000);
  }

  function scheduleRandomBursts() {
    setInterval(() => {
      const chance = Math.random();
      if (stock > minStock + 10 && chance < 0.5) {
        burstDrop(10, 100);
      }
    }, 35000); 
  }

  // Início da contagem
  burstDrop(11, 100, () => {
    startControlledCountdown();
    scheduleRandomBursts();
  });
});





// HEADLINES ROTATIVAS DO TIMER
const offerPhrases = [
  "Hurry! This Special Offer Expires In:",
  "Warning: This page may be taken down in:",
  "Big Pharma doesn’t want you to see this... Offer closes in:",
  "Final Chance to Access This Discovery Before It’s Gone:"
];

document.addEventListener('DOMContentLoaded', () => {
  const headline = document.getElementById('offer-headline');
  if (headline) {
    const random = Math.floor(Math.random() * offerPhrases.length);
    headline.textContent = offerPhrases[random];
  }

  // TIMER DE 1h49min
  const deadline = new Date(Date.now() + 1 * 60 * 60 * 1000 + 49 * 60 * 1000); // 1h49min
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateTimer() {
    const now = new Date();
    const remaining = deadline - now;

    if (remaining <= 0) {
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
});

// EXIT INTENT POPUP
let exitPopupShown = false;

function showExitPopup() {
  if (!exitPopupShown) {
    document.getElementById('exit-popup').classList.remove('hidden');
    exitPopupShown = true;
  }
}

document.addEventListener('mouseout', function (e) {
  if (e.clientY < 10) {
    showExitPopup();
  }
});

document.getElementById('close-exit-popup').addEventListener('click', function () {
  document.getElementById('exit-popup').classList.add('hidden');
});

// FUNÇÃO PARA ABRIR O POPUP DE BÔNUS
function showBonusPopup() {
  const bonusPopup = document.getElementById('bonus-popup');
  if (bonusPopup) {
    bonusPopup.classList.remove('hidden');
  }
}

// Fecha o popup de bônus
function closeBonusPopup() {
  const bonusPopup = document.getElementById('bonus-popup');
  if (bonusPopup) {
    bonusPopup.classList.add('hidden');
  }
}

// Botão de fechar
document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.getElementById('close-bonus-popup');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeBonusPopup);
  }
});


// FAKE COUNTDOWN (MINUTES:SECONDS)
let timerInterval = null; // controla 1 timer rodando por vez
let countdown = 58 * 60 + 59; // valor inicial, ajusta como quiser

const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

function updateTimer() {
  const min = String(Math.floor(countdown / 60)).padStart(2, '0');
  const sec = String(countdown % 60).padStart(2, '0');

  minutesSpan.textContent = min;
  secondsSpan.textContent = sec;

  if (countdown > 0) {
    countdown--;
  } else {
    clearInterval(timerInterval);
    timerInterval = null; // permite iniciar de novo, se quiser
  }
}

function startCountdown(duration) {
  if (timerInterval) clearInterval(timerInterval); // SEMPRE limpa antes!
  countdown = duration;
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function showOfferCTA() {
  const offer = document.getElementById('offer');
  offer.classList.remove('hidden');
  offer.scrollIntoView({ behavior: 'smooth' });

  // Inicia o countdown sempre que a oferta aparece
  startCountdown(58 * 60 + 59); // ou outro valor desejado!
}
