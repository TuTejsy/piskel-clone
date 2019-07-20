/* eslint-disable prefer-destructuring */
import {
  changeBrightness,
  colorSamePixels,
  createButton,
  ellipse,
  getElemAndCtx,
  getElemCoords,
  line,
  resetImageData,
  rgbToHex,
  setDitheringPixel,
  setPixel,
  componentToHex,
} from './utils';

describe('createButton', () => {
  it('should create and return button', () => {
    const result = createButton('result', '<div></div>');
    const isClass = result.classList.contains('result');

    expect(isClass).toBe(true);
    expect(result.innerHTML).toBe('<div></div>');
  });

  it('should set click event', () => {
    const event = () => 24;

    const result = createButton('result', '<div></div>', event);

    expect(result.onclick).toEqual(event);
  });
});

describe('getElemAndCtx', () => {
  it('should return canvas and it context', () => {
    const canv = document.createElement('CANVAS');
    canv.width = 32;
    canv.height = 32;
    document.body.appendChild(canv);
    const ctx = canv.getContext('2d');

    const result = getElemAndCtx('canvas');

    expect(result).toEqual({ canv, ctx });
  });
});

describe('getElemCoords', () => {
  it('should return current cursor position', () => {
    const canv = document.createElement('CANVAS');
    canv.width = 32;
    canv.height = 32;
    const e = new MouseEvent('move');
    const result = getElemCoords(canv, e);

    expect(result.x).toBe(NaN);
    expect(result.y).toBe(NaN);
  });
});

describe('setPixel', () => {
  it('should set pixel in current coords', () => {
    const canv = document.createElement('CANVAS');
    canv.width = 32;
    canv.height = 32;

    const ctx = canv.getContext('2d');
    let imgData = ctx.createImageData(canv.width, canv.height);
    let { data } = imgData;
    let n;

    // x => canv.width
    setPixel(100, 5, canv, imgData, 'rgba(1, 1, 1, 255)', 1);
    n = (5 * canv.width + 100) * 4;

    expect(data[n]).toBe(0);
    expect(data[n + 1]).toBe(0);
    expect(data[n + 2]).toBe(0);
    expect(data[n + 3]).toBe(0);

    // size === 1
    imgData = ctx.createImageData(canv.width, canv.height);
    data = imgData.data;

    setPixel(2, 5, canv, imgData, 'rgba(0, 0, 0, 255)', 1);
    n = (5 * canv.width + 2) * 4;

    expect(data[n]).toBe(0);
    expect(data[n + 1]).toBe(0);
    expect(data[n + 2]).toBe(0);
    expect(data[n + 3]).toBe(255);

    // size === 4
    imgData = ctx.createImageData(canv.width, canv.height);
    data = imgData.data;

    setPixel(5, 5, canv, imgData, 'rgba(1, 2, 3, 255)', 4);
    n = (5 * canv.width + 5) * 4;

    expect(data[n]).toBe(1);
    expect(data[n + 1]).toBe(2);
    expect(data[n + 2]).toBe(3);
    expect(data[n + 3]).toBe(255);
  });
});

describe('setDitheringPixel', () => {
  const canv = document.createElement('CANVAS');
  canv.width = 32;
  canv.height = 32;
  const ctx = canv.getContext('2d');

  it('should return if x >= canv.width', () => {
    const x = 35;
    const y = 1;

    const imgData = ctx.getImageData(0, 0, canv.width, canv.height);
    const { data } = imgData;

    const n = (y * canv.width + x) * 4;
    setDitheringPixel(x, y, canv, imgData, 'rgba(10, 10, 10, 255)', 'rgba(20, 20, 20, 255)', 1);

    expect(data[n + 0]).toBe(0);
    expect(data[n + 1]).toBe(0);
    expect(data[n + 2]).toBe(0);
    expect(data[n + 3]).toBe(0);
  });

  it('should work if x >= canv.width', () => {
    const x = 10;
    let y = 10;

    const imgData = ctx.getImageData(0, 0, canv.width, canv.height);
    const { data } = imgData;

    let n = (y * canv.width + x) * 4;
    setDitheringPixel(x, y, canv, imgData, 'rgba(10, 10, 10, 255)', 'rgba(20, 20, 20, 255)', 4);

    expect(data[n + 0]).toBe(10);
    expect(data[n + 1]).toBe(10);
    expect(data[n + 2]).toBe(10);
    expect(data[n + 3]).toBe(255);

    y = 11;
    n = (y * canv.width + x) * 4;

    setDitheringPixel(x, y, canv, imgData, 'rgba(10, 10, 10, 255)', 'rgba(20, 20, 20, 255)', 4);

    expect(data[n + 0]).toBe(20);
    expect(data[n + 1]).toBe(20);
    expect(data[n + 2]).toBe(20);
    expect(data[n + 3]).toBe(255);
  });
});


