/* eslint-disable no-param-reassign */
import {
  changeSize,
  zoomEvent,
  chooseCanvasSize,
  canvasSizeShortcut,
  addCoordsEvent,
  removeCoordsEvent,
  addLayerEvent,
  addLayerShortcut,
  removeLayerEvent,
  removeLayerShortcut,
  moveLayerEvent,
  moveDownShortcut,
  moveUpShortcut,
} from './LayersEvents';

export default class Layers {
  constructor(frames) {
    this.frames = frames;
    this.selectedLayer = null;
    this.layer = document.querySelector('.layers-container .layer');
  }

  addEvents() {
    this.addChangeSizeEvent();
    this.addZoomEvent();
    this.addChooseCanvSizeEvent();
    this.addLayer();
    this.removeLayer();
    this.moveLayer(1);
    this.moveLayer(-1);
    Layers.addCoordsEvent();
  }

  addChangeSizeEvent() {
    changeSize(this)();

    window.addEventListener('resize', changeSize(this));
  }

  addZoomEvent() {
    const canvasContainer = this.layer.parentNode;
    const layerContainer = canvasContainer.parentNode;

    layerContainer.addEventListener('wheel', zoomEvent(this, canvasContainer));
  }

  addChooseCanvSizeEvent() {
    const canvsSizeContainer = document.querySelector('.canvas-size');

    canvsSizeContainer.addEventListener('click', chooseCanvasSize(this));
    document.addEventListener('keydown', canvasSizeShortcut(this));
  }

  static addCoordsEvent() {
    const layer = document.querySelector('.canvas-container .layer');
    const hoverLayer = document.querySelector('.canvas-container .hover-layer');
    const coordsInfo = document.querySelector('.canvas-info .coords');

    layer.addEventListener('mouseover', addCoordsEvent(layer, hoverLayer, coordsInfo));
    hoverLayer.addEventListener('mouseover', addCoordsEvent(layer, hoverLayer, coordsInfo));
    layer.addEventListener('mouseout', removeCoordsEvent(coordsInfo));
    hoverLayer.addEventListener('mouseout', removeCoordsEvent(coordsInfo));
  }

  addLayer() {
    addLayerEvent(this)();

    const addLayerButton = document.querySelector('.layers-control .layer-add');
    addLayerButton.addEventListener('click', addLayerEvent(this));
    document.addEventListener('keydown', addLayerShortcut(this));
  }

  removeLayer() {
    const removeLayerButton = document.querySelector('.layers-control .layer-remove');

    removeLayerButton.addEventListener('click', removeLayerEvent(this));
    document.addEventListener('keydown', removeLayerShortcut(this));
  }

  moveLayer(d) {
    if (d > 0) {
      const downLayerButton = document.querySelector('.layers-control .layer-down');
      downLayerButton.addEventListener('click', moveLayerEvent(this, d));

      document.addEventListener('keydown', moveDownShortcut(this, d));
    } else {
      const upLayerButton = document.querySelector('.layers-control .layer-up');
      upLayerButton.addEventListener('click', moveLayerEvent(this, d));

      document.addEventListener('keydown', moveUpShortcut(this, d));
    }
  }
}
