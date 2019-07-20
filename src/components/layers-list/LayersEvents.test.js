import {
  changeSize,
  zoomEvent,
  chooseCanvasSize,
  canvasSizeShortcut,
  addCoords,
  addCoordsEvent,
  removeCoordsEvent,
  layerClickEvent,
  addLayerEvent,
  addLayerShortcut,
  removeLayerEvent,
  removeLayerShortcut,
  moveLayerEvent,
  moveDownShortcut,
  moveUpShortcut,
} from './LayersEvents';

import Frames from '../frames-list/Frames';
import Layers from './Layers';

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

describe('changeSize', () => {
  const frames = new Frames();
  frames.addEvents();
  const layers = new Layers(frames);
  layers.addEvents();

  const canvasContainer = layers.layer.parentNode;
  const layerContainer = canvasContainer.parentNode;

  it('should return a functrion', () => {
    const result = changeSize(layers);

    expect(result).toBeInstanceOf(Function);
  });

  it('should change size of canvasContainer as layerWidth - delta if layerWidth <= canvasWidth', () => {
    changeSize(layers)();
    expect(canvasContainer.style.width).toBe('0px');
    expect(canvasContainer.style.height).toBe('0px');
  });

  it('should change size of canvasContainer as layerContainerStyle.height if layerWidth > canvasWidth', () => {
    layerContainer.style.height = '1300px';
    layerContainer.style.width = '1400px';
    changeSize(layers)();
    expect(canvasContainer.style.width).toBe('1300px');
    expect(canvasContainer.style.height).toBe('1300px');
  });

  it('should change size of canvasContainer as layerContainerStyle.width if layerWidth <= canvasWidth', () => {
    layerContainer.style.height = '1500px';
    changeSize(layers)();
    expect(canvasContainer.style.width).toBe('1400px');
    expect(canvasContainer.style.height).toBe('1400px');
  });
});

describe('zoomEvent', () => {
  const frames = new Frames();
  frames.addEvents();
  const layers = new Layers(frames);
  layers.addEvents();
  const canv = document.createElement('CANVAS');
  const canvasScale = document.querySelector('.canv-scale');

  const e = {
    preventDefault: jest.fn(),
    deltaY: 3,
  };

  const result = zoomEvent(layers, canv);
  it('should return a function', () => {
    expect(result).toBeInstanceOf(Function);
  });

  it('should scale canv', () => {
    result(e);
    expect(canv.style.transform).toBe('scale(4)');
  });

  it('should set innerText with zoom to canvasScale', () => {
    result(e);
    expect(canvasScale.innerText).toBe('x0.00');
  });

  it('should call e.preventDefault', () => {
    result(e);
    expect(e.preventDefault).toBeCalled();
  });
});

describe('chooseCanvasSize', () => {
  const frames = new Frames();
  frames.addEvents();
  const layers = new Layers(frames);
  layers.addEvents();

  const size1 = document.querySelector('.canvas-size .px32');
  const size2 = document.querySelector('.canvas-size .px64');
  const size3 = document.querySelector('.canvas-size .px128');

  it('should return a function', () => {
    const result = chooseCanvasSize(layers, size1);
    expect(result).toBeInstanceOf(Function);
  });

  it('should return if target is not button', () => {
    const div = document.createElement('div');
    const e = {
      target: div,
    };

    const result = chooseCanvasSize(layers);
    result(e);

    expect(layers.frames.canvSize).toBe(32);
  });

  it('should change canv size', () => {
    let result = chooseCanvasSize(layers, size1);
    result();

    expect(layers.frames.canvSize).toBe(32);

    result = chooseCanvasSize(layers, size2);
    result();

    expect(layers.frames.canvSize).toBe(64);

    result = chooseCanvasSize(layers, size3);
    result();

    expect(layers.frames.canvSize).toBe(128);

    const button = document.createElement('BUTTON');
    const e = {
      target: button,
    };

    result = chooseCanvasSize(layers);
    result(e);

    expect(layers.frames.canvSize).toBe(32);
  });
});

