import {
  changeBrightness,
  getElemAndCtx,
  getElemCoords,
  setDitheringPixel,
  setPixel,
  rgbToHex,
} from '../utils/utils';

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
  moveToolEvent,
  strokeEvent,
  rectEvent,
  ellipseEvent,
  triangleEvent,
  brightnessMove,
  ditheringMove,
  chooseColor,
} from './ToolsEvents';

export default class Tools {
  constructor(frames) {
    this.frames = frames;
    this.selectedTool = null;
    this.toolSize = 1;
    this.selectedSize = null;
    this.color = 'rgba(0, 0, 0, 255)';
    this.secondColor = 'rgba(255, 255, 255, 255)';
    this.hoverColor = 'rgba(255, 255, 255, 40)';
    this.isMouseDown = false;
    this.tempX = 0;
    this.tempY = 0;
    const { canv, ctx } = getElemAndCtx('.canvas-container .layer');
    this.canv = canv;
    this.ctx = ctx;
  }

  addEvents() {
    this.addSelectEvent();
    this.addChooseToolSizeEvent();
    this.addChooseColorEvent();
    document.addEventListener('keydown', toolSelectShortcuts(this));
    document.addEventListener('keydown', toolSizeSelectShortcuts(this));
    document.oncontextmenu = resetContextMenu;
    document.addEventListener('mouseup', this.stopDraw.bind(this));
  }

  addChooseToolSizeEvent() {
    const toolsSizeContainer = document.querySelector('.tools-container .tool-size');
    toolsSizeContainer.addEventListener('click', chooseToolSize(this));
  }

  resetToolSize() {
    let currentSize = document.querySelector('.tools-container .active');
    currentSize.classList.remove('active');
    currentSize = document.querySelector('.tools-container .px1');
    currentSize.classList.add('active');
    this.toolSize = 1;
    this.selectedSize = currentSize;
  }

  resetEvents() {
    const { canv: hoverCanv } = getElemAndCtx('.canvas-container .hover-layer');
    this.canv.onmousemove = null;
    document.onmouseup = null;
    hoverCanv.onmousedown = null;
  }

  changeTool(tool) {
    if (this.selectedTool) {
      this.selectedTool.classList.remove('selected');
    }

    tool.classList.add('selected');
    this.selectedTool = tool;
  }

  selectTool(e) {
    const tool = e.target.tagName === 'I' ? e.target.parentNode : e.target;

    if (!tool.classList.contains('tool') || tool.classList.contains('selected')) return;

    this.changeTool(tool);

    this.resetEvents();

    if (tool.classList.contains('pen')) {
      this.penTool();
    } else if (tool.classList.contains('mirror-pen')) {
      this.mirrorPenTool();
    } else if (tool.classList.contains('eraser')) {
      this.eraserTool();
    } else if (tool.classList.contains('magic-eraser')) {
      this.magicErserTool();
    } else if (tool.classList.contains('paint-bucket')) {
      this.paintBucketTool();
    } else if (tool.classList.contains('paint-bucket-all')) {
      this.paintBucketAllTool();
    } else if (tool.classList.contains('move')) {
      this.moveTool();
    } else if (tool.classList.contains('stroke')) {
      this.strokeTool();
    } else if (tool.classList.contains('rect')) {
      this.rectTool();
    } else if (tool.classList.contains('ellipse')) {
      this.ellipseTool();
    } else if (tool.classList.contains('triangle')) {
      this.triangleTool();
    } else if (tool.classList.contains('lighten')) {
      this.brightnessTool(3);
    } else if (tool.classList.contains('darken')) {
      this.brightnessTool(-3);
    } else if (tool.classList.contains('dithering')) {
      this.ditheringTool();
    } else if (tool.classList.contains('color-picker')) {
      this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/dropper.png"), auto';
    }
  }

  addSelectEvent() {
    const toolsSelectContainier = document.querySelector('.tools-container .tools-select');
    toolsSelectContainier.addEventListener('click', this.selectTool.bind(this));

    const { canv: hoverCanv, ctx: hoverCtx } = getElemAndCtx('.canvas-container .hover-layer');

    const imgData = hoverCtx.getImageData(0, 0, hoverCanv.width, hoverCanv.height);

    hoverCanv.addEventListener('mousedown', this.switchLayers.bind(this));
    hoverCanv.addEventListener('mousemove', this.pointer.bind(this));
    hoverCanv.addEventListener('mouseout', mouseOutEvent(this, imgData, hoverCanv, hoverCtx));
  }

