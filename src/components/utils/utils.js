function setPixel(x, y, canv, imgData, color, size) {
  if (x >= canv.width) return;

  const { data } = imgData;

  let rgb = color;
  rgb = rgb.replace(/[^\d,]/g, '').split(',');
  let n = (y * canv.width + x) * 4;
  for (let k = 0; k < 4; k += 1) {
    data[n + k] = +rgb[k];
  }

  for (let i = 1; i < size; i += 1) {
    if ((x - i) >= 0 && (x - i) < canv.width) {
      n = ((y - i) * canv.width + (x - i)) * 4; // pivot
      for (let k = 0; k < 4; k += 1) {
        data[n + k] = +rgb[k];
      }
    }


    for (let j = 1; j <= i; j += 1) {
      // eslint-disable-next-line no-continue
      if ((x - i + j) < 0 || (x - i + j) >= canv.width) continue;

      n = ((y - i) * canv.width + (x - i + j)) * 4;
      for (let k = 0; k < 4; k += 1) {
        data[n + k] = +rgb[k];
      }

      // eslint-disable-next-line no-continue
      if ((x - i) < 0 || (x - i) >= canv.width) continue;

      n = ((y - i + j) * canv.width + (x - i)) * 4;
      for (let k = 0; k < 4; k += 1) {
        data[n + k] = +rgb[k];
      }
    }
  }
}

function setDitheringPixel(x, y, canv, imgData, firstColor, secondColor, size) {
  if (x >= canv.width) return;

  const { data } = imgData;
  let color1;
  let color2;

  if (x % 2 === y % 2) {
    color1 = firstColor;
    color2 = secondColor;
  } else {
    color1 = secondColor;
    color2 = firstColor;
  }

  let rgb1 = color1;
  rgb1 = rgb1.replace(/[^\d,]/g, '').split(',');

  let rgb2 = color2;
  rgb2 = rgb2.replace(/[^\d,]/g, '').split(',');

  let n = (y * canv.width + x) * 4;
  for (let k = 0; k < 4; k += 1) {
    data[n + k] = +rgb1[k];
  }

  let rgb;

  for (let i = 1; i < size; i += 1) {
    if ((x - i) >= 0 && (x - i) < canv.width) {
      n = ((y - i) * canv.width + (x - i)) * 4; // pivot

      for (let k = 0; k < 4; k += 1) {
        data[n + k] = +rgb1[k];
      }
    }


    for (let j = 1; j <= i; j += 1) {
      // eslint-disable-next-line no-continue
      if ((x - i + j) < 0 || (x - i + j) >= canv.width) continue;

      n = ((y - i) * canv.width + (x - i + j)) * 4;
      rgb = (j % 2 === 0) ? rgb1 : rgb2;
      for (let k = 0; k < 4; k += 1) {
        data[n + k] = +rgb[k];
      }

      // eslint-disable-next-line no-continue
      if ((x - i) < 0 || (x - i) >= canv.width) continue;

      n = ((y - i + j) * canv.width + (x - i)) * 4;
      rgb = (j % 2 === 0) ? rgb1 : rgb2;
      for (let k = 0; k < 4; k += 1) {
        data[n + k] = +rgb[k];
      }
    }
  }
}

function changeBrightness(x, y, canv, imgData, size, inc) {
  if (x >= canv.width) return;

  const { data } = imgData;

  let n = (y * canv.width + x) * 4;
  for (let k = 0; k < 3; k += 1) {
    data[n + k] += inc;
  }

  for (let i = 1; i < size; i += 1) {
    if ((x - i) >= 0 && (x - i) < canv.width) {
      n = ((y - i) * canv.width + (x - i)) * 4; // pivot
      for (let k = 0; k < 3; k += 1) {
        data[n + k] += inc;
      }
    }


    for (let j = 1; j <= i; j += 1) {
      // eslint-disable-next-line no-continue
      if ((x - i + j) < 0 || (x - i + j) >= canv.width) continue;

      n = ((y - i) * canv.width + (x - i + j)) * 4;
      for (let k = 0; k < 3; k += 1) {
        data[n + k] += inc;
      }

      // eslint-disable-next-line no-continue
      if ((x - i) < 0 || (x - i) >= canv.width) continue;

      n = ((y - i + j) * canv.width + (x - i)) * 4;
      for (let k = 0; k < 3; k += 1) {
        data[n + k] += inc;
      }
    }
  }
}

