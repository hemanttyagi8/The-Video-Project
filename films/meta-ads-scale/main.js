import { setup } from './film.js';

async function init() {
  const canvas = document.getElementById('c');
  const draw = await setup(canvas);
  window.render = (t) => {
    draw(t);
  };
  window.render(0);
  window.READY = true;
}

init().catch(err => {
  console.error('Initialization error in meta-ads-scale main.js:', err);
});
