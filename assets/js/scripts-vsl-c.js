    // --- TRIGGERS VSL B ---
    document.addEventListener("DOMContentLoaded", function() {
      var triggers = [
        { seconds: 2370, className: ".esconder", callback: startStockCountdown },
        { seconds: 3102, className: "#bonus-popup", callback: showBonusPopup },
        { seconds: 1, className: "#offer", callback: showOfferCTA }
      ];
      var EXPIRATION_DAYS = 14;

      class StorageHandler {
        static expiryTime = EXPIRATION_DAYS * 86400000;
        static set(key, value) {
          localStorage.setItem(key, JSON.stringify({ value, expiry: Date.now() + this.expiryTime }));
        }
        static get(key) {
          var item = localStorage.getItem(key);
          if (!item) return null;
          var { value, expiry } = JSON.parse(item);
          if (Date.now() > expiry) {
            localStorage.removeItem(key);
            return null;
          }
          return value;
        }
      }

      triggers.forEach(function(trigger) {
        var alreadyDisplayedKey = "alreadyElsDisplayed_C_" + trigger.seconds + "_" + trigger.className;
        var elsHidden = document.querySelectorAll(trigger.className);
        var elsDisplayed = StorageHandler.get(alreadyDisplayedKey);

        var showHiddenElements = function () {
          elsHidden.forEach((e) => {
            e.style.display = "block";
            e.classList.remove("esconder");
          });
          StorageHandler.set(alreadyDisplayedKey, true);

          if (typeof trigger.callback === "function") {
            trigger.callback();
          }
        };

        var attempts = 0;
        var startWatchVideoProgress = function () {
          if (typeof smartplayer === 'undefined' || !(smartplayer.instances && smartplayer.instances.length)) {
            if (attempts >= 10) return;
            attempts++;
            return setTimeout(startWatchVideoProgress, 1000);
          }
          smartplayer.instances[0].on('timeupdate', () => {
            if (elsDisplayed || smartplayer.instances[0].smartAutoPlay) return;
            if (smartplayer.instances[0].video.currentTime < trigger.seconds) return;
            showHiddenElements();
            elsDisplayed = true;
          });
        };

        if (elsDisplayed) {
          setTimeout(showHiddenElements, 100);
        } else {
          startWatchVideoProgress();
        }
      });
    });