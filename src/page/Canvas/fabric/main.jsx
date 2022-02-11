import { fabric } from 'fabric';

fabric.Object.prototype.transparentCorners = false;

const $ = function (id) {
  return document.getElementById(id);
};

const RectConfig = {
  red: {
    width: 80, height: 50, fill: 'red',
  },
  blue: {
    width: 50, height: 70, fill: 'blue',
  },
  green: {
    width: 60, height: 60, fill: 'green',
  },
};

const canvas = new fabric.Canvas('canvas');
const red = new fabric.Rect({
  top: 100,
  left: 0,
  ...RectConfig.red,
});
const blue = new fabric.Rect({
  top: 0,
  left: 100,
  ...RectConfig.blue,
});
const green = new fabric.Rect({
  top: 100,
  left: 100,
  ...RectConfig.green,
});
canvas.add(red, blue, green);

const group = $('group'),
  ungroup = $('ungroup'),
  multiselect = $('multiselect'),
  addmore = $('addmore'),
  discard = $('discard');

addmore.onclick = function () {
  const red = new fabric.Rect({
    top: Math.max(Math.random() * canvas.height - RectConfig.red.height, 0),
    left: Math.max(Math.random() * canvas.width - RectConfig.red.width, 0),
    ...RectConfig.red,
  });
  const blue = new fabric.Rect({
    top: Math.max(Math.random() * canvas.height - RectConfig.blue.height, 0),
    left: Math.max(Math.random() * canvas.width - RectConfig.blue.width, 0),
    ...RectConfig.blue,
  });
  const green = new fabric.Rect({
    top: Math.max(Math.random() * canvas.height - RectConfig.green.height, 0),
    left: Math.max(Math.random() * canvas.width - RectConfig.green.width, 0),
    ...RectConfig.green,
  });
  canvas.add(red, blue, green);
};

multiselect.onclick = function () {
  canvas.discardActiveObject();
  const sel = new fabric.ActiveSelection(canvas.getObjects(), {
    canvas: canvas,
  });
  canvas.setActiveObject(sel);
  canvas.requestRenderAll();
};

group.onclick = function () {
  if (!canvas.getActiveObject()) {
    return;
  }
  if (canvas.getActiveObject().type !== 'activeSelection') {
    return;
  }
  canvas.getActiveObject().toGroup();
  canvas.requestRenderAll();
};

ungroup.onclick = function () {
  if (!canvas.getActiveObject()) {
    return;
  }
  if (canvas.getActiveObject().type !== 'group') {
    return;
  }
  canvas.getActiveObject().toActiveSelection();
  canvas.requestRenderAll();
};

discard.onclick = function () {
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};
