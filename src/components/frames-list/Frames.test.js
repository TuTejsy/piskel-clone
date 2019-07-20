import Frames from './Frames';

document.body.innerHTML = `
  <div class='container'>
    <header class="page-header">
      <span class="piskel-clone">Piskel-clone</span>
      <div class="auth">
        <div class="profile-container">
          <span class="profile-username"></span>
          <div class="profile-image"></div>
        </div>
        <div class="g-signin2" data-width="100" data-height="31" data-onsuccess="onSignIn"></div>
      </div>
    </header>

    <main>
      <div class="tools-container">
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
        </div>
      </div>

      <div class="frames-select">
        <div class="frames-container"></div>
        <button class="addFrame-button"><i class="fas fa-plus-circle"></i></i><span>Add Frame</span></button>
      </div>

      <div class="layers-container">
        <div class="canvas-container">
          <canvas width="32" height="32" class="additional-layer"></canvas>
          <canvas width="32" height="32" class="hover-layer"></canvas>
          <canvas width="32" height="32" class="layer"></canvas>
        </div>
      </div>

      <div class="menu">
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
            </div>
          </div>
        </div>

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
        </div>
      </div>
    </main>
  </div>`;

describe('addFrame', () => {
  it('should add a frame', () => {
    const frames = new Frames();
    frames.layerNumber += 1;
    frames.framesList[frames.layerNumber] = [];

    frames.addFrame();
    frames.addFrame();
    frames.addFrame();

    expect(frames.framesList[frames.layerNumber].length).toBe(3);
  });

  it('should copy a frame, from first argument', () => {
    const frames = new Frames();
    frames.layerNumber += 1;
    frames.framesList[frames.layerNumber] = [];

    const frame1 = frames.addFrame();
    const frame2 = frames.addFrame(frame1);

    expect(frame1).toEqual(frame2);
  });

  it('should replace a frame without adding a new frame if there is a third argument', () => {
    const frames = new Frames();
    frames.layerNumber += 1;
    frames.framesList[frames.layerNumber] = [];

    const frame1 = frames.addFrame();
    frames.addFrame(null, frame1, 1);
    const frame1Ctx = frame1.getContext('2d');

    expect(frames.frameCtx).toEqual(frame1Ctx);
  });
});

describe('chooseFrame', () => {
  const frames = new Frames();
  frames.layerNumber += 1;
  frames.framesList[frames.layerNumber] = [];

  const frame1 = frames.addFrame();
  const frame2 = frames.addFrame();
  frames.addFrame();

  it('should return if e.target is no a frame', () => {
    const e = {
      target: document.createElement('DIV'),
    };

    const { currentFrame } = frames;

    frames.chooseFrame(e);

    expect(currentFrame).toEqual(frames.currentFrame);
  });

  it('should return if frame is a frames.currentFrame', () => {
    const e = {
      target: document.createElement('DIV'),
    };

    frames.currentFrame = frame1;

    frames.chooseFrame(e, frame1);

    expect(frames.currentFrame).toEqual(frame1);
  });

  it('should choose a frame', () => {
    const e = {
      target: document.createElement('DIV'),
    };

    frames.currentFrame = frame1;

    frames.chooseFrame(e, frame2);

    expect(frames.currentFrame).toEqual(frame2);

    frames.layerNumber += 1;
    frames.framesList[frames.layerNumber] = [];

    const frame3 = frames.addFrame();
    const frame4 = frames.addFrame();

    frames.currentFrame = frame3;

    frames.chooseFrame(e, frame4);

    expect(frames.currentFrame).toEqual(frame4);
  });
});

describe('copyFrame', () => {
  const frames = new Frames();
  frames.layerNumber += 1;
  frames.framesList[frames.layerNumber] = [];

  it('should copy a given frame', () => {
    const frame1 = frames.addFrame();
    frames.copyFrame(frame1);

    expect(frames.framesList[frames.layerNumber][0])
      .toEqual(frames.framesList[frames.layerNumber][1]);
  });
});

describe('deleteFrame', () => {
  const frames = new Frames();
  frames.layerNumber += 1;
  frames.framesList[frames.layerNumber] = [];
  const frame1 = frames.addFrame();

  it('shouldn\'t delete a frame if threse is only one frame', () => {
    frames.deleteFrame(frame1);

    expect(frames.framesList[frames.layerNumber].length).toBe(1);
  });

  it('should delete a frame', () => {
    const frame2 = frames.addFrame();
    frames.deleteFrame(frame2);

    expect(frames.framesList[frames.layerNumber].length).toBe(1);
  });

  it('should save priveous or next frame as a current if given frame is a current', () => {
    const frame2 = frames.addFrame();
    frames.deleteFrame(frame1);

    expect(frames.framesList[frames.layerNumber].length).toBe(1);
    expect(frames.currentFrame).toEqual(frame2);
  });
});
