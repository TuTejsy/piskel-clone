export default function renderFrames() {
  const framesSelect = document.querySelector('main .frames-select');

  framesSelect.innerHTML = `
  <div class="frames-container"></div>
     <button class="addFrame-button"><i class="fas fa-plus-circle"></i></i><span>Add Frame</span></button>
  `;
}
