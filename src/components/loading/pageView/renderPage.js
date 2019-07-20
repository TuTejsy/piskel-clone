import Frames from '../../frames-list/index';
import Tools from '../../tools/index';
import Preview from '../../../screens/preview/index';
import Layers from '../../layers-list/index';

import renderFrames from '../../frames-list/frames.template';
import renderTools from '../../tools/tools.template';
import renderPreview from '../../../screens/preview/preview.template';
import renderLayers from '../../layers-list/layers.template';

export default function renderPage() {
  renderTools();
  renderFrames();
  renderPreview();
  renderLayers();

  const frames = new Frames();

  const layers = new Layers(frames);
  layers.addEvents();

  frames.addEvents();

  const tools = new Tools(frames);
  tools.addEvents();

  const preview = new Preview(frames);
  preview.addEvents();
}