describe('canvasSizeShortcut', () => {
  const frames = new Frames();
  frames.addEvents();
  const layers = new Layers(frames);
  layers.addEvents();

  it('should return a function', () => {
    const result = canvasSizeShortcut(layers);
    expect(result).toBeInstanceOf(Function);
  });

  it('should select canvas size as 32 if digit1 and shift had pressed', () => {
    const e = {
      code: 'Digit1',
      shiftKey: true,
    };

    canvasSizeShortcut(layers)(e);
    expect(layers.frames.canvSize).toBe(32);
  });

  it('should select canvas size as 64 if digit2 and shift had pressed', () => {
    const e = {
      code: 'Digit2',
      shiftKey: true,
    };

    canvasSizeShortcut(layers)(e);
    expect(layers.frames.canvSize).toBe(64);
  });

  it('should select canvas size as 128 if digit3 and shift had pressed', () => {
    const e = {
      code: 'Digit3',
      shiftKey: true,
    };

    canvasSizeShortcut(layers)(e);
    expect(layers.frames.canvSize).toBe(128);
  });
});

describe('addCoords', () => {
  const layer = document.querySelector('.canvas-container .layer');
  layer.width = 32;
  layer.style.width = '32px';
  const hoverLayer = document.querySelector('.canvas-container .hover-layer');
  hoverLayer.width = 32;
  hoverLayer.style.width = '32px';
  const coordsInfo = document.querySelector('.canvas-info .coords');

  it('should return a function', () => {
    const result = addCoords(layer, hoverLayer, coordsInfo);
    expect(result).toBeInstanceOf(Function);
  });

  it('should set coords in coordsInfo.innerText', () => {
    const result = addCoords(layer, hoverLayer, coordsInfo);
    const e = {
      target: layer,
      offsetX: 10,
      offsetY: 10,
    };

    result(e);
    expect(coordsInfo.innerText).toBe('40 : 40');

    e.target = hoverLayer;
    e.offsetX = 20;
    e.offsetY = 20;

    result(e);
    expect(coordsInfo.innerText).toBe('80 : 80');
  });
});

describe('addCoordsEvent', () => {
  const layer = document.querySelector('.canvas-container .layer');
  layer.width = 32;
  layer.style.width = '32px';
  const hoverLayer = document.querySelector('.canvas-container .hover-layer');
  hoverLayer.width = 32;
  hoverLayer.style.width = '32px';
  const coordsInfo = document.querySelector('.canvas-info .coords');

  it('should return a function', () => {
    const result = addCoordsEvent(layer, hoverLayer, coordsInfo);

    expect(result).toBeInstanceOf(Function);
  });

  it('should add coords', () => {
    const result = addCoordsEvent(layer, hoverLayer, coordsInfo);

    result();
    expect(coordsInfo.style.display).toBe('inline');
  });
});

describe('removeCoordsEvent', () => {
  const coordsInfo = document.querySelector('.canvas-info .coords');

  it('should return function', () => {
    const result = removeCoordsEvent(coordsInfo);
    expect(result).toBeInstanceOf(Function);
  });

  it('should remove coords', () => {
    const result = removeCoordsEvent(coordsInfo);
    result();

    expect(coordsInfo.style.display).toBe('none');
  });
});

describe('layerClickEvent', () => {
  const frames = new Frames();
  frames.addEvents();
  const layers = new Layers(frames);
  layers.addEvents();
  layers.addLayer();
  layers.addLayer();

  const layersList = document.querySelector('.layers-menu .layers-list');
  const framesContainer = document.querySelector('.frames-select .frames-container');

  framesContainer.innerHTML = '';
  layers.frames.layerNumber = layers.frames.framesList.length;
  const { layerNumber } = layers.frames;
  layers.frames.framesList[layerNumber] = [];
  layers.frames.addFrame();
  const layer = document.createElement('LI');
  layer.classList.add('layer');
  layer.innerText = `layer ${layers.frames.framesList.length}`;

  if (layers.selectedLayer) {
    layers.selectedLayer.classList.remove('active');
  }
  layer.classList.add('active');
  layers.selectedLayer = layer;
  layersList.innerHTML = '';
  layersList.appendChild(layer);

  it('should return a function', () => {
    const result = layerClickEvent(layers, layer, framesContainer, layerNumber, layersList);

    expect(result).toBeInstanceOf(Function);
  });

  it('should select a current layer', () => {
    const result = layerClickEvent(layers, layer, framesContainer, layerNumber, layersList);
    result();

    expect(layers.frames.layerNumber).toBe(0);
  });
});

describe('addLayerEvent', () => {
  const frames = new Frames();
  frames.addEvents();
  const layers = new Layers(frames);
  layers.addEvents();

  it('should return a function', () => {
    const result = addLayerEvent(layers);
    result();

    expect(result).toBeInstanceOf(Function);
  });
});

