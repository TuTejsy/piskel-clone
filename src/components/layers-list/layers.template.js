export default function renderLayers() {
  const layersContainer = document.querySelector('main .layers-container');
  layersContainer.innerHTML = `
    <div class="canvas-container">
        <canvas width="32" height="32" class="additional-layer"></canvas>
        <canvas width="32" height="32" class="hover-layer"></canvas>
        <canvas width="32" height="32" class="layer"></canvas>
    </div>
  `;

  const menu = document.querySelector('main .menu');

  menu.innerHTML += `
  <div class="layers-menu">
    <div class="layers-control">
      <span class="title">Layers</span>
      <button class="layer-add"><i class="fas fa-plus"></i></button>
      <button class="layer-up"><i class="fas fa-chevron-up"></i></button>
      <button class="layer-down"><i class="fas fa-chevron-down"></i></button>
      <button class="layer-remove"><i class="fas fa-times"></i></button>
    </div>
    <ul class="layers-list">
    </ul>
  </div>

  <div class="canvas-menu">
    <div class="canvas-info">
        <span class="canv-scale">x1</span>
        <span class="canv-size">[32X32]</span>
        <span class="coords"></span>
    </div>

    <div class="canvas-size">
      <button class="size px32 active">32X32</button>
      <button class="size px64">64X64</button>
      <button class="size px128">128X128</button>
    </div>
  </div>`;
}
