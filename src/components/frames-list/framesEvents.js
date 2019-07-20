/* eslint-disable no-param-reassign */

import {
  getElemAndCtx,
  resetImageData,
} from '../utils/utils';

const moveButtonMoveEvent = (e, previewContainerWrapper) => (ev) => {
  const coordsDelta = ev.pageY - e.pageY;
  previewContainerWrapper.style.marginTop = `${coordsDelta - 115}px`;
};

const dragAndDrop = (context, framesContainer, previewContainerWrapper, targetPos, currentFrame) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  function dragAndDropEvent(ev) {
    let newFrame;

    if (ev.target.classList.contains('frame')) {
      newFrame = ev.target;
    } else if (ev.target.parentNode.classList.contains('preview-container')) {
      newFrame = ev.target.parentNode.firstChild;
    } else if (ev.target.parentNode.parentNode.classList.contains('preview-container')) {
      newFrame = ev.target.parentNode.parentNode.firstChild;
    } else {
      framesContainer.removeChild(targetPos);
      previewContainerWrapper.style.position = 'relative';
      previewContainerWrapper.style.marginTop = '0';

      document.onmousemove = null;
      document.removeEventListener('mouseup', dragAndDropEvent);
      return;
    }

    const hoverCanv = document.querySelector('.canvas-container .hover-layer');
    resetImageData(hoverCanv);

    if (newFrame !== currentFrame) {
      const newFrameCtx = newFrame.getContext('2d');
      const newFrameImgData = newFrameCtx.getImageData(0, 0, newFrame.width, newFrame.height);

      const currentFrameCtx = currentFrame.getContext('2d');
      const frameImageData = currentFrameCtx
        .getImageData(0, 0, currentFrame.width, currentFrame.height);

      newFrameCtx.putImageData(frameImageData, 0, 0);
      currentFrameCtx.putImageData(newFrameImgData, 0, 0);

      if (currentFrameCtx === context.frameCtx) {
        context.frameCtx = context.currentFrame.getContext('2d');

        const { ctx } = getElemAndCtx('.canvas-container .layer');
        ctx.putImageData(newFrameImgData, 0, 0);
      } else if (newFrame === context.currentFrame) {
        context.frameCtx = context.currentFrame.getContext('2d');

        const { ctx } = getElemAndCtx('.canvas-container .layer');
        ctx.putImageData(frameImageData, 0, 0);
      }
    }

    framesContainer.removeChild(targetPos);
    previewContainerWrapper.style.position = 'relative';
    previewContainerWrapper.style.marginTop = '0';

    document.onmousemove = null;
    document.removeEventListener('mouseup', dragAndDropEvent);
  };

const moveButtonMouseDown = (context, framesContainer, previewContainerWrapper) => (e) => {
  const currentFrame = e.currentTarget.parentNode.firstChild;

  previewContainerWrapper.style.position = 'absolute';

  const targetPos = document.createElement('DIV');
  targetPos.classList.add('target-position');

  framesContainer.insertBefore(targetPos, previewContainerWrapper);

  document.onmousemove = moveButtonMoveEvent(e, previewContainerWrapper);

  document.addEventListener('mouseup',
    dragAndDrop(context, framesContainer, previewContainerWrapper, targetPos, currentFrame));
};

const deleteButtonEvent = (context, frame) => () => {
  context.deleteFrame(frame);
};

const copyButtonEvent = (context, frame) => () => {
  context.copyFrame(frame);
};

const frameShorcuts = context => (e) => {
  if (e.code === 'KeyN' && !e.shiftKey) {
    context.addFrame();
  } else if (e.key === 'ArrowDown' && !e.shiftKey) {
    if (!context.currentFrame.parentNode.parentNode.nextSibling) return;

    const frame = context.currentFrame.parentNode.parentNode.nextSibling.firstChild.firstChild;

    context.chooseFrame(null, frame);
  } else if (e.key === 'ArrowUp' && !e.shiftKey) {
    if (!context.currentFrame.parentNode.parentNode.previousSibling) return;

    const frame = context.currentFrame.parentNode.parentNode.previousSibling.firstChild.firstChild;

    context.chooseFrame(null, frame);
  } else if (e.key === 'Backspace' && !e.shiftKey) {
    context.deleteFrame(context.currentFrame);
  }
};

const addFrameButtonClickEvent = context => () => {
  context.addFrame.call(context);
};

export {
  moveButtonMoveEvent,
  moveButtonMouseDown,
  dragAndDrop,
  deleteButtonEvent,
  copyButtonEvent,
  frameShorcuts,
  addFrameButtonClickEvent,
};