function colorSamePixels(x0, y0, color, imgData, canv) {
  const { data } = imgData;
  const stack = [{ x: x0, y: y0 }];

  let rgb = color;
  rgb = rgb.replace(/[^\d,]/g, '').split(',');

  let n = (y0 * canv.width + x0) * 4;
  const currentData = [];

  let isCurrentColor = true;

  for (let k = 0; k < 4; k += 1) {
    currentData.push(data[n + k]);

    if (data[n + k] !== +rgb[k]) {
      isCurrentColor = false;
    }
  }

  if (isCurrentColor) {
    return;
  }

  function check(d = 0) {
    let isSame = true;

    for (let k = 0; k < 4; k += 1) {
      if (data[n + k + d] !== currentData[k]) {
        isSame = false;
        break;
      }
    }

    return isSame;
  }

  let newPixel;

  function setColor() {
    while (stack.length > 0) {
      newPixel = stack.shift();
      const { x } = newPixel;
      let { y } = newPixel;

      n = (y * canv.width + x) * 4;
      while (y >= 0 && check()) {
        n -= canv.width * 4;
        y -= 1;
      }
      n += canv.width * 4;
      y += 1;

      let isLeft = false;
      let isRight = false;
      while (y < canv.height && check()) {
        for (let k = 0; k < 4; k += 1) {
          data[n + k] = +rgb[k];
        }

        if (x > 0) {
          if (check(-4)) {
            if (!isLeft) {
              stack.push({ x: x - 1, y });
              isLeft = true;
            }
          } else if (isLeft) {
            isLeft = false;
          }
        }

        if (x < canv.width - 1) {
          if (check(4)) {
            if (!isRight) {
              stack.push({ x: x + 1, y });
              isRight = true;
            }
          } else if (isRight) {
            isRight = false;
          }
        }

        n += canv.width * 4;
        y += 1;
      }
    }
  }
  setColor();

  const ctx = canv.getContext('2d');
  ctx.putImageData(imgData, 0, 0);
}

function createButton(cl, html, clickEvent) {
  const button = document.createElement('BUTTON');
  button.classList.add(cl);
  button.innerHTML = html;
  if (clickEvent) button.onclick = clickEvent;

  return button;
}

function line(x0, y0, x1, y1, canv, imgData, color1, size, color2) {
  const dx = Math.abs(x1 - x0);
  const sx = x0 < x1 ? 1 : -1;
  const dy = Math.abs(y1 - y0);
  const sy = y0 < y1 ? 1 : -1;
  let err = (dx > dy ? dx : -dy) / 2;

  let x = x0;
  let y = y0;

  while (size) {
    if (x < 0 || x >= canv.width) break;
    if (color2) {
      setDitheringPixel(x, y, canv, imgData, color1, color2, size);
    } else {
      setPixel(x, y, canv, imgData, color1, size);
    }
    if (x === x1 && y === y1) break;

    const e2 = err;

    if (e2 > -dx) {
      err -= dy;
      x += sx;
    }

    if (e2 < dy) {
      err += dx;
      y += sy;
    }
  }
}

function ellipse(x0, y0, x1, y1, canv, imgData, color, size, shift) {
  const step = 2 * Math.PI / 20;
  const xC = (x1 + x0) / 2;
  const yC = (y1 + y0) / 2;
  const r = Math.abs(x1 - xC);

  let kX;
  let kY;

  const deltaX = Math.abs(x1 - xC);
  const deltaY = Math.abs(y1 - yC);
  if (shift) {
    kX = 1;
    kY = 1;
  } else if (deltaX > deltaY) {
    kX = 1;
    kY = (deltaX === 0) ? 1 : deltaY / deltaX;
  } else {
    kX = (deltaY === 0) ? 1 : deltaX / deltaY;
    kY = 1;
  }

  let tempX = Math.round(xC + kX * r);
  let tempY = Math.round(yC);

  for (let alpha = step; alpha <= 2 * Math.PI; alpha += step) {
    const x = Math.round(xC + kX * r * Math.cos(alpha));
    const y = Math.round(yC - kY * r * Math.sin(alpha));

    line(tempX, tempY, x, y, canv, imgData, color, size);

    tempX = x;
    tempY = y;
  }
}

function getElemAndCtx(selector) {
  const canv = document.querySelector(selector);
  const ctx = canv.getContext('2d');
  return {
    canv,
    ctx,
  };
}

function getElemCoords(canv, elem) {
  const canvWidth = +getComputedStyle(canv).width.slice(0, -2);
  const canvasK = canvWidth / canv.width;

  const x = Math.round(elem.offsetX / canvasK);
  const y = Math.round(elem.offsetY / canvasK);

  return {
    x,
    y,
  };
}

function resetImageData(canv) {
  if (!canv) return false;

  const ctx = canv.getContext('2d');
  const resetData = ctx.createImageData(canv.width, canv.height);
  ctx.putImageData(resetData, 0, 0);

  return true;
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export {
  changeBrightness,
  colorSamePixels,
  createButton,
  ellipse,
  getElemAndCtx,
  getElemCoords,
  line,
  resetImageData,
  componentToHex,
  rgbToHex,
  setDitheringPixel,
  setPixel,
};