  // tools
  penTool(color) {
    this.resetEvents();

    this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/pen.png"), auto';

    this.canv.onmousemove = penToolMouseMove(this, color);
  }

  mirrorPenTool() {
    this.resetEvents();

    this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/mirror-pen.png"), auto';
    this.canv.onmousemove = mirrorPenToolMouseMove(this);
  }

  eraserTool() {
    this.penTool('rgba(0, 0, 0, 0)');
    const canv = document.querySelector('.canvas-container .layer');
    canv.parentNode.parentNode.style.cursor = 'url("img/cursors/eraser.png"), auto';
  }

  magicErserTool() {
    this.paintBucketTool('rgb(, , , )');
    this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/eraser.png"), auto';
  }

  paintBucketTool(mainColor) {
    const { canv: hoverCanv } = getElemAndCtx('.canvas-container .hover-layer');

    this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/paint-bucket.png"), auto';

    this.resetEvents();
    this.resetToolSize();

    hoverCanv.onmousedown = paintBucketToolEvent(this, mainColor);
  }

  paintBucketAllTool() {
    const { canv: hoverCanv } = getElemAndCtx('.canvas-container .hover-layer');

    this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/paint-bucket.png"), auto';

    this.resetEvents();
    this.resetToolSize();

    hoverCanv.onmousedown = paintBucketAllToolEvent(this);
  }

  moveTool() {
    const { canv: hoverCanv } = getElemAndCtx('.canvas-container .hover-layer');

    this.resetEvents();
    this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/hand.png"), auto';

    hoverCanv.onmousedown = moveToolEvent(this);
  }

  strokeTool() {
    const { canv: hoverCanv, ctx: hoverCtx } = getElemAndCtx('.canvas-container .hover-layer');

    this.resetEvents();
    this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/stroke.png"), auto';

    hoverCanv.onmousedown = strokeEvent(this, hoverCanv, hoverCtx);
  }

  rectTool() {
    const { canv: hoverCanv, ctx: hoverCtx } = getElemAndCtx('.canvas-container .hover-layer');

    this.resetEvents();
    this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/rectangle.png"), auto';

    hoverCanv.onmousedown = rectEvent(this, hoverCanv, hoverCtx);
  }

  ellipseTool() {
    const { canv: hoverCanv, ctx: hoverCtx } = getElemAndCtx('.canvas-container .hover-layer');

    this.resetEvents();
    this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/circle.png"), auto';

    hoverCanv.onmousedown = ellipseEvent(this, hoverCanv, hoverCtx);
  }

  triangleTool() {
    const { canv: hoverCanv, ctx: hoverCtx } = getElemAndCtx('.canvas-container .hover-layer');

    this.resetEvents();
    this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/triangle.png"), auto';

    hoverCanv.onmousedown = triangleEvent(this, hoverCanv, hoverCtx);
  }

  brightnessTool(inc) {
    this.resetEvents();
    this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/brightness.png"), auto';

    this.canv.onmousemove = brightnessMove(this, inc);
  }

  ditheringTool() {
    this.resetEvents();

    this.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/dither.png"), auto';
    this.canv.onmousemove = ditheringMove(this);
  }

  colorPickerTool(e, x, y) {
    this.resetEvents();

    const imgData = this.ctx.getImageData(0, 0, this.canv.width, this.canv.height);
    const { data } = imgData;

    const n = (y * this.canv.width + x) * 4;
    const pixelColor = rgbToHex(data[n + 0], data[n + 1], data[n + 2]);

    if (e.which === 3) {
      const secondColorPallete = document.querySelector('.choose-color .second-color');
      secondColorPallete.value = pixelColor;

      this.secondColor = `rgba(${data[n + 0]}, ${data[n + 1]}, ${data[n + 2]}, 255)`;
    } else {
      const colorPallete = document.querySelector('.choose-color .color');
      colorPallete.value = pixelColor;

      this.color = `rgba(${data[n + 0]}, ${data[n + 1]}, ${data[n + 2]}, 255)`;
    }
  }

  // events
  addChooseColorEvent() {
    const colorPallete = document.querySelector('.choose-color .color');
    const secondColorPallete = document.querySelector('.choose-color .second-color');

    colorPallete.addEventListener('change', chooseColor(this, colorPallete, secondColorPallete));
    secondColorPallete.addEventListener('change', chooseColor(this, colorPallete, secondColorPallete));
  }