describe('addLayerShortcut', () => {
  const frames = new Frames();
  frames.addEvents();
  const layers = new Layers(frames);
  layers.addEvents();

  const e = {
    code: 'KeyN',
    shiftKey: true,
  };

  it('should return a function', () => {
    const result = addLayerShortcut(layers);
    result(e);

    expect(result).toBeInstanceOf(Function);
  });
});

describe('removeLayerEvent', () => {
  const frames = new Frames();
  frames.addEvents();

  const layers = new Layers(frames);
  layers.addEvents();

  it('should return a function', () => {
    const result = removeLayerEvent(layers);
    expect(result).toBeInstanceOf(Function);
  });

  it('should return if there are < 2 layers', () => {
    const result = removeLayerEvent(layers);
    result();

    expect(layers.frames.framesList.length).toBe(1);
  });

  it('should remove layer if there are 2 layers or more', () => {
    layers.addLayer();
    layers.addLayer();
    const result = removeLayerEvent(layers);
    result();

    expect(layers.frames.framesList.length).toBe(2);
  });
});

describe('removeLayerShortcut', () => {
  const frames = new Frames();
  frames.addEvents();

  const layers = new Layers(frames);
  layers.addEvents();

  it('should return a function', () => {
    const result = removeLayerShortcut(layers);
    expect(result).toBeInstanceOf(Function);
  });

  it('should remove layer if there are 2 layers or more and Backspace and shift had pressed', () => {
    layers.addLayer();
    layers.addLayer();
    const result = removeLayerShortcut(layers);

    const e = {
      key: 'Backspace',
      shiftKey: true,
    };

    result(e);

    expect(layers.frames.framesList.length).toBe(2);
  });
});

describe('moveLayerEvent', () => {
  const frames = new Frames();
  frames.addEvents();

  const layers = new Layers(frames);
  layers.addEvents();

  const layersList = document.querySelector('.layers-menu .layers-list');

  it('should return a function', () => {
    layersList.innerHTML = '';
    const result = moveLayerEvent(layers, 1);
    expect(result).toBeInstanceOf(Function);
  });

  it('should return if there is no next layer', () => {
    layers.addLayer();
    layers.frames.layerNumber = 0;
    const result = moveLayerEvent(layers, 1);
    result();

    expect(layers.frames.layerNumber).toBe(0);
  });

  it('should move layer up if d > 0', () => {
    layers.addLayer();
    layers.addLayer();
    layers.frames.layerNumber = 0;

    const result = moveLayerEvent(layers, 1);
    result();

    expect(layers.frames.layerNumber).toBe(1);
  });

  it('should move layer down if d <= 0', () => {
    layers.addLayer();
    layers.addLayer();
    layers.frames.layerNumber = 3;

    const result = moveLayerEvent(layers, -1);
    result();

    expect(layers.frames.layerNumber).toBe(2);
  });
});

describe('moveDownShortcut', () => {
  const frames = new Frames();
  frames.addEvents();

  const layers = new Layers(frames);
  layers.addEvents();

  const layersList = document.querySelector('.layers-menu .layers-list');

  it('should return a function', () => {
    layersList.innerHTML = '';
    const result = moveDownShortcut(layers, -1);
    expect(result).toBeInstanceOf(Function);
  });

  it('should move layer down if d <= 0, arrow down and shift had pressed', () => {
    layers.addLayer();
    layers.addLayer();
    layers.frames.layerNumber = 1;

    const result = moveDownShortcut(layers, -1);

    const e = {
      key: 'ArrowDown',
      shiftKey: true,
    };

    result(e);

    expect(layers.frames.layerNumber).toBe(0);
  });
});


describe('moveUpShortcut', () => {
  const frames = new Frames();
  frames.addEvents();

  const layers = new Layers(frames);
  layers.addEvents();

  const layersList = document.querySelector('.layers-menu .layers-list');

  it('should return a function', () => {
    layersList.innerHTML = '';
    const result = moveUpShortcut(layers, 1);
    expect(result).toBeInstanceOf(Function);
  });

  it('should move layer up if d > 0, arrow up and shift had pressed', () => {
    layers.addLayer();
    layers.addLayer();
    layers.frames.layerNumber = 0;

    const result = moveUpShortcut(layers, 1);

    const e = {
      key: 'ArrowUp',
      shiftKey: true,
    };

    result(e);

    expect(layers.frames.layerNumber).toBe(1);
  });
});