describe('changeBrightness', () => {
  const canv = document.createElement('CANVAS');
  canv.width = 32;
  canv.height = 32;
  const ctx = canv.getContext('2d');

  it('if x >= canv.width should return', () => {
    const imgData = ctx.getImageData(0, 0, canv.width, canv.height);
    const { data } = imgData;
    const n = (1 * canv.width + 35) * 4;

    changeBrightness(35, 1, canv, imgData, 1, 10);

    expect(data[n + 0]).toBe(0);
    expect(data[n + 1]).toBe(0);
    expect(data[n + 2]).toBe(0);
    expect(data[n + 3]).toBe(0);
  });

  it('should change birghtness on inc', () => {
    const imgData = ctx.getImageData(0, 0, canv.width, canv.height);
    const { data } = imgData;
    const n = (5 * canv.width + 5) * 4;

    changeBrightness(5, 5, canv, imgData, 4, 10);

    expect(data[n + 0]).toBe(10);
    expect(data[n + 1]).toBe(10);
    expect(data[n + 2]).toBe(10);
    expect(data[n + 3]).toBe(0);
  });
});

describe('colorSamePixels', () => {
  const canv = document.createElement('CANVAS');
  canv.width = 32;
  canv.height = 32;
  const ctx = canv.getContext('2d');

  it('shoud return if get a current color', () => {
    const imgData = ctx.getImageData(0, 0, canv.height, canv.width);
    const { data } = imgData;
    const color = [10, 10, 10, 255];

    let n = (1 * canv.width + 1) * 4;

    for (let k = 0; k < 4; k += 1) {
      data[n + k] = color[k];
    }

    n = (1 * canv.width + 2) * 4;

    for (let k = 0; k < 4; k += 1) {
      data[n + k] = color[k];
    }

    colorSamePixels(1, 1, 'rgba(10, 10, 10, 255)', imgData, canv);

    expect(data[n + 0]).toBe(10);
    expect(data[n + 1]).toBe(10);
    expect(data[n + 2]).toBe(10);
    expect(data[n + 3]).toBe(255);
  });

  it('shoud color same pixels', () => {
    const imgData = ctx.getImageData(0, 0, canv.height, canv.width);
    const { data } = imgData;
    const color1 = [10, 10, 10, 255];

    let n;

    for (let i = 1; i < 10; i += 2) {
      for (let j = 1; j < 15; j += 1) {
        n = (i * canv.width + j) * 4;
        for (let k = 0; k < 4; k += 1) {
          data[n + k] = color1[k];
        }
      }

      n = ((i + 1) * canv.width + 10) * 4;
      for (let k = 0; k < 4; k += 1) {
        data[n + k] = color1[k];
      }
    }

    colorSamePixels(1, 1, 'rgba(20, 20, 20, 255)', imgData, canv);

    n = (1 * canv.width + 3) * 4;

    expect(data[n + 0]).toBe(20);
    expect(data[n + 1]).toBe(20);
    expect(data[n + 2]).toBe(20);
    expect(data[n + 3]).toBe(255);

    n = (1 * canv.width + 1) * 4;

    expect(data[n + 0]).toBe(20);
    expect(data[n + 1]).toBe(20);
    expect(data[n + 2]).toBe(20);
    expect(data[n + 3]).toBe(255);
  });
});