  pointer(e) {
    if (!this.selectedTool) return;
    const { canv, ctx } = getElemAndCtx('.canvas-container .hover-layer');
    const { x, y } = getElemCoords(canv, e);
    if (this.tempX === x && this.tempY === y) return;

    const imgData = ctx.createImageData(canv.width, canv.height);

    if (this.selectedTool.classList.contains('mirror-pen')) {
      setPixel(x, y, canv, imgData, this.hoverColor, this.toolSize);
      setPixel(canv.width - x, y, canv, imgData, this.hoverColor, this.toolSize);
    } else {
      setPixel(x, y, canv, imgData, this.hoverColor, this.toolSize);
    }

    ctx.putImageData(imgData, 0, 0);

    this.tempX = x;
    this.tempY = y;
  }

  stopDraw(e) {
    if (!this.selectedTool) {
      return;
    }
    this.isMouseDown = false;

    const { canv, ctx } = getElemAndCtx('.canvas-container .layer');
    const { canv: hoverCanv, ctx: hoverCtx } = getElemAndCtx('.canvas-container .hover-layer');
    let imgData;

    imgData = ctx.getImageData(0, 0, canv.width, canv.height);
    this.frames.frameCtx.putImageData(imgData, 0, 0);

    if (!this.selectedTool.classList.contains('stroke')
      && !this.selectedTool.classList.contains('rect')
      && !this.selectedTool.classList.contains('ellipse')
      && !this.selectedTool.classList.contains('triangle')) {
      canv.style.zIndex = '40';
      hoverCanv.style.zIndex = '60';
    }

    if (e.target.tagName === 'CANVAS') {
      imgData = hoverCtx.createImageData(canv.width, canv.height);

      setPixel(this.tempX, this.tempY, hoverCanv, imgData, this.hoverColor, this.toolSize);
      hoverCtx.putImageData(imgData, 0, 0);
    }
  }

  switchLayers(e) {
    if (!this.selectedTool) return;

    const { canv, ctx } = getElemAndCtx('.canvas-container .hover-layer');
    const { canv: layer, ctx: layerCtx } = getElemAndCtx('.canvas-container .layer');
    const { x, y } = getElemCoords(canv, e);

    if (!this.selectedTool.classList.contains('stroke')
      && !this.selectedTool.classList.contains('rect')
      && !this.selectedTool.classList.contains('ellipse')
      && !this.selectedTool.classList.contains('triangle')) {
      canv.style.zIndex = '40';
      layer.style.zIndex = '60';
    }

    this.isMouseDown = true;

    this.tempX = x;
    this.tempY = y;

    const layerData = layerCtx.getImageData(0, 0, layer.width, layer.height);
    const resetImgData = ctx.createImageData(canv.width, canv.height);

    let color1;
    let color2;

    if (e.which === 3) {
      color1 = this.secondColor;
      color2 = this.color;
    } else {
      color1 = this.color;
      color2 = this.secondColor;
    }

    if (this.selectedTool.classList.contains('pen')) {
      setPixel(this.tempX, this.tempY, layer, layerData, color1, this.toolSize);
    } else if (this.selectedTool.classList.contains('mirror-pen')) {
      setPixel(this.tempX, this.tempY, layer, layerData, color1, this.toolSize);
      setPixel(layer.width - this.tempX, this.tempY, layer, layerData, color1, this.toolSize);
    } else if (this.selectedTool.classList.contains('eraser')) {
      setPixel(this.tempX, this.tempY, layer, layerData, 'rgba(0, 0, 0, 0)', this.toolSize);
    } else if (this.selectedTool.classList.contains('lighten')) {
      changeBrightness(x, y, canv, layerData, this.toolSize, 10);
    } else if (this.selectedTool.classList.contains('darken')) {
      changeBrightness(x, y, canv, layerData, this.toolSize, -10);
    } else if (this.selectedTool.classList.contains('dithering')) {
      setDitheringPixel(this.tempX, this.tempY, layer, layerData, color1, color2, this.toolSize);
    } else if (this.selectedTool.classList.contains('color-picker')) {
      this.colorPickerTool(e, x, y);
    }

    layerCtx.putImageData(layerData, 0, 0);
    ctx.putImageData(resetImgData, 0, 0);
  }
}
