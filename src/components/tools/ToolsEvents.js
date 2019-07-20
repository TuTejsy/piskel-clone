/* eslint-disable no-param-reassign */

import {
  getElemCoords,
  line,
  colorSamePixels,
  ellipse,
  changeBrightness,
} from '../utils/utils';

const resetContextMenu = (e) => {
  if (e.target.tagName === 'CANVAS') e.preventDefault();
};

const chooseToolSize = (context) => {
  const size1 = document.querySelector('.tool-size .px1');
  const size2 = document.querySelector('.tool-size .px2');
  const size3 = document.querySelector('.tool-size .px3');

  size1.classList.add('active');
  context.selectedSize = size1;

  return (e) => {
    if (e.target.tagName !== 'LI') return;
    if ((context.selectedTool && context.selectedTool.classList.contains('paint-bucket'))
      || (context.selectedTool && context.selectedTool.classList.contains('paint-bucket-all'))
      || (context.selectedTool && context.selectedTool.classList.contains('magic-eraser'))) return;

    context.selectedSize.classList.remove('active');
    context.selectedSize = e.target;

    switch (context.selectedSize) {
      case size1: context.toolSize = 1; break;
      case size2: context.toolSize = 2; break;
      case size3: context.toolSize = 3; break;
      default: context.toolSize = 4;
    }

    context.selectedSize.classList.add('active');
  };
};

const toolSizeSelectShortcuts = context => (e) => {
  if ((context.selectedTool && context.selectedTool.classList.contains('paint-bucket'))
    || (context.selectedTool && context.selectedTool.classList.contains('paint-bucket-all'))
    || (context.selectedTool && context.selectedTool.classList.contains('magic-eraser'))) return;

  context.selectedSize.classList.remove('active');

  if (e.key === '1') {
    context.toolSize = 1;
    context.selectedSize = document.querySelector('.tool-size .px1');
  } else if (e.key === '2') {
    context.toolSize = 2;
    context.selectedSize = document.querySelector('.tool-size .px2');
  } else if (e.key === '3') {
    context.toolSize = 3;
    context.selectedSize = document.querySelector('.tool-size .px3');
  } else if (e.key === '4') {
    context.toolSize = 4;
    context.selectedSize = document.querySelector('.tool-size .px4');
  }

  context.selectedSize.classList.add('active');
};

const toolSelectShortcuts = (context) => {
  let tool;

  return (e) => {
    if (e.code === 'KeyP') {
      context.penTool();
      tool = document.querySelector('.tools-select .pen');
      context.changeTool(tool);
    } else if (e.code === 'KeyV') {
      context.mirrorPenTool();
      tool = document.querySelector('.tools-select .mirror-pen');
      context.changeTool(tool);
    } else if (e.code === 'KeyB') {
      context.paintBucketTool();
      tool = document.querySelector('.tools-select .paint-bucket');
      context.changeTool(tool);
    } else if (e.code === 'KeyA') {
      context.paintBucketAllTool();
      tool = document.querySelector('.tools-select .paint-bucket-all');
      context.changeTool(tool);
    } else if (e.code === 'KeyE') {
      context.eraserTool();
      tool = document.querySelector('.tools-select .eraser');
      context.changeTool(tool);
    } else if (e.code === 'KeyG') {
      context.magicErserTool();
      tool = document.querySelector('.tools-select .magic-eraser');
      context.changeTool(tool);
    } else if (e.code === 'KeyS') {
      context.strokeTool();
      tool = document.querySelector('.tools-select .stroke');
      context.changeTool(tool);
    } else if (e.code === 'KeyR') {
      context.rectTool();
      tool = document.querySelector('.tools-select .rect');
      context.changeTool(tool);
    } else if (e.code === 'KeyC') {
      context.ellipseTool();
      tool = document.querySelector('.tools-select .ellipse');
      context.changeTool(tool);
    } else if (e.code === 'KeyT') {
      context.triangleTool();
      tool = document.querySelector('.tools-select .triangle');
      context.changeTool(tool);
    } else if (e.code === 'KeyD') {
      context.brightnessTool(-3);
      tool = document.querySelector('.tools-select .darken');
      context.changeTool(tool);
    } else if (e.code === 'KeyL') {
      context.brightnessTool(3);
      tool = document.querySelector('.tools-select .lighten');
      context.changeTool(tool);
    } else if (e.code === 'KeyM') {
      context.moveTool();
      tool = document.querySelector('.tools-select .move');
      context.changeTool(tool);
    } else if (e.code === 'KeyI') {
      context.ditheringTool();
      tool = document.querySelector('.tools-select .dithering');
      context.changeTool(tool);
    } else if (e.code === 'KeyO') {
      context.canv.parentNode.parentNode.style.cursor = 'url("img/cursors/dropper.png"), auto';
      tool = document.querySelector('.tools-select .color-picker');
      context.changeTool(tool);
    }
  };
};

