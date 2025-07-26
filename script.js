function nextPopup(popupNumber) {
  document.getElementById(`popup${popupNumber}`).style.display = "none";

  if (popupNumber === 1) {
    document.getElementById("popup2").style.display = "flex";
  } else if (popupNumber === 2) {
    document.getElementById("popup3").style.display = "flex";
  } else if (popupNumber === 3) {
    document.getElementById("mainContent").classList.remove("hidden");
    startConfetti();
    setTimeout(stopConfetti, 4000);
    playBirthdayMusic();
  }
}

function playBirthdayMusic() {
  const audio = document.getElementById('birthday-audio');
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

// Confetti effect
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext ? confettiCanvas.getContext('2d') : null;
let confettiParticles = [];
let confettiActive = false;

function randomColor() {
  const colors = ['#ff4081', '#ffb347', '#ace0f9', '#fff1eb', '#fcb69f', '#6a89cc', '#f8a5c2'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createConfettiParticle() {
  return {
    x: Math.random() * window.innerWidth,
    y: -20,
    r: Math.random() * 8 + 4,
    d: Math.random() * 80 + 20,
    color: randomColor(),
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
    tiltAngleIncremental: (Math.random() * 0.07) + 0.05
  };
}

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let i = 0; i < confettiParticles.length; i++) {
    let p = confettiParticles[i];
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.d / 5);
    ctx.stroke();
  }
  updateConfetti();
}

function updateConfetti() {
  for (let i = 0; i < confettiParticles.length; i++) {
    let p = confettiParticles[i];
    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
    p.tiltAngle += p.tiltAngleIncremental;
    p.tilt = Math.sin(p.tiltAngle) * 15;
    if (p.y > window.innerHeight) {
      confettiParticles[i] = createConfettiParticle();
      confettiParticles[i].y = -20;
    }
  }
}

function startConfetti() {
  if (!ctx) return;
  confettiActive = true;
  confettiCanvas.classList.remove('hidden');
  resizeConfettiCanvas();
  confettiParticles = [];
  for (let i = 0; i < 120; i++) {
    confettiParticles.push(createConfettiParticle());
  }
  requestAnimationFrame(runConfetti);
}

function runConfetti() {
  if (!confettiActive) return;
  drawConfetti();
  requestAnimationFrame(runConfetti);
}

function stopConfetti() {
  confettiActive = false;
  confettiCanvas.classList.add('hidden');
}

window.addEventListener('resize', resizeConfettiCanvas);

// 3D Carousel logic
let carousel3DIndex = 0;
const carouselInner = document.getElementById('carousel-inner');
const carousel3DImages = carouselInner ? Array.from(carouselInner.getElementsByTagName('img')) : [];
const total3D = carousel3DImages.length;
let currentRotation = 0;
let carouselInterval = null;

function updateCarousel3D() {
  const angle = 360 / total3D;
  for (let i = 0; i < total3D; i++) {
    const img = carousel3DImages[i];
    const imgAngle = angle * i;
    img.style.transform = `rotateY(${imgAngle}deg) translateZ(220px)`;
    img.classList.toggle('active', i === carousel3DIndex);
  }
  carouselInner.style.transform = `rotateY(${currentRotation}deg)`;
}

function nextCarouselImage3D() {
  if (!carousel3DImages.length) return;
  const angle = 360 / total3D;
  carousel3DIndex = (carousel3DIndex + 1) % total3D;
  currentRotation -= angle;
  updateCarousel3D();
}

function startCarouselAutoRotate() {
  if (carouselInterval) clearInterval(carouselInterval);
  carouselInterval = setInterval(nextCarouselImage3D, 2500); // Change 2500 to adjust speed
}

// Initialize 3D carousel on page load
if (carousel3DImages.length) {
  updateCarousel3D();
  startCarouselAutoRotate();
}
  