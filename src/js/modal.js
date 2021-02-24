import * as basicLightbox from 'basiclightbox';
import { Spinner } from 'spin.js';

function openModalOnClick(event) {
  const tagName = event.target.tagName;
  const originalImg = event.target.dataset.source;

  if (tagName === 'IMG') {
    const instance = basicLightbox.create(`
      <img src="${originalImg}">`);
    instance.show();
  }
}

export default openModalOnClick;
