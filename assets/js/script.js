// =====================================================
// EMAILJS CONFIGURATIE
// Maak een gratis account op https://www.emailjs.com/
// en vervang de drie waarden hieronder:
// =====================================================
var EMAILJS_PUBLIC_KEY = 'puD3_9eyi5sg7Ctqn';
var EMAILJS_SERVICE_ID = 'service_sn5jsrl';
var EMAILJS_TEMPLATE_ID = 'template_n7upkjt';
// =====================================================
(function () {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
})();

function sendEmail() {
  var naam = document.getElementById('contact-naam');
  var email = document.getElementById('contact-email');
  var bericht = document.getElementById('contact-bericht');
  var btn = document.getElementById('send-btn');
  var btnText = document.getElementById('btn-text');

  if (!naam.value.trim() || !email.value.trim() || !bericht.value.trim()) {
    showStatus('Vul alle velden in voor je verstuurt.', 'error');
    return;
  }

  btn.disabled = true;
  btnText.textContent = 'Bezig met versturen...';

  var params = {
    from_name: naam.value.trim(),
    reply_to: email.value.trim(),
    message: bericht.value.trim(),
  };

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
    .then(
      function () {
        showStatus(
          'Bericht verstuurd! We nemen binnen 48 uur contact op.',
          'success',
        );
        naam.value = '';
        email.value = '';
        bericht.value = '';
      },
      function (err) {
        console.error('EmailJS fout:', err);
        showStatus(
          'Er ging iets mis: ' +
            (err.text || 'Onbekende fout') +
            '. Controleer je EmailJS instellingen.',
          'error',
        );
      },
    )
    .finally(function () {
      btn.disabled = false;
      btnText.textContent = 'Verstuur bericht';
    });
}

function showStatus(msg, type) {
  var el = document.getElementById('form-status');
  el.textContent = msg;
  el.className = 'form-status ' + type;
}

(function () {
  var lastScrollY = window.scrollY;
  var navbar = document.querySelector('.navbar');
  var ticking = false;
  var isUserScrolling = false;

  window.addEventListener('scroll', function () {
    isUserScrolling = true;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        var currentScroll = window.scrollY;
        if (isUserScrolling) {
          if (currentScroll > lastScrollY && currentScroll > 50) {
            navbar.classList.add('hidden');
          } else if (currentScroll <= lastScrollY) {
            navbar.classList.remove('hidden');
          }
          lastScrollY = currentScroll;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();

function scrollToHome() {
  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('year').textContent = new Date().getFullYear();

function toggleText(link) {
  event.preventDefault();
  var card = link.parentElement;
  var fullText = card.querySelector('.full-text');
  if (fullText.style.display === 'none') {
    fullText.style.display = 'block';
    link.textContent = 'Lees minder';
  } else {
    fullText.style.display = 'none';
    link.textContent = 'Lees meer';
  }
}