describe('line', () => {
  const canv = document.createElement('CANVAS');
  canv.width = 32;
  canv.height = 32;
  const ctx = canv.getContext('2d');

  it('should not draw line if x0 < 0 or x0 > canv.width', () => {
    const imgData = ctx.getImageData(0, 0, canv.height, canv.width);
    const { data } = imgData;

    line(35, 1, 20, 2, canv, imgData, 'rgba(10, 10, 10, 255)', 4, 'rgba(20, 20, 20, 255)');

    const n = (1 * canv.width + 35) * 4;

    expect(data[n + 0]).toBe(0);
    expect(data[n + 1]).toBe(0);
    expect(data[n + 2]).toBe(0);
    expect(data[n + 3]).toBe(0);
  });

  it('should draw line with first color if there is not second color', () => {
    const imgData = ctx.getImageData(0, 0, canv.height, canv.width);
    const { data } = imgData;

    line(10, 1, 20, 2, canv, imgData, 'rgba(10, 10, 10, 255)', 4);

    const n = (1 * canv.width + 10) * 4;

    expect(data[n + 0]).toBe(10);
    expect(data[n + 1]).toBe(10);
    expect(data[n + 2]).toBe(10);
    expect(data[n + 3]).toBe(255);
  });

  it('should draw dithering line if there is second color', () => {
    const imgData = ctx.getImageData(0, 0, canv.height, canv.width);
    const { data } = imgData;

    line(10, 1, 10, 2, canv, imgData, 'rgba(10, 10, 10, 255)', 4, 'rgba(20, 20, 20, 255)');

    let n = (1 * canv.width + 10) * 4;

    expect(data[n + 0]).toBe(20);
    expect(data[n + 1]).toBe(20);
    expect(data[n + 2]).toBe(20);
    expect(data[n + 3]).toBe(255);

    n = (2 * canv.width + 10) * 4;

    expect(data[n + 0]).toBe(10);
    expect(data[n + 1]).toBe(10);
    expect(data[n + 2]).toBe(10);
    expect(data[n + 3]).toBe(255);
  });
});

describe('ellipse', () => {
  const canv = document.createElement('CANVAS');
  canv.width = 32;
  canv.height = 32;
  const ctx = canv.getContext('2d');

  it('should draw an circle if shift == true', () => {
    const imgData = ctx.getImageData(0, 0, canv.height, canv.width);
    const { data } = imgData;

    ellipse(1, 1, 30, 20, canv, imgData, 'rgba(10, 10, 10, 255)', 4, true);

    const n = (1 * canv.width + 15) * 4;

    expect(data[n + 0]).toBe(0);
    expect(data[n + 1]).toBe(0);
    expect(data[n + 2]).toBe(0);
    expect(data[n + 3]).toBe(0);
  });

  it('should draw an ellipse if shift == false', () => {
    const imgData = ctx.getImageData(0, 0, canv.height, canv.width);
    const { data } = imgData;

    ellipse(1, 1, 30, 20, canv, imgData, 'rgba(10, 10, 10, 255)', 4, false);

    let n = (1 * canv.width + 15) * 4;

    expect(data[n + 0]).toBe(10);
    expect(data[n + 1]).toBe(10);
    expect(data[n + 2]).toBe(10);
    expect(data[n + 3]).toBe(255);

    ellipse(1, 1, 20, 30, canv, imgData, 'rgba(10, 10, 10, 255)', 4, false);

    n = (25 * canv.width + 12) * 4;

    expect(data[n + 0]).toBe(10);
    expect(data[n + 1]).toBe(10);
    expect(data[n + 2]).toBe(10);
    expect(data[n + 3]).toBe(255);
  });
});

describe('resetImageData', () => {
  const canv = document.createElement('CANVAS');

  it('return false if function called without canv', () => {
    const result = resetImageData();

    expect(result).toBe(false);
  });

  it('return true if function called with canv', () => {
    const result = resetImageData(canv);

    expect(result).toBe(true);
  });
});

describe('componentToHex', () => {
  it('should get rgb component and return it as a hex component', () => {
    let result = componentToHex(255);
    expect(result).toBe('ff');

    result = componentToHex(0);
    expect(result).toBe('00');
  });
});

describe('rgbToHex', () => {
  it('should get rgb color and return it as hex color', () => {
    let result = rgbToHex(255, 255, 255);
    expect(result).toBe('#ffffff');

    result = rgbToHex(0, 0, 0);
    expect(result).toBe('#000000');
  });
});
