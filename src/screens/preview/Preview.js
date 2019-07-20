import { getElemAndCtx } from '../../components/utils/utils';

import {
  fullScreenRequest,
  changeFps,
  downloadGif,
} from './PreviewEvents';

import UPNG from '../../../node_modules/upng-js/UPNG';
import GIF from '../../../node_modules/gif.js/dist/gif';

export default class Preview {
  constructor(frames) {
    this.frames = frames;
    this.isAnimation = false;
    this.FPS = 1;
    this.animationInterval = 1000 / this.FPS;

    this.range = document.querySelector('.animation-speed .FPS-range');
    this.fpsValue = document.querySelector('.animation-speed .FPS-value');
  }

  addEvents() {
    this.range.addEventListener('change', changeFps(this));

    const fullScreenButton = document.querySelector('.preview-container .full-screen-button');
    const previewContainerWrapper = document.querySelector('.preview-menu .preview-container-wrapper');

    fullScreenButton.addEventListener('click', fullScreenRequest(previewContainerWrapper));

    const toGifButton = document.querySelector('.export .toGif');
    toGifButton.addEventListener('click', this.exportToGif.bind(this));

    const toApngButton = document.querySelector('.export .toApng');
    toApngButton.addEventListener('click', this.exportToApng.bind(this));
  }

  animateFrames() {
    let i = 0;
    const { canv: preview, ctx: previewCtx } = getElemAndCtx('.preview-container .preview');
    const resetData = previewCtx.createImageData(preview.width, preview.height);

    const animation = () => {
      if (!this.isAnimation) return;
      let isOne = true;
      let k = 0;

      previewCtx.putImageData(resetData, 0, 0);
      this.frames.framesList.forEach((elem) => {
        if (elem.length !== 1) isOne = false;
        if (elem.length - 1 > k) k = elem.length - 1;
        if (!elem[i]) return;

        previewCtx.drawImage(elem[i], 0, 0);
      });

      if (isOne) return;

      if (i === k) i = 0;
      else i += 1;

      setTimeout(animation, this.animationInterval);
    };

    animation();
  }

  exportToGif() {
    const gif = new GIF({
      workerScript: 'js/gif.worker.js',
      quality: 1,
      width: this.canvSize,
      height: this.canvSize,
    });

    let k = 1;
    for (let i = 0; i < k; i += 1) {
      const canv = document.createElement('CANVAS');
      canv.width = this.frames.canvSize;
      canv.height = this.frames.canvSize;
      const ctx = canv.getContext('2d');

      // eslint-disable-next-line no-loop-func
      this.frames.framesList.forEach((elem) => {
        if (elem.length > k) k = elem.length;
        if (!elem[i]) return;
        ctx.drawImage(elem[i], 0, 0);
      });
      gif.addFrame(canv, { delay: this.animationInterval });
    }

    gif.on('finished', downloadGif);

    gif.render();
  }

  exportToApng() {
    const frames = [];
    const dels = [];
    let k = 1;
    for (let i = 0; i < k; i += 1) {
      const canv = document.createElement('CANVAS');
      canv.width = this.frames.canvSize;
      canv.height = this.frames.canvSize;
      const ctx = canv.getContext('2d');

      // eslint-disable-next-line no-loop-func
      this.frames.framesList.forEach((elem) => {
        if (elem.length > k) k = elem.length;
        if (!elem[i]) return;
        ctx.drawImage(elem[i], 0, 0);
      });

      const { data } = ctx.getImageData(0, 0, canv.width, canv.height);
      frames.push(data.buffer);
      dels.push(this.animationInterval);
    }

    let apngFile = UPNG.encode(frames, this.frames.canvSize, this.frames.canvSize, 0, dels);
    apngFile = new File([apngFile], 'spirte.apng');
    const url = URL.createObjectURL(apngFile);

    const link = document.createElement('a');
    link.download = 'spirte.png';
    link.href = url;
    link.click();
  }
}
