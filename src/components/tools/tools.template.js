export default function renderTools() {
  const toolsContainer = document.querySelector('main .tools-container');
  toolsContainer.innerHTML = `
  <ul class="tool-size">
          <div class="description">
            <span class="description-title">Pen size</span>
            <p class="description-text">from 1 to 4 pixels</p>
          </div>
          <li class="size px1"></li>
          <li class="size px2"></li>
          <li class="size px3"></li>
          <li class="size px4"></li>
        </ul>

        <ul class="tools-select">
          <li class="tool pen">
            <i class="fas fa-pen"></i>
            <div class="description">
              <span>Pen <i class="shortcut">(P)</i></span>
            </div>
          </li>
          <li class="tool mirror-pen">
            <i class="fas fa-edit"></i>
            <div class="description">
              <span>Mirror pen <i class="shortcut">(V)</i></span>
            </div>
          </li>
          <li class="tool paint-bucket">
            <i class="fas fa-fill-drip"></i>
            <div class="description">
              <span>Paint bucket <i class="shortcut">(B)</i></span>
            </div>
          </li>
          <li class="tool paint-bucket-all">
            <i class="fas fa-fill"></i>
            <div class="description">
              <span>Paint bucket all <i class="shortcut">(A)</i></span>
            </div>
          </li>
          <li class="tool triangle">
            <i class="fas fa-caret-up"></i>
            <div class="description">
              <span>Triangle <i class="shortcut">(T)</i></span>
            </div>
          </li>
          <li class="tool stroke">
            <i class="fas fa-minus"></i>
            <div class="description">
              <span>Stroke <i class="shortcut">(S)</i></span>
            </div>
          </li>
          <li class="tool rect">
            <i class="far fa-square"></i>
            <div class="description">
              <span>Rectangle <i class="shortcut">(R)</i></span>
              <span class="addition">Square <i class="shortcut">(Shift)</i></span>
            </div>
          </li>
          <li class="tool ellipse">
            <i class="far fa-circle"></i>
            <div class="description">
              <span>Ellipse <i class="shortcut">(C)</i></span>
              <span class="addition">Circle <i class="shortcut">(Shift)</i></span>
            </div>
          </li>
          <li class="tool darken">
            <i class="fas fa-moon"></i>
            <div class="description">
              <span>Darken <i class="shortcut">(D)</i></span>
            </div>
          </li>
          <li class="tool lighten">
            <i class="fas fa-sun"></i>
            <div class="description">
              <span>Lighten <i class="shortcut">(L)</i></span>
            </div>
          </li>
          <li class="tool move">
            <i class="fas fa-hand-paper"></i>
            <div class="description">
              <span>Move <i class="shortcut">(M)</i></span>
            </div>
          </li>
          <li class="tool dithering">
            <i class="fas fa-chess-board"></i>
            <div class="description">
              <span>Dithering <i class="shortcut">(I)</i></span>
            </div>
          </li>
          <li class="tool eraser">
            <i class="fas fa-eraser"></i>
            <div class="description">
              <span>Eraser <i class="shortcut">(E)</i></span>
            </div>
          </li>
          <li class="tool magic-eraser">
            <i class="fas fa-magic"></i>
            <div class="description">
              <span>Magic eraser <i class="shortcut">(G)</i></span>
            </div>
          </li>
          <li class="tool color-picker">
            <i class="fas fa-eye-dropper"></i>
            <div class="description">
              <span>Color picker <i class="shortcut">(O)</i></span>
            </div>
          </li>
        </ul>

        <div class="choose-color">
          <input type="color" name="second-color" class="second-color" value="#ffffff">
          <input type="color" name="color" class="color">
        </div>`;
}
