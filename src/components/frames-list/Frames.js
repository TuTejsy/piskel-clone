/* eslint-disable no-continue */
import {
  createButton,
  getElemAndCtx,
} from '../utils/utils';

import {
  moveButtonMouseDown,
  deleteButtonEvent,
  copyButtonEvent,
  frameShorcuts,
  addFrameButtonClickEvent,
} from './framesEvents';

export default class Frames {
  constructor() {
    this.framesList = [];
    this.layerNumber = -1;
    this.currentFrame = null;
    this.frameCtx = null;
    this.selected = null;
    this.canvSize = 32;
  }

  addFrame(elem, canvas, num) {
    const framesContainer = document.querySelector('.frames-select .frames-container');
    const frame = canvas || document.createElement('CANVAS');
    const previewContainer = document.createElement('DIV');

    const previewContainerWrapper = document.createElement('DIV');
    previewContainerWrapper.classList.add('preview-container-wrapper');

    const frameNumber = document.createElement('DIV');
    frameNumber.classList.add('frame-number');

    const deleteButton = createButton(
      'delete-button',
      '<i class="fas fa-trash"></i>',
      deleteButtonEvent(this, frame),
    );

    const copyButton = createButton(
      'copy-button',
      '<i class="fas fa-copy"></i>',
      copyButtonEvent(this, frame),
    );

    const moveButton = createButton('move-button', '<i class="fas fa-arrows-alt"></i>');

    moveButton.addEventListener('mousedown', moveButtonMouseDown(this, framesContainer, previewContainerWrapper));

    previewContainer.classList.add('preview-container');

    this.frameCtx = frame.getContext('2d');
    const frameImageData = this.frameCtx.getImageData(0, 0, frame.width, frame.height);

    frame.height = this.canvSize;
    frame.width = this.canvSize;

    if (!canvas) frame.classList.add('frame');
    this.currentFrame = frame;

    previewContainer.classList.add('selected');
    if (this.selected) this.selected.classList.remove('selected');
    this.selected = previewContainer;

    const { canv, ctx } = getElemAndCtx('.canvas-container .layer');

    const imgData = ctx.createImageData(canv.width, canv.height);
    ctx.putImageData(imgData, 0, 0);

    previewContainer.appendChild(frame);
    previewContainer.appendChild(deleteButton);
    previewContainer.appendChild(copyButton);
    previewContainer.appendChild(moveButton);
    previewContainer.appendChild(frameNumber);

    previewContainerWrapper.appendChild(previewContainer);

    if (elem) {
      const i = this.framesList[this.layerNumber].indexOf(elem);
      frameNumber.innerText = i + 1;
      framesContainer.insertBefore(previewContainerWrapper, elem.parentNode.parentNode.nextSibling);
      this.framesList[this.layerNumber].splice(i + 1, 0, frame);
    } else if (!canvas) {
      frameNumber.innerText = this.framesList[this.layerNumber].length + 1;
      framesContainer.appendChild(previewContainerWrapper);
      this.framesList[this.layerNumber].push(frame);
    } else if (num) {
      this.frameCtx.putImageData(frameImageData, 0, 0);
      frameNumber.innerText = num;
      framesContainer.appendChild(previewContainerWrapper);
    }

    const { ctx: additionalCtx } = getElemAndCtx('.canvas-container .additional-layer');
    const resetData = additionalCtx.createImageData(frame.width, frame.height);
    additionalCtx.putImageData(resetData, 0, 0);

    this.framesList.forEach((el, i) => {
      if (i === this.layerNumber || !el[+frameNumber.innerText - 1]) return;

      additionalCtx.drawImage(el[+frameNumber.innerText - 1], 0, 0);
    });

    return frame;
  }

  addEvents() {
    const addFrameButton = document.querySelector('.frames-select .addFrame-button');
    addFrameButton.addEventListener('click', addFrameButtonClickEvent(this));

    const framesContainer = document.querySelector('.frames-select .frames-container');
    framesContainer.addEventListener('click', this.chooseFrame.bind(this));

    document.addEventListener('keydown', frameShorcuts(this));
  }

