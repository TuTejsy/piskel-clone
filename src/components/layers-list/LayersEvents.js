/* eslint-disable no-param-reassign */
import { getElemCoords } from '../utils/utils';

const changeSize = (context) => {
  const canvasContainer = context.layer.parentNode;
  const layerContainer = canvasContainer.parentNode;
  let lastWidth = window.innerWidth;

  return () => {
    const delta = Math.abs(lastWidth - window.innerWidth);
    lastWidth = window.innerWidth;

    const layerContainerStyle = window.getComputedStyle(layerContainer);
    const canvasContainerStyle = window.getComputedStyle(canvasContainer);
    const layerWidth = +layerContainerStyle.width.slice(0, -2);
    const layerHeight = +layerContainerStyle.height.slice(0, -2);
    const canvasWidth = +canvasContainerStyle.width.slice(0, -2);

    if (layerWidth > canvasWidth) {
      if (layerWidth >= layerHeight) {
        canvasContainer.style.width = layerContainerStyle.height;
        canvasContainer.style.height = layerContainerStyle.height;
      } else {
        canvasContainer.style.width = layerContainerStyle.width;
        canvasContainer.style.height = layerContainerStyle.width;
      }
    } else {
      canvasContainer.style.width = `${layerWidth - delta}px`;
      canvasContainer.style.height = `${layerWidth - delta}px`;
    }
  };
};

const zoomEvent = (context, canvasContainer) => {
  const canvasScale = document.querySelector('.canv-scale');

  const canvasContainerStyle = window.getComputedStyle(canvasContainer);
  const canvasWidth = +canvasContainerStyle.width.slice(0, -2);
  const deltaScale = canvasWidth / context.frames.canvSize;
  let scale = 1;

  canvasScale.innerText = `x${deltaScale.toFixed(2)}`;

  return (e) => {
    e.preventDefault();

    scale += e.deltaY * -0.01;
    scale = Math.min(Math.max(context.frames.canvSize / canvasWidth, scale), 4);

    canvasContainer.style.transform = `scale(${scale})`;
    canvasScale.innerText = `x${(scale * canvasWidth / context.frames.canvSize).toFixed(2)}`;
  };
};

const chooseCanvasSize = (context, size) => {
  const canvas = document.body.getElementsByTagName('CANVAS');
  const canvSizeInfo = document.querySelector('.canvas-info .canv-size');
  const size1 = document.querySelector('.canvas-size .px32');
  const size2 = document.querySelector('.canvas-size .px64');
  const size3 = document.querySelector('.canvas-size .px128');

  let current = document.querySelector('.canvas-size .active') || size1;

  return (e) => {
    const target = size || e.target;

    if (target.tagName !== 'BUTTON') return;

    current.classList.remove('active');
    current = target;

    switch (current) {
      case size1: context.frames.canvSize = 32; break;
      case size2: context.frames.canvSize = 64; break;
      case size3: context.frames.canvSize = 128; break;
      default: context.frames.canvSize = 32; break;
    }

    canvSizeInfo.innerText = `[${context.frames.canvSize}X${context.frames.canvSize}]`;

    [].forEach.call(canvas, ((elem) => {
      const ctx = elem.getContext('2d');
      const imgData = ctx.getImageData(0, 0, elem.width, elem.height);

      elem.width = context.frames.canvSize;
      elem.height = context.frames.canvSize;
      ctx.putImageData(imgData, 0, 0);
    }));

    current.classList.add('active');
    context.layer.parentNode.style.transform = 'scale(1)';
    context.addZoomEvent();
  };
};

const canvasSizeShortcut = (context) => {
  const size1 = document.querySelector('.canvas-size .px32');
  const size2 = document.querySelector('.canvas-size .px64');
  const size3 = document.querySelector('.canvas-size .px128');

  return (e) => {
    if (e.code === 'Digit1' && e.shiftKey) {
      chooseCanvasSize(context, size1)();
    } else if (e.code === 'Digit2' && e.shiftKey) {
      chooseCanvasSize(context, size2)();
    } else if (e.code === 'Digit3' && e.shiftKey) {
      chooseCanvasSize(context, size3)();
    }
  };
};

const addCoords = (layer, hoverLayer, coordsInfo) => (e) => {
  const canv = (e.target === layer) ? layer : hoverLayer;
  const { x, y } = getElemCoords(canv, e);

  coordsInfo.innerText = `${x} : ${y}`;
};

const addCoordsEvent = (layer, hoverLayer, coordsInfo) => () => {
  coordsInfo.style.display = 'inline';
  layer.addEventListener('mousemove', addCoords(layer, hoverLayer, coordsInfo));
  hoverLayer.addEventListener('mousemove', addCoords(layer, hoverLayer, coordsInfo));
};

