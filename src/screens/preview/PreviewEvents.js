/* eslint-disable no-param-reassign */
const fullScreenRequest = previewContainerWrapper => () => {
  if (document.fullscreen) {
    document.exitFullscreen();
  } else {
    previewContainerWrapper.requestFullscreen();
  }
};

const changeFps = context => () => {
  if (context.range.value === '0') {
    context.isAnimation = false;
    context.fpsValue.innerText = 0;
    return;
  }
  context.isAnimation = true;

  context.FPS = +context.range.value;
  context.fpsValue.innerText = context.FPS;
  context.animationInterval = 1000 / context.FPS;

  context.animateFrames(context.animationInterval);
};

const downloadGif = (blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'spirte.gif';
  link.href = url;
  link.click();
};

export {
  fullScreenRequest,
  changeFps,
  downloadGif,
};