  chooseFrame(e, frame) {
    const target = frame || e.target;

    if (!target.classList.contains('frame')) return;
    if (this.currentFrame === target) return;

    const { canv, ctx } = getElemAndCtx('.canvas-container .layer');
    const { ctx: additionalCtx } = getElemAndCtx('.canvas-container .additional-layer');

    const imgData = ctx.createImageData(canv.width, canv.height);
    ctx.putImageData(imgData, 0, 0);
    additionalCtx.putImageData(imgData, 0, 0);

    ctx.drawImage(target, 0, 0);

    const framePos = this.framesList[this.layerNumber].indexOf(target);

    this.framesList.forEach((elem, i) => {
      if (i === this.layerNumber || !elem[framePos]) return;

      additionalCtx.drawImage(elem[framePos], 0, 0);
    });

    this.selected.classList.remove('selected');
    target.parentNode.classList.add('selected');

    this.selected = target.parentNode;
    this.currentFrame = target;
    this.frameCtx = target.getContext('2d');

    const { ctx: hoverCtx } = getElemAndCtx('.canvas-container .hover-layer');
    hoverCtx.putImageData(imgData, 0, 0);
  }

  copyFrame(frame) {
    this.addFrame(frame);
    this.frameCtx.drawImage(frame, 0, 0);

    const { ctx } = getElemAndCtx('.canvas-container .layer');
    ctx.drawImage(frame, 0, 0);

    const pos = this.framesList[this.layerNumber].indexOf(frame) + 1;
    this.changeFramesNumbers(pos, 1);
  }

  deleteFrame(frame) {
    if (this.framesList[this.layerNumber].length === 1) {
      const { canv, ctx } = getElemAndCtx('.canvas-container .layer');
      let imgData = ctx.createImageData(canv.width, canv.height);
      ctx.putImageData(imgData, 0, 0);

      const frameCtx = frame.getContext('2d');

      imgData = frameCtx.createImageData(frame.width, frame.height);
      frameCtx.putImageData(imgData, 0, 0);

      return;
    }

    const pos = this.framesList[this.layerNumber].indexOf(frame);
    const framesContainer = document.querySelector('.frames-container');
    let frameContainerWrapper = frame.parentNode.parentNode;

    framesContainer.removeChild(frameContainerWrapper);

    if (pos === 0) {
      frameContainerWrapper = this.framesList[this.layerNumber][pos + 1].parentNode.parentNode;
    } else {
      frameContainerWrapper = this.framesList[this.layerNumber][pos - 1].parentNode.parentNode;
    }
    this.framesList[this.layerNumber].splice(pos, 1);

    let i = this.framesList[this.layerNumber].indexOf(frameContainerWrapper.firstChild.firstChild);

    if (pos !== 0) i += 1;

    this.changeFramesNumbers(i, -1);

    if (this.currentFrame === frame) {
      frameContainerWrapper.firstChild.classList.add('selected');
      this.selected = frameContainerWrapper.firstChild;
      this.currentFrame = frameContainerWrapper.firstChild.firstChild;
      this.frameCtx = this.currentFrame.getContext('2d');

      const { canv, ctx } = getElemAndCtx('.canvas-container .layer');
      const imgData = ctx.createImageData(canv.width, canv.height);
      ctx.putImageData(imgData, 0, 0);

      ctx.drawImage(this.currentFrame, 0, 0);
    }
  }

  changeFramesNumbers(pos, delta) {
    let i = pos;
    const frameContainerList = document.getElementsByClassName('preview-container');

    while (i < this.framesList[this.layerNumber].length) {
      const num = frameContainerList[i].lastChild;
      const text = +num.innerText + delta;
      num.innerText = text;

      i += 1;
    }
  }
}
