
// FAKE VIEWERS
let viewers = Math.floor(1553 + Math.random() * 50);
const viewersEl = document.getElementById('viewers');
setInterval(() => {
  viewers += Math.floor(Math.random() * 3 - 1); // +/- 1
  viewersEl.textContent = viewers;
}, 3000);
viewersEl.textContent = viewers;

let stock = 1500;
const minStock = 18;
const stockEl = document.getElementById('stock');
stockEl.textContent = stock;

// FAKE COUNTDOWN (MINUTES:SECONDS)
let countdown = 9 * 60 + 59; // 9 minutes and 59 seconds

const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

function updateTimer() {
  const min = String(Math.floor(countdown / 60)).padStart(2, '0');
  const sec = String(countdown % 60).padStart(2, '0');

  minutesSpan.textContent = min;
  secondsSpan.textContent = sec;

  if (countdown > 0) countdown--;
}

setInterval(updateTimer, 1000);
updateTimer();


// FAKE COUNTDOWN STOCK
document.addEventListener('DOMContentLoaded', () => {
  const stockEl = document.getElementById('stock');
  if (!stockEl) {
    console.warn('Elemento #stock não encontrado!');
    return;
  }

  let stock = 1500;
  const minStock = 18;
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

// TRIGGER OFFER AFTER A SET TIMEOUT
function showOfferCTA() {
  document.getElementById('offer').classList.remove('hidden');
  document.getElementById('offer').scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('DOMContentLoaded', function() {
  var checkPlayer = setInterval(function() {
    if (window.player && typeof player.on === "function") {
      // Adiciona o evento cuepoint para 40min54seg (2454 segundos)
      player.on('cuepoint', function(event) {
        if (event.detail.seconds === 2454) {
          showOfferCTA();
        }
      });
      clearInterval(checkPlayer);
    }
  }, 500);
});

// Aguarda player carregar e seta evento
window.addEventListener('DOMContentLoaded', function() {
  var checkPlayer = setInterval(function() {
    // player.js cria um objeto global chamado 'player'
    if (window.player && typeof player.on === "function") {
      player.on('cta', showOfferCTA); // ou 'complete'
      clearInterval(checkPlayer);
    }
  }, 500);
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

// FUNÇÃO PARA ABRIR O POPUP DE BÔNUS VTURB
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

  // Escuta o evento do player para exibir o bônus ao final do vídeo
  var checkPlayer = setInterval(function() {
    if (window.player && typeof player.on === "function") {
      player.on('complete', showBonusPopup);
      clearInterval(checkPlayer);
    }
  }, 500);
});

// --- INTEGRAÇÃO REAL VTURB ---
// (para depois quando o vídeo for assistido até o final)

// Exemplo para usar com API do VTurb:
// player.on('complete', () => {
//    showBonusPopup();
// });

