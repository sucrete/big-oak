const end = Date.now() + 5 * 1000;

const colors = ["#00a95b", "#FF0000"];

(function frame() {
  confetti({
    particleCount: 1,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 1,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();