const mouseOutEvent = (context, imgData, hoverCanv, hoverCtx) => () => {
  if (context.isMouseDown) return;
  imgData = hoverCtx.createImageData(hoverCanv.width, hoverCanv.height);
  hoverCtx.putImageData(imgData, 0, 0);
};

const penToolMouseMove = (context, color) => (e) => {
  if (!context.isMouseDown) return;
  const { x, y } = getElemCoords(context.canv, e);

  if (x === context.tempX && y === context.tempY) return;

  const imgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);

  const penColor = color || ((e.which === 3) ? context.secondColor : context.color);
  line(context.tempX, context.tempY, x, y, context.canv, imgData, penColor, context.toolSize);
  context.ctx.putImageData(imgData, 0, 0);

  context.tempX = x;
  context.tempY = y;
};

const mirrorPenToolMouseMove = context => (e) => {
  if (!context.isMouseDown) return;

  const { x, y } = getElemCoords(context.canv, e);

  if (x === context.tempX && y === context.tempY) return;

  const imgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);

  const deltaX = context.canv.width - x;
  const deltaTempX = context.canv.width - context.tempX;
  const color = (e.which === 3) ? context.secondColor : context.color;

  line(context.tempX, context.tempY, x, y, context.canv, imgData, color, context.toolSize);
  line(deltaTempX, context.tempY, deltaX, y, context.canv, imgData, color, context.toolSize);

  context.ctx.putImageData(imgData, 0, 0);

  context.tempX = x;
  context.tempY = y;
};

const paintBucketToolEvent = (context, mainColor) => (e) => {
  context.switchLayers(e);
  const { x, y } = getElemCoords(context.canv, e);
  const imgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);

  const color = mainColor || ((e.which === 3) ? context.secondColor : context.color);

  colorSamePixels(x, y, color, imgData, context.canv);
};

const paintBucketAllToolEvent = context => (e) => {
  const color = (e.which === 3) ? context.secondColor : context.color;
  context.ctx.rect(0, 0, context.canv.width, context.canv.height);
  context.ctx.fillStyle = color;
  context.ctx.fill();
};

const moveToolMouseMove = (context, e, imgData, clearImgData, canvasK) => (ev) => {
  if (!context.isMouseDown) return;

  const deltaX = (ev.pageX - e.pageX) / canvasK;
  const deltaY = (ev.pageY - e.pageY) / canvasK;

  const { x, y } = getElemCoords(context.canv, ev);
  context.tempX = x;
  context.tempY = y;

  context.ctx.putImageData(clearImgData, 0, 0);
  context.ctx.putImageData(imgData, deltaX, deltaY);
};

const mooveToolMouseUp = context => () => {
  context.isMouseDown = false;
  context.canv.onmousemove = null;
};

const moveToolEvent = context => (e) => {
  context.isMouseDown = true;
  const imgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);
  const clearImgData = context.ctx.createImageData(context.canv.width, context.canv.height);
  const canvWidth = +getComputedStyle(context.canv).width.slice(0, -2);
  const canvasK = canvWidth / context.canv.width;

  document.onmouseup = mooveToolMouseUp(context);

  context.canv.onmousemove = moveToolMouseMove(context, e, imgData, clearImgData, canvasK);
};

const strokeEvent = (context, hoverCanv, hoverCtx) => (e) => {
  context.isMouseDown = true;

  const color = (e.which === 3) ? context.secondColor : context.color;
  const { x: x0, y: y0 } = getElemCoords(hoverCanv, e);

  const resetImgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);
  let imgData;

  const strokeMouseMove = (ev) => {
    if (!context.isMouseDown) return;

    const { x: x1, y: y1 } = getElemCoords(context.canv, ev);
    imgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);

    hoverCtx.putImageData(resetImgData, 0, 0);
    line(x0, y0, x1, y1, hoverCanv, imgData, color, context.toolSize);
    hoverCtx.putImageData(imgData, 0, 0);
  };

  const endStroke = () => {
    context.isMouseDown = false;
    context.ctx.putImageData(imgData, 0, 0);

    hoverCanv.parentNode.parentNode.removeEventListener('mousemove', strokeMouseMove);
    document.removeEventListener('mouseup', endStroke);
    context.stopDraw(e);
  };

  hoverCanv.parentNode.parentNode.addEventListener('mousemove', strokeMouseMove);
  document.addEventListener('mouseup', endStroke);
};

