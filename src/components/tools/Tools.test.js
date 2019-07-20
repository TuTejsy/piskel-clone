import Frames from '../frames-list/Frames';
import Tools from './Tools';

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

describe('Tools.prototype.addEvents', () => {
  it('should call tools.addSelectEvent', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    tools.addSelectEvent = jest.fn();
    tools.addEvents();

    expect(tools.addSelectEvent).toHaveBeenCalled();
  });

  it('should call tools.addChooseToolSizeEvent', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    tools.addChooseToolSizeEvent = jest.fn();
    tools.addEvents();

    expect(tools.addChooseToolSizeEvent).toHaveBeenCalled();
  });

  it('should call tools.addChooseColorEvent', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    tools.addChooseColorEvent = jest.fn();
    tools.addEvents();

    expect(tools.addChooseColorEvent).toHaveBeenCalled();
  });

  it('should call document.addEventListener 3 times', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    document.addEventListener = jest.fn();
    tools.addEvents();

    expect(document.addEventListener).toHaveBeenCalledTimes(3);
  });
});

describe('Tools.prototype.selectTool', () => {
  it('should return if e.target is not a tool or tool is selected', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.pen');
    tool.classList.add('selected');
    tools.selectedTool = 'check';

    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe('check');

    tool.classList.remove('tool');
    e.target = tool.firstChild;
    e.target.tagName = 'I';

    tools.selectTool(e);
    expect(tools.selectedTool).toBe('check');
  });

  it('should call tools.changeTool and tools.resetEvents', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.pen');
    tool.classList.add('tool');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.changeTool = jest.fn();
    tools.resetEvents = jest.fn();

    tools.selectTool(e);
    expect(tools.changeTool).toHaveBeenCalled();
    expect(tools.resetEvents).toHaveBeenCalled();
  });

  it('should select pen tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.pen');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };
    tools.selectedTool = document.querySelector('.mirror-pen');

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select mirror-pen tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.mirror-pen');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select eraser tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.eraser');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select magic-eraser tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.magic-eraser');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select paint-bucket tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.paint-bucket');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select paint-bucket-all tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.paint-bucket-all');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select move tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.move');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select stroke tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.stroke');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select rect tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.rect');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select ellipse tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.ellipse');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select triangle tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.triangle');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select lighten tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.lighten');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select darken tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.darken');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select dithering tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.dithering');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });

  it('should select color-picker tool if it is target', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const tool = document.querySelector('.color-picker');
    tool.classList.remove('selected');
    const e = {
      target: tool,
    };

    tools.selectTool(e);
    expect(tools.selectedTool).toBe(tool);
  });
});

describe('Tools.prototype.colorPickerTool', () => {
  const colorPallete = document.querySelector('.choose-color .color');
  const secondColorPallete = document.querySelector('.choose-color .second-color');

  it('should call tools.resetEvents()', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    const e = {
      which: 3,
    };
    tools.resetEvents = jest.fn();

    tools.colorPickerTool(e, 0, 0);
    expect(tools.resetEvents).toHaveBeenCalled();
  });

  it('should set tools.color and colorPallete.value as color of current pixel if left mouse button has pressed', () => {
    const frames = new Frames();
    const tools = new Tools(frames);

    const e = {
      which: 1,
    };

    tools.colorPickerTool(e, 1, 1);
    expect(tools.color).toBe('rgba(0, 0, 0, 255)');
    expect(colorPallete.value).toBe('#000000');
  });

  it('should set tools.secondColor and secondColorPallete as color of current pixel if right mouse button has pressed', () => {
    const frames = new Frames();
    const tools = new Tools(frames);

    const e = {
      which: 3,
    };

    tools.colorPickerTool(e, 1, 1);
    expect(tools.secondColor).toBe('rgba(0, 0, 0, 255)');
    expect(secondColorPallete.value).toBe('#000000');
  });
});

describe('Tools.prototype.pointer', () => {
  it('should return if there is no selected tool', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    tools.tempX = -1;
    tools.selectedTool = null;

    tools.pointer();
    expect(tools.tempX).toBe(-1);
  });

  it('should return if tempX and tempY are current coords', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    tools.tempX = 10;
    tools.tempY = 10;
    tools.selectedTool = document.querySelector('.pen');
    const hoverCanv = document.querySelector('.canvas-container .hover-layer');
    hoverCanv.style.width = '32px';
    hoverCanv.style.height = '32px';

    const e = {
      offsetX: 10,
      offsetY: 10,
    };

    tools.pointer(e);

    expect(tools.tempX).toBe(10);
    expect(tools.tempY).toBe(10);
  });

  it('should set current tempX and tempY', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    tools.tempX = 1;
    tools.tempY = 1;
    tools.selectedTool = document.querySelector('.pen');
    const hoverCanv = document.querySelector('.canvas-container .hover-layer');
    hoverCanv.style.width = '32px';
    hoverCanv.style.height = '32px';

    const e = {
      offsetX: 10,
      offsetY: 10,
    };

    tools.pointer(e);

    expect(tools.tempX).toBe(10);
    expect(tools.tempY).toBe(10);

    tools.selectedTool = document.querySelector('.mirror-pen');
    tools.tempX = 0;
    tools.tempY = 0;
    tools.pointer(e);
  });
});