const removeCoordsEvent = coordsInfo => () => {
  coordsInfo.style.display = 'none';
};

const layerClickEvent = (context, layer, framesContainer, layerNumber, layersList) => {
  const ctx = context.layer.getContext('2d');

  return () => {
    const layers = layersList.getElementsByClassName('layer');
    layerNumber = [].indexOf.call(layers, layer);

    context.selectedLayer.classList.remove('active');
    layer.classList.add('active');
    context.selectedLayer = layer;

    framesContainer.innerHTML = '';
    context.frames.layerNumber = layerNumber;
    context.frames.framesList[layerNumber].forEach((elem, i) => {
      context.frames.addFrame(null, elem, i + 1);
    });

    ctx.drawImage(context.frames.currentFrame, 0, 0);
  };
};

const addLayerEvent = (context) => {
  const layersList = document.querySelector('.layers-menu .layers-list');
  const framesContainer = document.querySelector('.frames-select .frames-container');

  return () => {
    framesContainer.innerHTML = '';
    context.frames.layerNumber = context.frames.framesList.length;
    const { layerNumber } = context.frames;
    context.frames.framesList[layerNumber] = [];
    context.frames.addFrame();
    const layer = document.createElement('LI');
    layer.classList.add('layer');
    layer.innerText = `layer ${context.frames.framesList.length}`;

    if (context.selectedLayer) {
      context.selectedLayer.classList.remove('active');
    }
    layer.classList.add('active');
    context.selectedLayer = layer;

    layer.addEventListener('click', layerClickEvent(context, layer, framesContainer, layerNumber, layersList));

    layersList.appendChild(layer);
  };
};

const addLayerShortcut = context => (e) => {
  if (e.code === 'KeyN' && e.shiftKey) {
    addLayerEvent(context)();
  }
};

const removeLayerEvent = (context) => {
  const layersList = document.querySelector('.layers-menu .layers-list');
  const framesContainer = document.querySelector('.frames-select .frames-container');
  const ctx = context.layer.getContext('2d');

  return () => {
    if (context.frames.framesList.length < 2) return;

    framesContainer.innerHTML = '';
    context.frames.framesList.splice(context.frames.layerNumber, 1);

    const layers = layersList.getElementsByClassName('layer');
    layersList.removeChild(layers[context.frames.layerNumber]);

    for (let i = context.frames.layerNumber; i < layers.length; i += 1) {
      layers[i].innerText = `layer ${i + 1}`;
    }

    if (context.frames.layerNumber === context.frames.framesList.length) {
      context.frames.layerNumber -= 1;
    }

    context.selectedLayer = layers[context.frames.layerNumber];
    context.selectedLayer.classList.add('active');

    context.frames.framesList[context.frames.layerNumber].forEach((elem, i) => {
      context.frames.addFrame(null, elem, i + 1);
    });

    ctx.drawImage(context.frames.currentFrame, 0, 0);
  };
};

const removeLayerShortcut = context => (e) => {
  if (e.key === 'Backspace' && e.shiftKey) {
    removeLayerEvent(context)();
  }
};

const moveLayerEvent = (context, d) => {
  const framesContainer = document.querySelector('.frames-select .frames-container');
  const ctx = context.layer.getContext('2d');

  return () => {
    const layersList = document.querySelector('.layers-menu .layers-list');
    const layers = layersList.getElementsByClassName('layer');
    if (!layers[context.frames.layerNumber + d]) return;

    framesContainer.innerHTML = '';

    if (d > 0) {
      let temp = layersList.removeChild(layers[context.frames.layerNumber + d]);
      layersList.insertBefore(temp, layers[context.frames.layerNumber]);

      temp = context.frames.framesList.splice(context.frames.layerNumber + d, 1);
      context.frames.framesList.splice(context.frames.layerNumber, 0, ...temp);
    } else {
      let temp = layersList.removeChild(layers[context.frames.layerNumber]);
      layersList.insertBefore(temp, layers[context.frames.layerNumber + d]);

      temp = context.frames.framesList.splice(context.frames.layerNumber, 1);
      context.frames.framesList.splice(context.frames.layerNumber + d, 0, ...temp);
    }

    context.frames.layerNumber += d;
    context.frames.framesList[context.frames.layerNumber].forEach((elem, i) => {
      context.frames.addFrame(null, elem, i + 1);
    });

    ctx.drawImage(context.frames.currentFrame, 0, 0);
  };
};

const moveDownShortcut = (context, d) => (e) => {
  if (e.key === 'ArrowDown' && e.shiftKey) {
    moveLayerEvent(context, d)();
  }
};

const moveUpShortcut = (context, d) => (e) => {
  if (e.key === 'ArrowUp' && e.shiftKey) {
    moveLayerEvent(context, d)();
  }
};

export {
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
};