const rectEvent = (context, hoverCanv, hoverCtx) => (e) => {
  context.isMouseDown = true;

  const color = (e.which === 3) ? context.secondColor : context.color;
  const { x: x0, y: y0 } = getElemCoords(hoverCanv, e);

  const resetImgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);
  let imgData;

  const rectMoveEvent = (ev) => {
    if (!context.isMouseDown) return;

    // eslint-disable-next-line prefer-const
    let { x: x1, y: y1 } = getElemCoords(context.canv, ev);

    if (ev.shiftKey) {
      const delta = Math.abs(y1 - y0);
      x1 = (x1 < x0) ? (x0 - delta) : (x0 + delta);
    }

    imgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);

    hoverCtx.putImageData(resetImgData, 0, 0);
    line(x0, y0, x1, y0, hoverCanv, imgData, color, context.toolSize);
    line(x1, y0, x1, y1, hoverCanv, imgData, color, context.toolSize);
    line(x0, y1, x1, y1, hoverCanv, imgData, color, context.toolSize);
    line(x0, y0, x0, y1, hoverCanv, imgData, color, context.toolSize);
    hoverCtx.putImageData(imgData, 0, 0);
  };

  const endRect = () => {
    context.isMouseDown = false;
    context.ctx.putImageData(imgData, 0, 0);

    hoverCanv.parentNode.parentNode.removeEventListener('mousemove', rectMoveEvent);
    document.removeEventListener('mouseup', endRect);
    context.stopDraw(e);
  };

  hoverCanv.parentNode.parentNode.addEventListener('mousemove', rectMoveEvent);
  document.addEventListener('mouseup', endRect);
};

const ellipseEvent = (context, hoverCanv, hoverCtx) => (e) => {
  context.isMouseDown = true;
  const color = (e.which === 3) ? context.secondColor : context.color;
  const { x: x0, y: y0 } = getElemCoords(hoverCanv, e);

  const resetImgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);
  let imgData;

  const ellipseMoveEvent = (ev) => {
    if (!context.isMouseDown) return;

    const { x: x1, y: y1 } = getElemCoords(context.canv, ev);
    imgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);

    hoverCtx.putImageData(resetImgData, 0, 0);
    ellipse(x0, y0, x1, y1, hoverCanv, imgData, color, context.toolSize, ev.shiftKey);
    hoverCtx.putImageData(imgData, 0, 0);
  };

  const endEllipse = () => {
    context.isMouseDown = false;

    context.ctx.putImageData(imgData, 0, 0);
    hoverCanv.parentNode.parentNode.removeEventListener('mousemove', ellipseMoveEvent);
    document.removeEventListener('mouseup', endEllipse);
    context.stopDraw(e);
  };

  hoverCanv.parentNode.parentNode.addEventListener('mousemove', ellipseMoveEvent);
  document.addEventListener('mouseup', endEllipse);
};

const triangleEvent = (context, hoverCanv, hoverCtx) => (e) => {
  context.isMouseDown = true;

  const color = (e.which === 3) ? context.secondColor : context.color;
  const { x: x0, y: y0 } = getElemCoords(hoverCanv, e);

  const resetImgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);
  let imgData;

  const triangleMoveEvent = (ev) => {
    if (!context.isMouseDown) return;

    // eslint-disable-next-line prefer-const
    let { x: x1, y: y1 } = getElemCoords(context.canv, ev);

    imgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);

    hoverCtx.putImageData(resetImgData, 0, 0);
    line(x0, y0, x1, y1, hoverCanv, imgData, color, context.toolSize);
    line(x0, y0, 2 * x0 - x1, y1, hoverCanv, imgData, color, context.toolSize);
    line(x1, y1, 2 * x0 - x1, y1, hoverCanv, imgData, color, context.toolSize);
    hoverCtx.putImageData(imgData, 0, 0);
  };

  const endTriangle = () => {
    context.isMouseDown = false;

    context.ctx.putImageData(imgData, 0, 0);

    hoverCanv.parentNode.parentNode.removeEventListener('mousemove', triangleMoveEvent);
    document.removeEventListener('mouseup', endTriangle);
    context.stopDraw(e);
  };

  hoverCanv.parentNode.parentNode.addEventListener('mousemove', triangleMoveEvent);
  document.addEventListener('mouseup', endTriangle);
};

const brightnessMove = (context, inc) => (e) => {
  if (!context.isMouseDown) return;

  const imgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);
  const { x, y } = getElemCoords(context.canv, e);

  changeBrightness(x, y, context.canv, imgData, context.toolSize, inc);
  context.ctx.putImageData(imgData, 0, 0);

  context.tempX = x;
  context.tempY = y;
};

const ditheringMove = (context) => {
  let imgData;

  return (e) => {
    if (!context.isMouseDown) return;
    const { x, y } = getElemCoords(context.canv, e);

    if (x === context.tempX && y === context.tempY) return;

    imgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);

    let color1;
    let color2;
    if (e.which === 3) {
      color1 = context.secondColor;
      color2 = context.color;
    } else {
      color1 = context.color;
      color2 = context.secondColor;
    }
    // eslint-disable-next-line max-len
    line(context.tempX, context.tempY, x, y, context.canv, imgData, color1, context.toolSize, color2);
    context.ctx.putImageData(imgData, 0, 0);

    context.tempX = x;
    context.tempY = y;
  };
};

const hex2rgba = (hex, alpha = 255) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

const chooseColor = (context, colorPallete, secondColorPallete) => (e) => {
  if (e.target === colorPallete) {
    context.color = hex2rgba(colorPallete.value);
  } else if (e.target === secondColorPallete) {
    context.secondColor = hex2rgba(secondColorPallete.value);
  }
};

export {
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
  hex2rgba,
  chooseColor,
};
