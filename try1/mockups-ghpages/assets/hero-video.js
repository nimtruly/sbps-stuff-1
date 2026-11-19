// Background YouTube video for the hero.
// To add more videos, put their YouTube IDs in this list; they play in order and loop.
const HERO_VIDEOS = ['4ygbcVKNL9Q'];

(() => {
  const host = document.querySelector('[data-yt-bg]');
  if (!host || !HERO_VIDEOS.length) return;
  // Respect reduced motion: keep the still photo, no video.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: HERO_VIDEOS.join(','),
    controls: '0',
    playsinline: '1',
    rel: '0',
    iv_load_policy: '3',
    disablekb: '1',
    enablejsapi: '1',
    origin: location.origin,
  });

  const layer = document.createElement('div');
  layer.className = 'yt-bg';
  layer.setAttribute('aria-hidden', 'true');
  const frame = document.createElement('iframe');
  frame.src = `https://www.youtube-nocookie.com/embed/${HERO_VIDEOS[0]}?${params}`;
  frame.allow = 'autoplay; encrypted-media; picture-in-picture';
  frame.tabIndex = -1;
  frame.title = 'Background video';
  layer.appendChild(frame);

  // Sit directly above the still photo, below any overlay and text.
  const photo = host.querySelector(':scope > img');
  photo ? photo.after(layer) : host.prepend(layer);

  // Keep the photo until the player reports it is actually playing (state 1),
  // so YouTube's loading spinner and play button never show. If autoplay is blocked,
  // the photo simply stays.
  frame.addEventListener('load', () => {
    frame.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'hero' }), '*');
  });
  window.addEventListener('message', (e) => {
    if (e.source !== frame.contentWindow || typeof e.data !== 'string') return;
    try {
      const msg = JSON.parse(e.data);
      if (msg.info?.playerState === 1) layer.classList.add('is-on');
    } catch {}
  });

  // Pause control (WCAG 2.2.2: moving content needs a way to stop it).
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'yt-toggle';
  let playing = true;
  const icon = { pause: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>', play: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>' };
  const render = () => {
    btn.innerHTML = playing ? icon.pause : icon.play;
    btn.setAttribute('aria-label', playing ? 'Pause background video' : 'Play background video');
  };
  render();
  btn.addEventListener('click', () => {
    playing = !playing;
    frame.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: playing ? 'playVideo' : 'pauseVideo', args: [] }), '*');
    render();
  });
  host.appendChild(btn);
})();
