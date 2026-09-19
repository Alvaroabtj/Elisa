const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const time = document.getElementById('time');

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

playBtn.addEventListener('click', async () => {
  if (audio.paused) {
    try {
      await audio.play();
      playBtn.textContent = '❚❚';
    } catch {
      playBtn.textContent = '▶';
    }
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
});

audio.addEventListener('timeupdate', () => {
  const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progressBar.style.width = `${percent}%`;
  time.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('ended', () => {
  playBtn.textContent = '▶';
  progressBar.style.width = '0%';
  time.textContent = '0:00';
});

document.querySelector('.scroll').addEventListener('click', () => {
  setTimeout(() => window.scrollBy({ top: -10, behavior: 'smooth' }), 0);
});
