export default function renderPreview() {
  const menu = document.querySelector('main .menu');

  menu.innerHTML += `
    <div class="preview-menu">
      <div class="preview-container-wrapper">
        <div class="preview-container">
          <canvas width="32" height="32" class="preview"></canvas>
          <button class="full-screen-button"><i class="fas fa-external-link-square-alt"></i></button>
        </div>
      <div class="animation-speed">
        <input type="range" name="FPS" class="FPS-range" min="0" max="24" value=0>
        <label for="FPS" class="FPS-label">FPS: <span class="FPS-value">0</span></label>
      </div>
      <div class="export">
        <span class="export-title">Export to: </span>
        <button class="toGif">gif</button>
        <button class="toApng">apng</button>
      </div>
    </div>`;
}
