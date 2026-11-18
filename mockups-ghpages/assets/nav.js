// Mobile menu: the button toggles the header's link list; Escape closes it.
document.querySelectorAll('.navbtn').forEach((btn) => {
  const header = btn.closest('header');
  const set = (open) => {
    header.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => set(!header.classList.contains('open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('open')) {
      set(false);
      btn.focus();
    }
  });
  // Close again if the window grows back to desktop width.
  matchMedia('(min-width: 1101px)').addEventListener('change', (e) => e.matches && set(false));
});
