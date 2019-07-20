import {
  moveButtonMoveEvent,
  moveButtonMouseDown,
  deleteButtonEvent,
  dragAndDrop,
  copyButtonEvent,
  frameShorcuts,
  addFrameButtonClickEvent,
} from './framesEvents';

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

describe('moveButtonMoveEvent', () => {
  it('should return a function', () => {
    const e = {
      pageY: 20,
    };

    const previewContainerWrapper = {
      style: {
        marginTop: '',
      },
    };

    const result = moveButtonMoveEvent(e, previewContainerWrapper);
    expect(result).toBeInstanceOf(Function);
  });

  it('should save marginTop in previewContainerWrapper as ev.pageY - e.page - 115px', () => {
    const e = {
      pageY: 20,
    };

    const ev = {
      pageY: 10,
    };

    const previewContainerWrapper = {
      style: {
        marginTop: '',
      },
    };

    moveButtonMoveEvent(e, previewContainerWrapper)(ev);

    expect(previewContainerWrapper.style.marginTop).toBe('-125px');
  });
});

describe('dragAndDrop', () => {
  const frames = new Frames();
  frames.layerNumber += 1;
  frames.framesList[frames.layerNumber] = [];
  const frame1 = frames.addFrame();
  const frame2 = frames.addFrame();

  const framesContainer = frame2.parentNode.parentNode.parentNode;
  it('should return a function', () => {
    const result = dragAndDrop();
    expect(result).toBeInstanceOf(Function);
  });

  it('should drag and drop if element under mouse is a frame', () => {
    const previewContainerWrapper = frame2.parentNode.parentNode;
    const ev = {
      target: frame1,
    };

    const targetPos = document.createElement('DIV');
    targetPos.classList.add('target-position');
    framesContainer.insertBefore(targetPos, previewContainerWrapper);

    dragAndDrop(frames, framesContainer, previewContainerWrapper, targetPos, frame1)(ev);
    expect(previewContainerWrapper.firstChild.firstChild).toEqual(frame1);
  });

  it('should drag and drop if element under mouse is a frame.parentNode', () => {
    const previewContainerWrapper = frame2.parentNode.parentNode;

    const div = document.createElement('DIV');
    previewContainerWrapper.firstChild.appendChild(div);

    const ev = {
      target: div,
    };

    const targetPos = document.createElement('DIV');
    targetPos.classList.add('target-position');
    framesContainer.insertBefore(targetPos, previewContainerWrapper);

    dragAndDrop(frames, framesContainer, previewContainerWrapper, targetPos, frame1)(ev);
    expect(previewContainerWrapper.firstChild.firstChild).toEqual(frame1);
  });

  it('should drag and drop if element under mouse is a frame.parentNode.parentNode', () => {
    const previewContainerWrapper = frame2.parentNode.parentNode;

    const div = document.createElement('DIV');
    const span = document.createElement('SPAN');
    div.appendChild(span);

    previewContainerWrapper.firstChild.appendChild(div);

    const ev = {
      target: span,
    };

    const targetPos = document.createElement('DIV');
    targetPos.classList.add('target-position');
    framesContainer.insertBefore(targetPos, previewContainerWrapper);

    dragAndDrop(frames, framesContainer, previewContainerWrapper, targetPos, frame1)(ev);
    expect(previewContainerWrapper.firstChild.firstChild).toEqual(frame1);
  });

  it('should set previewContainerWrapper position as relative and marginTop to 0', () => {
    const previewContainerWrapper = frame1.parentNode.parentNode;

    const div = document.createElement('DIV');
    const span = document.createElement('span');
    const i = document.createElement('i');
    span.appendChild(i);
    div.appendChild(span);

    const ev = {
      target: i,
    };

    const targetPos = document.createElement('DIV');
    targetPos.classList.add('target-position');
    framesContainer.insertBefore(targetPos, previewContainerWrapper);

    dragAndDrop(frames, framesContainer, previewContainerWrapper, targetPos, frame2)(ev);
    expect(previewContainerWrapper.style.position).toBe('relative');
    expect(previewContainerWrapper.style.marginTop).toBe('0px');
  });
});

describe('moveButtonMouseDown', () => {
  const frames = new Frames();
  frames.layerNumber += 1;
  frames.framesList[frames.layerNumber] = [];
  const frame1 = frames.addFrame();
  const framesContainer = frame1.parentNode.parentNode.parentNode;
  const previewContainerWrapper = frame1.parentNode.parentNode;

  it('should return a function', () => {
    const result = moveButtonMouseDown();
    expect(result).toBeInstanceOf(Function);
  });

  it('should save document.onmousemove as a result of moveButtonMoveEvent(e, previewContainerWrapper)', () => {
    const e = {
      currentTarget: framesContainer,
    };

    moveButtonMouseDown(frames, framesContainer, previewContainerWrapper)(e);

    expect(document.onmousemove !== null).toBe(true);
  });
});

