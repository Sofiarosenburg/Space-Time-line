//efeito app da apple, nao ta dando certo
//arrumado com IA
document.addEventListener('DOMContentLoaded', () => {
  //anima os cards
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
      else entry.target.classList.remove('show');
    });
  }, { threshold: 0.15 });
//pegar os fatos pra abrir
  document.querySelectorAll('.fato').forEach(ev => observer.observe(ev));
//clica no ano e abre fatos
  document.querySelectorAll('.fato .ano').forEach(yearEl => {
    yearEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const event = yearEl.parentElement;
      const info = event.querySelector('.info');
      const quiz = event.querySelector('.prova');
      console.log('vai aparecer o texto quando clicar no ano e a foto vai aparecer')
      document.querySelectorAll('.info.active, .prova.active').forEach(el => el.classList.remove('active'));

      info.classList.toggle('active');
      quiz.classList.toggle('active');
    });
  });
});
//toca os sons
function checkAnswer(button, iscerto) {
  const container = button.closest('.prova');
  const feedback = container.querySelector('.resposta');
  console.log("vendo resposta..")
  if (iscerto) { 
    feedback.textContent = "Correct!";
    feedback.style.color = "limegreen";
    playSound('certo');
  } else {
    feedback.textContent = "Try again!";
    feedback.style.color = "tomato";
    playSound('errado');
  }
}

function playSound(id) {
  const el = document.getElementById(id);
  if (el) { el.currentTime = 0; el.play().catch(() => {}); }
}

const astro = document.getElementById('astro');
const fala = document.getElementById('fala');
const fatosfun = [ //achar mais curiosidades
  "More than 1300 Earths could fit inside Jupiter!",
  "A day on Venus lasts longer than a year on Venus.",
  "Some stars we see in the night sky may no longer exist.",
  "The Moon drifts away from Earth about 3.8 cm every year.",
  "Halley's Comet passes close to Earth every 76 years."
];

//nao ta parecendo flutuando
//arrumado bug com IA
function moveastro() {
  const newX = Math.random() * (window.innerWidth - astro.offsetWidth);
  //Y fixo pra nao bugar
  const newY = window.innerHeight - astro.offsetHeight - 50;
  astro.style.left = newX + "px";
  astro.style.bottom = (window.innerHeight - newY - 50) + "px"; //4 em 4 é pouco!
}
setInterval(moveastro, 5000);

astro.addEventListener('click', () => {
  const fact = fatosfun[Math.floor(Math.random() * fatosfun.length)];
  fala.textContent = fact;
  fala.style.display = "block";

  setTimeout(() => { fala.style.display = "none"; }, 5000);
});
//ficar reto
function updatefalaposition() { //fala ainda longe do astronauta, deixar junto com ele
   if (fala.style.display === "block") {
     fala.style.left = astro.offsetWidth / 2 + "px";
     fala.style.bottom = astro.offsetHeight + 20 + "px"; 
   } 
   
   requestAnimationFrame(updateFalaPosition); 
} 
updateFalaPosition();

