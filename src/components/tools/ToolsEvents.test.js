import {
  resetContextMenu,
  chooseToolSize,
  toolSizeSelectShortcuts,
  toolSelectShortcuts,
  mouseOutEvent,
  penToolMouseMove,
  mirrorPenToolMouseMove,
  paintBucketToolEvent,
  paintBucketAllToolEvent,
  moveToolMouseMove,
  mooveToolMouseUp,
  moveToolEvent,
  strokeEvent,
  rectEvent,
  ellipseEvent,
  triangleEvent,
  brightnessMove,
  ditheringMove,
  chooseColor,
  hex2rgba,
} from './ToolsEvents';

import Frames from '../frames-list/Frames';
import Tools from './Tools';

import { getElemAndCtx } from '../utils/utils';

import renderFrames from '../frames-list/frames.template';
import renderTools from './tools.template';
import renderPreview from '../../screens/preview/preview.template';
import renderLayers from '../layers-list/layers.template';

const renderHtml = () => {
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
      </div>

      <div class="frames-select">
      </div>

      <div class="layers-container">
      </div>

      <div class="menu">
      </div>
    </main>
  </div>
`;
};

renderHtml();
renderTools();
renderFrames();
renderPreview();
renderLayers();

describe('resetContextMenu', () => {
  it('should call e.preventDefault()', () => {
    const canv = document.createElement('CANVAS');
    const e = {
      target: canv,
      preventDefault: jest.fn(),
    };

    resetContextMenu(e);
    expect(e.preventDefault).toHaveBeenCalled();
  });
});

describe('chooseToolSize', () => {
  const frames = new Frames();
  const tools = new Tools(frames);

  it('should retun a function', () => {
    const result = chooseToolSize(tools);
    expect(result).toBeInstanceOf(Function);
  });

  it('should return if e.target is no LI element', () => {
    const div = document.createElement('DIV');
    const e = {
      target: div,
    };
    const result = chooseToolSize(tools);

    result(e);
    expect(tools.toolSize).toBe(1);
  });

  it('should return if there is selectedTool and this tool is a paint-bucket or paint-bucket-all or magic-eraser', () => {
    const li = document.createElement('LI');
    tools.selectedTool = document.querySelector('.paint-bucket');
    const e = {
      target: li,
    };
    const result = chooseToolSize(tools);

    result(e);
    expect(tools.toolSize).toBe(1);

    tools.selectedTool = document.querySelector('.paint-bucket-all');
    result(e);
    expect(tools.toolSize).toBe(1);

    tools.selectedTool = document.querySelector('.magic-eraser');
    result(e);
    expect(tools.toolSize).toBe(1);
  });

  it('should select a current tool size', () => {
    const size1 = document.querySelector('.tool-size .px1');
    const size2 = document.querySelector('.tool-size .px2');
    const size3 = document.querySelector('.tool-size .px3');
    const size4 = document.querySelector('.tool-size .px4');

    tools.selectedTool = document.querySelector('.pen');

    const e = {
      target: size1,
    };
    let result = chooseToolSize(tools);

    result(e);
    expect(tools.toolSize).toBe(1);

    e.target = size2;
    result = chooseToolSize(tools);

    result(e);
    expect(tools.toolSize).toBe(2);

    e.target = size3;
    result = chooseToolSize(tools);

    result(e);
    expect(tools.toolSize).toBe(3);

    e.target = size4;
    result = chooseToolSize(tools);

    result(e);
    expect(tools.toolSize).toBe(4);
  });
});

describe('toolSizeSelectShortcuts', () => {
  const frames = new Frames();
  const tools = new Tools(frames);
  tools.selectedSize = document.querySelector('.tool-size .px1');

  it('should return a function', () => {
    const result = toolSizeSelectShortcuts(tools);
    expect(result).toBeInstanceOf(Function);
  });

  it('should return if there is selectedTool and this tool is a paint-bucket or paint-bucket-all or magic-eraser', () => {
    tools.selectedTool = document.querySelector('.paint-bucket');
    let result = toolSizeSelectShortcuts(tools);
    result();

    expect(tools.toolSize).toBe(1);

    tools.selectedTool = document.querySelector('.paint-bucket-all');
    result = toolSizeSelectShortcuts(tools);
    result();

    expect(tools.toolSize).toBe(1);

    tools.selectedTool = document.querySelector('.magic-eraser');
    result = toolSizeSelectShortcuts(tools);
    result();

    expect(tools.toolSize).toBe(1);
  });

  it('should select tool size as 1 if key 1 has pressed', () => {
    tools.selectedTool = document.querySelector('.pen');
    const result = toolSizeSelectShortcuts(tools);
    const e = {
      key: '1',
    };

    result(e);
    expect(tools.toolSize).toBe(1);
  });

  it('should select tool size as 2 if key 2 has pressed', () => {
    tools.selectedTool = document.querySelector('.pen');
    const result = toolSizeSelectShortcuts(tools);
    const e = {
      key: '2',
    };

    result(e);
    expect(tools.toolSize).toBe(2);
  });

  it('should select tool size as 3 if key 3 has pressed', () => {
    tools.selectedTool = document.querySelector('.pen');
    const result = toolSizeSelectShortcuts(tools);
    const e = {
      key: '3',
    };

    result(e);
    expect(tools.toolSize).toBe(3);
  });

  it('should select tool size as 4 if key 4 has pressed', () => {
    tools.selectedTool = document.querySelector('.pen');
    const result = toolSizeSelectShortcuts(tools);
    const e = {
      key: '4',
    };

    result(e);
    expect(tools.toolSize).toBe(4);
  });
});

describe('toolSelectShortcuts', () => {
  const frames = new Frames();
  const tools = new Tools(frames);

  it('should return a function', () => {
    const result = toolSelectShortcuts(tools);
    expect(result).toBeInstanceOf(Function);
  });

  it('should select pen tool if key P has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyP',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .pen'));
  });

  it('should select mirror-pen tool if key V has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyV',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .mirror-pen'));
  });

  it('should select paint-bucket tool if key B has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyB',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .paint-bucket'));
  });

  it('should select paint-bucket-all tool if key A has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyA',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .paint-bucket-all'));
  });

  it('should select eraser tool if key E has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyE',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .eraser'));
  });

  it('should select magic-eraser tool if key G has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyG',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .magic-eraser'));
  });

  it('should select stroke tool if key S has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyS',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .stroke'));
  });

  it('should select rect tool if key R has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyR',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .rect'));
  });

  it('should select ellipse tool if key C has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyC',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .ellipse'));
  });

  it('should select triangle tool if key T has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyT',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .triangle'));
  });

  it('should select darken tool if key D has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyD',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .darken'));
  });

  it('should select lighten tool if key L has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyL',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .lighten'));
  });

  it('should select move tool if key M has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyM',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .move'));
  });

  it('should select dithering tool if key I has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyI',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .dithering'));
  });

  it('should select color-picker tool if key O has pressed', () => {
    const result = toolSelectShortcuts(tools);
    const e = {
      code: 'KeyO',
    };

    result(e);
    expect(tools.selectedTool).toBe(document.querySelector('.tools-select .color-picker'));
  });
});

describe('mouseOutEvent', () => {
  const frames = new Frames();
  const tools = new Tools(frames);
  const { canv: hoverCanv, ctx: hoverCtx } = getElemAndCtx('.canvas-container .hover-layer');
  const imgData = hoverCtx.getImageData(0, 0, hoverCanv.width, hoverCanv.height);

  hoverCtx.putImageData = jest.fn();

  it('should return a function', () => {
    const result = mouseOutEvent();
    expect(result).toBeInstanceOf(Function);
  });

  it('should return if tool.isMouseDown', () => {
    tools.isMouseDown = true;
    const result = mouseOutEvent(tools, imgData, hoverCanv, hoverCtx);
    result();

    expect(hoverCtx.putImageData).toHaveBeenCalledTimes(0);
  });

  it('should call hoverCtx.putImageData', () => {
    tools.isMouseDown = false;
    const result = mouseOutEvent(tools, imgData, hoverCanv, hoverCtx);
    result();

    expect(hoverCtx.putImageData).toHaveBeenCalled();
  });
});

describe('penToolMouseMove', () => {
  const frames = new Frames();
  const tools = new Tools(frames);

  it('should return a function', () => {
    const result = penToolMouseMove();
    expect(result).toBeInstanceOf(Function);
  });

  it('should return if !context.isMouseDown', () => {
    tools.isMouseDown = false;
    tools.tempX = 10;
    const result = penToolMouseMove(tools, 'rgba(12, 23, 43, 255)');

    result();
    expect(tools.tempX).toBe(10);
  });

  it('should return if tempX and tempY is current', () => {
    tools.isMouseDown = true;
    tools.canv.style.width = '32px';
    tools.tempX = 10;
    tools.tempY = 10;
    const result = penToolMouseMove(tools, 'rgba(12, 23, 43, 255)');

    const e = {
      offsetX: 10,
      offsetY: 10,
    };

    result(e);
    expect(tools.tempX).toBe(10);
    expect(tools.tempY).toBe(10);
  });

  it('should save current tools.tempX and tools.tempY', () => {
    tools.isMouseDown = true;
    tools.canv.style.width = '32px';
    tools.tempX = 5;
    tools.tempY = 5;
    let result = penToolMouseMove(tools, 'rgba(12, 23, 43, 255)');
    let e = {
      offsetX: 10,
      offsetY: 10,
    };

    result(e);
    expect(tools.tempX).toBe(10);
    expect(tools.tempY).toBe(10);

    result = penToolMouseMove(tools);
    e = {
      offsetX: 20,
      offsetY: 10,
      which: 3,
    };

    result(e);
    expect(tools.tempX).toBe(20);
    expect(tools.tempY).toBe(10);

    result = penToolMouseMove(tools);
    e = {
      offsetX: 5,
      offsetY: 15,
      which: 1,
    };

    result(e);
    expect(tools.tempX).toBe(5);
    expect(tools.tempY).toBe(15);
  });
});

describe('mirrorPenToolMouseMove', () => {
  const frames = new Frames();
  const tools = new Tools(frames);

  it('should return a function', () => {
    const result = mirrorPenToolMouseMove();
    expect(result).toBeInstanceOf(Function);
  });

  it('should return if !context.isMouseDown', () => {
    tools.isMouseDown = false;
    tools.tempX = 10;
    const result = mirrorPenToolMouseMove(tools);

    result();
    expect(tools.tempX).toBe(10);
  });

  it('should return if tempX and tempY is current', () => {
    tools.isMouseDown = true;
    tools.canv.style.width = '32px';
    tools.tempX = 10;
    tools.tempY = 10;
    const result = mirrorPenToolMouseMove(tools);

    const e = {
      offsetX: 10,
      offsetY: 10,
    };

    result(e);
    expect(tools.tempX).toBe(10);
    expect(tools.tempY).toBe(10);
  });

  it('should save current tools.tempX and tools.tempY', () => {
    tools.isMouseDown = true;
    tools.canv.style.width = '32px';
    tools.tempX = 5;
    tools.tempY = 5;
    let result = mirrorPenToolMouseMove(tools);
    let e = {
      offsetX: 10,
      offsetY: 10,
      which: 3,
    };

    result(e);
    expect(tools.tempX).toBe(10);
    expect(tools.tempY).toBe(10);

    result = mirrorPenToolMouseMove(tools);
    e = {
      offsetX: 5,
      offsetY: 15,
      which: 1,
    };

    result(e);
    expect(tools.tempX).toBe(5);
    expect(tools.tempY).toBe(15);
  });
});

describe('paintBucketToolEvent', () => {
  const frames = new Frames();
  const tools = new Tools(frames);

  it('should return a function', () => {
    const result = paintBucketToolEvent();
    expect(result).toBeInstanceOf(Function);
  });

  it('should call tools.switchLayers', () => {
    tools.switchLayers = jest.fn();

    const e = {
      offsetX: 5,
      offsetY: 15,
    };

    let result = paintBucketToolEvent(tools, 'rgba(12, 4, 13, 255)');
    result(e);

    result = paintBucketToolEvent(tools);
    e.which = 3;
    result(e);

    e.which = 1;
    result(e);

    expect(tools.switchLayers).toHaveBeenCalledTimes(3);
  });
});

describe('paintBucketAllToolEvent', () => {
  const frames = new Frames();
  const tools = new Tools(frames);

  it('should return a function', () => {
    const result = paintBucketAllToolEvent();
    expect(result).toBeInstanceOf(Function);
  });

  it('should fill background in tools.color if mouse left button has pressed', () => {
    const e = {
      which: 1,
    };

    const result = paintBucketAllToolEvent(tools);
    result(e);

    expect(tools.ctx.fillStyle).toBe(tools.color);
  });

  it('should fill background in tools.secondColor if mouse right button has pressed', () => {
    const e = {
      which: 3,
    };

    const result = paintBucketAllToolEvent(tools);
    result(e);

    expect(tools.ctx.fillStyle).toBe(tools.secondColor);
  });
});

describe('moveToolMouseMove', () => {
  const frames = new Frames();
  const tools = new Tools(frames);

  it('should return a function', () => {
    const result = moveToolMouseMove();
    expect(result).toBeInstanceOf(Function);
  });

  it('should return if !tools.isMouseDown', () => {
    tools.isMouseDown = false;
    tools.tempX = 10;

    const result = moveToolMouseMove(tools);
    result();

    expect(tools.tempX).toBe(10);
  });

  it('should save current tools.tempX and tools.tempY', () => {
    tools.isMouseDown = true;
    tools.tempX = 5;
    tools.tempY = 5;

    const imgData = tools.ctx.createImageData(tools.canv.width, tools.canv.height);
    const resetImgData = tools.ctx.createImageData(tools.canv.width, tools.canv.height);

    const e = {
      pageX: 10,
      pageY: 10,
    };

    const ev = {
      pageX: 5,
      pageY: 5,
      offsetX: 10,
      offsetY: 10,
    };

    const result = moveToolMouseMove(tools, e, imgData, resetImgData, 1);
    result(ev);

    expect(tools.tempX).toBe(10);
    expect(tools.tempX).toBe(10);
  });
});

describe('mooveToolMouseUp', () => {
  const frames = new Frames();
  const tools = new Tools(frames);

  it('should return a function', () => {
    const result = mooveToolMouseUp();
    expect(result).toBeInstanceOf(Function);
  });

  it('should set tools.isMouseDown in false and tools.canv.onmousemove in null', () => {
    tools.isMouseDown = true;
    tools.canv.onmousemove = () => { };
    const result = mooveToolMouseUp(tools);

    result();
    expect(tools.isMouseDown).toBe(false);
    expect(tools.canv.onmousemove).toBe(null);
  });
});

describe('moveToolEvent', () => {
  const frames = new Frames();
  const tools = new Tools(frames);

  it('should return a function', () => {
    const result = moveToolEvent();
    expect(result).toBeInstanceOf(Function);
  });

  it('should set tools.isMouseDown in true', () => {
    tools.isMouseDown = false;
    const result = moveToolEvent(tools);

    result();
    expect(tools.isMouseDown).toBe(true);
  });
});

describe('strokeEvent', () => {
  const frames = new Frames();
  const tools = new Tools(frames);
  const { canv: hoverCanv, ctx: hoverCtx } = getElemAndCtx('.canvas-container .hover-layer');

  it('should return a function', () => {
    const result = strokeEvent();
    expect(result).toBeInstanceOf(Function);
  });

  it('should set tools.isMouseDown in true', () => {
    tools.isMouseDown = false;
    const result = strokeEvent(tools, hoverCanv, hoverCtx);

    const e = {
      which: 3,
    };

    result(e);
    e.which = 1;
    result(e);
    expect(tools.isMouseDown).toBe(true);
  });
});

describe('rectEvent', () => {
  const frames = new Frames();
  const tools = new Tools(frames);
  const { canv: hoverCanv, ctx: hoverCtx } = getElemAndCtx('.canvas-container .hover-layer');

  it('should return a function', () => {
    const result = rectEvent();
    expect(result).toBeInstanceOf(Function);
  });

  it('should set tools.isMouseDown in true', () => {
    tools.isMouseDown = false;
    const result = rectEvent(tools, hoverCanv, hoverCtx);

    const e = {
      which: 3,
    };

    result(e);
    e.which = 1;
    result(e);
    expect(tools.isMouseDown).toBe(true);
  });
});

describe('ellipseEvent', () => {
  const frames = new Frames();
  const tools = new Tools(frames);
  const { canv: hoverCanv, ctx: hoverCtx } = getElemAndCtx('.canvas-container .hover-layer');

  it('should return a function', () => {
    const result = ellipseEvent();
    expect(result).toBeInstanceOf(Function);
  });

  it('should set tools.isMouseDown in true', () => {
    tools.isMouseDown = false;
    const result = ellipseEvent(tools, hoverCanv, hoverCtx);

    const e = {
      which: 3,
    };

    result(e);
    e.which = 1;
    result(e);
    expect(tools.isMouseDown).toBe(true);
  });
});

describe('triangleEvent', () => {
  const frames = new Frames();
  const tools = new Tools(frames);
  const { canv: hoverCanv, ctx: hoverCtx } = getElemAndCtx('.canvas-container .hover-layer');

  it('should return a function', () => {
    const result = triangleEvent();
    expect(result).toBeInstanceOf(Function);
  });

  it('should set tools.isMouseDown in true', () => {
    tools.isMouseDown = false;
    const result = triangleEvent(tools, hoverCanv, hoverCtx);

    const e = {
      which: 3,
    };

    result(e);
    e.which = 1;
    result(e);
    expect(tools.isMouseDown).toBe(true);
  });
});

describe('brightnessMove', () => {
  const frames = new Frames();
  const tools = new Tools(frames);

  it('should return a function', () => {
    const result = brightnessMove();
    expect(result).toBeInstanceOf(Function);
  });

  it('should return if !tools.isMouseDown', () => {
    tools.isMouseDown = false;
    tools.tempX = -1;

    const result = brightnessMove(tools, 1);
    result();

    expect(tools.tempX).toBe(-1);
  });

  it('should set current tools.tempX and tools.tempY', () => {
    tools.isMouseDown = true;
    tools.tempX = -1;
    tools.tempY = -1;

    const e = {
      offsetX: 10,
      offsetY: 10,
    };

    const result = brightnessMove(tools, 1);
    result(e);

    expect(tools.tempX).toBe(10);
    expect(tools.tempY).toBe(10);
  });

  it('should call tools.ctx.putImageData', () => {
    tools.isMouseDown = true;
    tools.ctx.putImageData = jest.fn();

    const e = {
      offsetX: 10,
      offsetY: 10,
    };

    const result = brightnessMove(tools, 1);
    result(e);

    expect(tools.ctx.putImageData).toHaveBeenCalled();
  });
});

describe('ditheringMove', () => {
  const frames = new Frames();
  const tools = new Tools(frames);

  it('should return a function', () => {
    const result = ditheringMove();
    expect(result).toBeInstanceOf(Function);
  });

  it('should return if !tools.isMouseDown', () => {
    tools.isMouseDown = false;
    tools.tempX = -1;

    const result = ditheringMove(tools);
    result();

    expect(tools.tempX).toBe(-1);
  });

  it('should return if tools.tempX and tools.tempY are current', () => {
    tools.isMouseDown = true;
    tools.tempX = 10;
    tools.tempY = 10;

    const e = {
      offsetX: 10,
      offsetY: 10,
    };

    const result = ditheringMove(tools);
    result(e);

    expect(tools.tempX).toBe(10);
    expect(tools.tempY).toBe(10);
  });

  it('should set current tools.tempX and tools.tempY', () => {
    tools.isMouseDown = true;
    tools.tempX = -1;
    tools.tempY = -1;

    const e = {
      offsetX: 10,
      offsetY: 10,
      which: 3,
    };

    const result = ditheringMove(tools);
    result(e);

    expect(tools.tempX).toBe(10);
    expect(tools.tempY).toBe(10);
  });

  it('should call tools.ctx.putImageData', () => {
    tools.isMouseDown = true;
    tools.tempX = -1;
    tools.tempY = -1;
    tools.ctx.putImageData = jest.fn();

    const e = {
      offsetX: 10,
      offsetY: 10,
      which: 1,
    };

    const result = ditheringMove(tools, 1);
    result(e);

    expect(tools.ctx.putImageData).toHaveBeenCalled();
  });
});

describe('hex2rgba', () => {
  it('should set opasity as 255 if there is no second argument', () => {
    const result = hex2rgba('#000000');
    expect(result).toBe('rgba(0,0,0,255)');
  });

  it('should convert color from hex to rgba', () => {
    const result = hex2rgba('#000000', 12);
    expect(result).toBe('rgba(0,0,0,12)');
  });
});

describe('chooseColor', () => {
  const frames = new Frames();
  const tools = new Tools(frames);

  const colorPallete = document.querySelector('.choose-color .color');
  const secondColorPallete = document.querySelector('.choose-color .second-color');

  it('should return a function', () => {
    const result = chooseColor();
    expect(result).toBeInstanceOf(Function);
  });

  it('should set context.color as colorPallete.value if colorPallete is e.target', () => {
    const result = chooseColor(tools, colorPallete, secondColorPallete);
    colorPallete.value = '#ffffff';
    const e = {
      target: colorPallete,
    };

    result(e);
    expect(tools.color).toBe('rgba(255,255,255,255)');
  });

  it('should set context.color as secondColorPallete.value if secondColorPallete is e.target', () => {
    const result = chooseColor(tools, colorPallete, secondColorPallete);
    colorPallete.value = '#ffffff';
    const e = {
      target: secondColorPallete,
    };

    result(e);
    expect(tools.color).toBe('rgba(255,255,255,255)');
  });
});