describe('Tools.prototype.stopDraw', () => {
  const canv = document.querySelector('.canvas-container .layer');
  const hoverCanv = document.querySelector('.canvas-container .hover-layer');

  it('should return if there is no selected tool', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    tools.isMouseDown = true;
    tools.selectedTool = null;

    tools.stopDraw();
    expect(tools.isMouseDown).toBe(true);
  });

  it('should set tools.isMouseDown to false', () => {
    const frames = new Frames();
    frames.frameCtx = hoverCanv.getContext('2d');
    const tools = new Tools(frames);
    tools.isMouseDown = true;
    tools.selectedTool = document.querySelector('.pen');
    tools.selectedTool.classList.add('selected');

    const e = {
      target: canv,
    };

    tools.stopDraw(e);
    expect(tools.isMouseDown).toBe(false);
  });

  it('should call tools.frames.frameCtx.putImageData', () => {
    const frames = new Frames();
    frames.frameCtx = hoverCanv.getContext('2d');
    const tools = new Tools(frames);
    tools.isMouseDown = true;
    tools.selectedTool = document.querySelector('.pen');
    tools.selectedTool.classList.add('selected');
    tools.frames.frameCtx.putImageData = jest.fn();

    const e = {
      target: canv,
    };

    tools.stopDraw(e);
    expect(tools.frames.frameCtx.putImageData).toHaveBeenCalled();
  });

  it('should set canv zindex to 40 and hoverCanv zindex to 60 if selected tool is not stroke, rect, triangle or ellipse', () => {
    const frames = new Frames();
    frames.frameCtx = hoverCanv.getContext('2d');
    const tools = new Tools(frames);
    tools.isMouseDown = true;
    tools.selectedTool = document.querySelector('.pen');
    tools.selectedTool.classList.add('selected');

    const e = {
      target: canv,
    };

    tools.stopDraw(e);
    expect(canv.style.zIndex).toBe('40');
    expect(hoverCanv.style.zIndex).toBe('60');
  });
});

describe('Tools.prototype.switchLayers', () => {
  const canv = document.querySelector('.canvas-container .layer');
  const hoverCanv = document.querySelector('.canvas-container .hover-layer');

  it('should return if there is no selected tool', () => {
    const frames = new Frames();
    const tools = new Tools(frames);
    tools.selectedTool = null;
    tools.isMouseDown = false;

    tools.switchLayers();
    expect(tools.isMouseDown).toBe(false);
  });

  it('should set canv zindex to 60 and hoverCanv zindex to 40 if selected tool is not stroke, rect, triangle or ellipse', () => {
    const frames = new Frames();
    frames.frameCtx = hoverCanv.getContext('2d');
    const tools = new Tools(frames);
    tools.selectedTool = document.querySelector('.pen');

    const e = {
      which: 3,
    };

    tools.switchLayers(e);
    expect(canv.style.zIndex).toBe('60');
    expect(hoverCanv.style.zIndex).toBe('40');
  });

  it('should set tools.isMouseDown in true', () => {
    const frames = new Frames();
    frames.frameCtx = hoverCanv.getContext('2d');
    const tools = new Tools(frames);
    tools.selectedTool = document.querySelector('.pen');
    tools.isMouseDown = false;

    const e = {
      offsetX: 10,
      offsetY: 10,
    };

    tools.switchLayers(e);
    expect(tools.isMouseDown).toBe(true);
  });

  it('should set current tempX and tempY', () => {
    const frames = new Frames();
    frames.frameCtx = hoverCanv.getContext('2d');
    const tools = new Tools(frames);
    tools.selectedTool = document.querySelector('.pen');
    tools.isMouseDown = false;
    tools.tempX = 1;
    tools.tempY = 1;
    hoverCanv.style.width = '32px';
    hoverCanv.style.height = '32px';

    const e = {
      offsetX: 10,
      offsetY: 10,
    };

    tools.switchLayers(e);
    expect(tools.tempX).toBe(10);
    expect(tools.tempY).toBe(10);
  });
});