describe('deleteButtonEvent', () => {
  const frames = new Frames();
  frames.layerNumber += 1;
  frames.framesList[frames.layerNumber] = [];
  const frame1 = frames.addFrame();

  it('should return a function', () => {
    const result = deleteButtonEvent(frames, frame1);
    result();

    expect(result).toBeInstanceOf(Function);
  });
});

describe('copyButtonEvent', () => {
  const frames = new Frames();
  frames.layerNumber += 1;
  frames.framesList[frames.layerNumber] = [];
  const frame1 = frames.addFrame();

  it('should return a function', () => {
    const result = copyButtonEvent(frames, frame1);
    result();

    expect(result).toBeInstanceOf(Function);
  });
});

describe('addFrameButtonClickEvent', () => {
  const frames = new Frames();
  frames.layerNumber += 1;
  frames.framesList[frames.layerNumber] = [];

  it('should return a function', () => {
    const result = addFrameButtonClickEvent(frames);
    result();

    expect(result).toBeInstanceOf(Function);
  });
});

describe('frameShorcuts', () => {
  const frames = new Frames();
  frames.layerNumber += 1;
  frames.framesList[frames.layerNumber] = [];
  const frame1 = frames.addFrame();

  it('should return a function', () => {
    const result = frameShorcuts(frames);
    expect(result).toBeInstanceOf(Function);
  });

  it('should add a frame if key N has pressed and shift hasn\'t', () => {
    const e = {
      code: 'KeyN',
      shiftKey: false,
    };

    const result = frameShorcuts(frames);
    result(e);

    expect(frames.framesList[frames.layerNumber].length).toBe(2);
  });

  it('should return if ArrowDown has pressed and shift hasn\'t and there is not next frame', () => {
    const e = {
      key: 'ArrowDown',
      shiftKey: false,
    };

    const result = frameShorcuts(frames);
    const { currentFrame } = frames;

    result(e);

    expect(currentFrame).toBe(frames.currentFrame);
  });

  it('should select next frame if ArrowDown has pressed and shift hasn\'t and there is next frame', () => {
    const e = {
      key: 'ArrowDown',
      shiftKey: false,
    };

    const result = frameShorcuts(frames);
    const { currentFrame } = frames;
    frames.addFrame();
    frames.currentFrame = frame1;
    result(e);

    const isCurrent = currentFrame === frames.currentFrame;
    expect(isCurrent).toBe(false);
  });

  it('should return if ArrowUp has pressed and shift hasn\'t and there is not previous frame', () => {
    const newFrames = new Frames();
    newFrames.layerNumber += 1;
    newFrames.framesList[newFrames.layerNumber] = [];
    const framesContainer = document.querySelector('.frames-select .frames-container');
    framesContainer.innerHTML = '';
    newFrames.addFrame();

    const e = {
      key: 'ArrowUp',
      shiftKey: false,
    };

    const result = frameShorcuts(newFrames);
    const { currentFrame } = newFrames;
    result(e);

    expect(currentFrame).toBe(newFrames.currentFrame);
  });

  it('should select previous frame if ArrowUp has pressed and shift hasn\'t and there is previous frame', () => {
    const newFrames = new Frames();
    newFrames.layerNumber += 1;
    newFrames.framesList[newFrames.layerNumber] = [];
    const framesContainer = document.querySelector('.frames-select .frames-container');
    framesContainer.innerHTML = '';
    const prevFrame = newFrames.addFrame();
    newFrames.addFrame();

    const e = {
      key: 'ArrowUp',
      shiftKey: false,
    };

    const result = frameShorcuts(newFrames);
    result(e);

    expect(prevFrame).toBe(newFrames.currentFrame);
  });

  it('should delete current frame if Backspace has pressed and shift hasn\'t', () => {
    const newFrames = new Frames();
    newFrames.layerNumber += 1;
    newFrames.framesList[newFrames.layerNumber] = [];
    const framesContainer = document.querySelector('.frames-select .frames-container');
    framesContainer.innerHTML = '';
    const prevFrame = newFrames.addFrame();
    newFrames.addFrame();

    const e = {
      key: 'Backspace',
      shiftKey: false,
    };

    const result = frameShorcuts(newFrames);
    result(e);

    expect(prevFrame).toBe(newFrames.currentFrame);
    expect(newFrames.framesList.length).toBe(1);
  });
});
