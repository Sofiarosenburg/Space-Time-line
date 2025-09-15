document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
      else entry.target.classList.remove('show');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.event').forEach(ev => observer.observe(ev));

  document.querySelectorAll('.event .year').forEach(yearEl => {
    yearEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const event = yearEl.parentElement;
      const details = event.querySelector('.details');
      const quiz = event.querySelector('.quiz');

      document.querySelectorAll('.details.active, .quiz.active').forEach(el => el.classList.remove('active'));

      details.classList.toggle('active');
      quiz.classList.toggle('active');
    });
  });
});

function checkAnswer(button, isCorrect) {
  const container = button.closest('.quiz');
  const feedback = container.querySelector('.feedback');
  if (isCorrect) {
    feedback.textContent = "Correct!";
    feedback.style.color = "limegreen";
    playSound('correctSound');
  } else {
    feedback.textContent = "Try again!";
    feedback.style.color = "tomato";
    playSound('wrongSound');
  }
}

function playSound(id) {
  const el = document.getElementById(id);
  if (el) { el.currentTime = 0; el.play().catch(() => {}); }
}

const robot = document.getElementById('robot');
const fala = document.getElementById('fala');
const funFacts = [
  "More than 1300 Earths could fit inside Jupiter!",
  "A day on Venus lasts longer than a year on Venus.",
  "Some stars we see in the night sky may no longer exist.",
  "The Moon drifts away from Earth about 3.8 cm every year.",
  "Halley's Comet passes close to Earth every 76 years."
];

function moveRobot() {
  const newX = Math.random() * (window.innerWidth - robot.offsetWidth);
  const newY = window.innerHeight - robot.offsetHeight - 50;
  robot.style.left = newX + "px";
  robot.style.bottom = (window.innerHeight - newY - 50) + "px"; 
}
setInterval(moveRobot, 5000);

robot.addEventListener('click', () => {
  const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
  fala.textContent = fact;
  fala.style.display = "block";

  setTimeout(() => { fala.style.display = "none"; }, 5000);
});

function updateFalaPosition() {
   if (fala.style.display === "block") {
     fala.style.left = robot.offsetWidth / 2 + "px";
     fala.style.bottom = robot.offsetHeight + 20 + "px"; } 
     
     requestAnimationFrame(updateFalaPosition); } 
     
     updateFalaPosition();
